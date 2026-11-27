# Self-hosting on Oracle Cloud (OCI) with OpenTofu

This creates a **new, separate** set of resources for OpenAir KZ and does not touch anything else in your tenancy:

| Resource | Purpose |
|---|---|
| VCN `openair-kz-vcn` + internet gateway + route table | Dedicated network |
| Security list | Port 80 open to everyone, port 22 only from your current public IP |
| Public subnet | Holds the VM |
| Instance `openair-kz-web` (Ubuntu 24.04) | nginx serving the built site from `/var/www/openair` |

The default shape `VM.Standard.A1.Flex` (1 OCPU, 6 GB) is in the **Always Free** tier. The site is served over plain HTTP on the public IP, because a TLS certificate needs a domain name.

## Prerequisites
- [OpenTofu](https://opentofu.org) 1.6 or newer
- An OCI API signing key: *Console → Profile → User settings → API keys → Add API key*. Save the private key (e.g. `~/.oci/oci_api_key.pem`) and note the tenancy OCID, user OCID, fingerprint and region it shows.
- An SSH key pair (`ssh-keygen -t ed25519`)

## Create the server
```bash
cd infra/oci
cp terraform.tfvars.example terraform.tfvars   # fill it in; it is git-ignored
tofu init
tofu plan      # check: every line should be "will be created", nothing changed or destroyed
tofu apply
```
`tofu apply` prints the `url` and `public_ip`. The VM needs a couple of minutes for its first-boot setup.

## Deploy the site
From the repository root:
```bash
scripts/deploy-oci.sh
```
It runs the tests, builds `dist/`, waits until the server is ready and uploads it with `rsync`. Run it again after every change.

## Remove everything
```bash
cd infra/oci
tofu destroy
```
This deletes only the resources listed above.

## Troubleshooting
- **`Out of host capacity`**: free Arm capacity is often full. Try `availability_domain_index = 1` (or 2), retry later, or use `shape = "VM.Standard.E2.1.Micro"` (Always Free allows two of these per tenancy, so check how many you already run).
- **The page does not load**: run `ssh ubuntu@IP 'cloud-init status --long'` and `sudo systemctl status nginx`.
- **SSH or deploy times out**: your public IP probably changed (common with home routers). Run `tofu -chdir=infra/oci apply`: it detects your new IP and updates only the security list rule, in place. The VM and its public IP stay the same.

## Security notes
- `terraform.tfvars` and `*.tfstate` contain OCIDs and key paths. They are git-ignored; never commit them.
- SSH is limited to your current IP (auto-detected via `checkip.amazonaws.com`, or `admin_cidr` if you set it), and the server accepts SSH keys only, no passwords. Only the static site is public, and the app collects no personal data.
