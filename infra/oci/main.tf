# Everything here is NEW and dedicated to OpenAir KZ: its own VCN, subnet and VM.
# No data source or resource refers to pre-existing instances or networks,
# so `tofu destroy` removes only what this file created.

# Your current public IPv4 address, looked up only when admin_cidr is not set.
data "http" "my_ip" {
  count = var.admin_cidr == null ? 1 : 0
  url   = "https://checkip.amazonaws.com"

  lifecycle {
    postcondition {
      condition     = self.status_code == 200 && can(cidrhost("${trimspace(self.response_body)}/32", 0))
      error_message = "Could not detect your public IP. Set admin_cidr in terraform.tfvars instead."
    }
  }
}

locals {
  admin_cidr     = coalesce(var.admin_cidr, "${trimspace(one(data.http.my_ip[*].response_body))}/32")
  compartment_id = coalesce(var.compartment_ocid, var.tenancy_ocid)
  is_flex        = endswith(var.shape, ".Flex")
  tags           = { project = "openair-kz", managed-by = "opentofu" }
}

data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

# Latest Canonical Ubuntu 24.04 image compatible with the chosen shape (Arm or x86).
data "oci_core_images" "ubuntu" {
  compartment_id           = local.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "24.04"
  shape                    = var.shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"

  filter {
    name   = "display_name"
    values = ["^Canonical-Ubuntu-24\\.04-(aarch64-)?[0-9]"] # skip "Minimal" images
    regex  = true
  }
}

# --- Network ---
resource "oci_core_vcn" "this" {
  compartment_id = local.compartment_id
  display_name   = "${var.name}-vcn"
  cidr_blocks    = [var.vcn_cidr]
  dns_label      = "openair"
  freeform_tags  = local.tags
}

resource "oci_core_internet_gateway" "this" {
  compartment_id = local.compartment_id
  vcn_id         = oci_core_vcn.this.id
  display_name   = "${var.name}-igw"
  freeform_tags  = local.tags
}

resource "oci_core_route_table" "public" {
  compartment_id = local.compartment_id
  vcn_id         = oci_core_vcn.this.id
  display_name   = "${var.name}-public-rt"
  freeform_tags  = local.tags

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.this.id
  }
}

resource "oci_core_security_list" "web" {
  compartment_id = local.compartment_id
  vcn_id         = oci_core_vcn.this.id
  display_name   = "${var.name}-web-sl"
  freeform_tags  = local.tags

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    description = "HTTP from anywhere"
    source      = "0.0.0.0/0"
    protocol    = "6" # TCP
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    description = "SSH from the admin only"
    source      = local.admin_cidr
    protocol    = "6"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    description = "ICMP path MTU discovery"
    source      = "0.0.0.0/0"
    protocol    = "1" # ICMP
    icmp_options {
      type = 3
      code = 4
    }
  }
}

resource "oci_core_subnet" "public" {
  compartment_id    = local.compartment_id
  vcn_id            = oci_core_vcn.this.id
  display_name      = "${var.name}-public-subnet"
  cidr_block        = cidrsubnet(var.vcn_cidr, 8, 1)
  dns_label         = "public"
  route_table_id    = oci_core_route_table.public.id
  security_list_ids = [oci_core_security_list.web.id]
  freeform_tags     = local.tags
}

# --- Web server VM ---
resource "oci_core_instance" "web" {
  compartment_id      = local.compartment_id
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[var.availability_domain_index].name
  display_name        = "${var.name}-web"
  shape               = var.shape
  freeform_tags       = local.tags

  dynamic "shape_config" {
    for_each = local.is_flex ? [1] : []
    content {
      ocpus         = var.ocpus
      memory_in_gbs = var.memory_in_gbs
    }
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ubuntu.images[0].id
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.public.id
    assign_public_ip = true
    hostname_label   = "web"
  }

  metadata = {
    ssh_authorized_keys = trimspace(file(pathexpand(var.ssh_public_key_path)))
    user_data           = base64encode(file("${path.module}/cloud-init.yaml"))
  }

  lifecycle {
    # A newer Ubuntu image appearing later must not force the VM to be replaced.
    ignore_changes = [source_details[0].source_id]
  }
}
