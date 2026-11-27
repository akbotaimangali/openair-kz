output "public_ip" {
  description = "Public IP of the web server."
  value       = oci_core_instance.web.public_ip
}

output "url" {
  description = "Where the site is served."
  value       = "http://${oci_core_instance.web.public_ip}/"
}

output "ssh_allowed_from" {
  description = "The only address range allowed to SSH in."
  value       = local.admin_cidr
}

output "ssh" {
  description = "SSH command for the admin."
  value       = "ssh ubuntu@${oci_core_instance.web.public_ip}"
}
