#!/usr/bin/env bash
# Build OpenAir KZ and upload it to the OCI web server created by infra/oci.
# Usage: scripts/deploy-oci.sh [HOST]   (HOST defaults to the OpenTofu output)
set -euo pipefail

cd "$(dirname "$0")/.."

HOST="${1:-$(tofu -chdir=infra/oci output -raw public_ip)}"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new)

echo "==> Testing and building"
npm test
npm run build

echo "==> Waiting for server setup (cloud-init) on $HOST"
if ! ssh "${SSH_OPTS[@]}" -o ConnectTimeout=15 "ubuntu@$HOST" 'cloud-init status --wait >/dev/null'; then
  echo "Cannot reach $HOST over SSH. If your public IP changed, run: tofu -chdir=infra/oci apply" >&2
  exit 1
fi

echo "==> Uploading dist/"
rsync -az --delete -e "ssh ${SSH_OPTS[*]}" dist/ "ubuntu@$HOST:/var/www/openair/"

echo "==> Done: http://$HOST/"
