# --- OCI API authentication (Console → Profile → API keys → Add API key) ---
variable "tenancy_ocid" {
  description = "OCID of your tenancy."
  type        = string
}

variable "user_ocid" {
  description = "OCID of the user that owns the API key."
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint of the API signing key."
  type        = string
}

variable "private_key_path" {
  description = "Path to the API signing private key (PEM)."
  type        = string
  default     = "~/.oci/oci_api_key.pem"
}

variable "region" {
  description = "OCI region identifier, e.g. eu-frankfurt-1."
  type        = string
}

# --- Where and what to create ---
variable "compartment_ocid" {
  description = "Compartment for the new resources. Leave null to use the tenancy (root) compartment."
  type        = string
  default     = null
}

variable "name" {
  description = "Prefix for every resource's display name."
  type        = string
  default     = "openair-kz"
}

variable "availability_domain_index" {
  description = "Which availability domain to use (0-based). Try another one if you get 'Out of host capacity'."
  type        = number
  default     = 0
}

variable "shape" {
  description = "Instance shape. VM.Standard.A1.Flex (Arm) and VM.Standard.E2.1.Micro (AMD) are both Always Free."
  type        = string
  default     = "VM.Standard.A1.Flex"
}

variable "ocpus" {
  description = "OCPUs for Flex shapes (ignored for fixed shapes)."
  type        = number
  default     = 1
}

variable "memory_in_gbs" {
  description = "Memory for Flex shapes (ignored for fixed shapes)."
  type        = number
  default     = 6
}

variable "vcn_cidr" {
  description = "Address range of the new, dedicated VCN."
  type        = string
  default     = "10.42.0.0/16"
}

# --- Access ---
variable "ssh_public_key_path" {
  description = "Public key installed for the 'ubuntu' user (used by the deploy script)."
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}

variable "admin_cidr" {
  description = <<-EOT
    Who may SSH in. Leave null (default) to allow only your current public IP,
    detected on every `tofu apply`; if your router gets a new IP, just run `tofu apply` again.
    Or set a CIDR yourself, e.g. "203.0.113.7/32". Port 80 is always open to everyone.
  EOT
  type        = string
  default     = null

  validation {
    condition     = var.admin_cidr == null || can(cidrhost(var.admin_cidr, 0))
    error_message = "admin_cidr must be null or a valid CIDR block, e.g. 203.0.113.7/32."
  }
}
