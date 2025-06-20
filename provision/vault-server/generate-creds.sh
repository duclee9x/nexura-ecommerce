#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

CERT_KEY="vault.key"
CERT_CSR="vault.csr"
CERT_CRT="vault.crt"
CERTS_DIR="certs"
CERTS_KEY="$CERTS_DIR/vault.key"
CERTS_CRT="$CERTS_DIR/vault.crt"

# If certs exist in certs/ directory, skip generation
if [ -f "$CERTS_KEY" ] && [ -f "$CERTS_CRT" ]; then
  echo "Certificates already exist in $CERTS_DIR. Skipping credential generation."
  exit 0
fi

# If certs exist in current directory, skip generation
if [ -f "$CERT_KEY" ] && [ -f "$CERT_CRT" ]; then
  echo "Certificates already exist in current directory. Skipping credential generation."
  exit 0
fi

# Generate private key if it does not exist
if [ ! -f "$CERT_KEY" ]; then
  echo "Generating private key: $CERT_KEY"
  openssl genrsa -out "$CERT_KEY" 2048
else
  echo "Private key already exists: $CERT_KEY"
fi

# Generate certificate signing request if it does not exist
if [ ! -f "$CERT_CSR" ]; then
  echo "Generating CSR: $CERT_CSR"
  openssl req -new -key "$CERT_KEY" -out "$CERT_CSR" \
    -subj "/CN=vault.nexura.com/O=MyOrg" \
    -addext "subjectAltName=DNS:vault.nexura.com"
else
  echo "CSR already exists: $CERT_CSR"
fi

# Generate self-signed certificate if it does not exist
if [ ! -f "$CERT_CRT" ]; then
  echo "Generating self-signed certificate: $CERT_CRT"
  openssl x509 -req -days 365 -in "$CERT_CSR" -signkey "$CERT_KEY" -out "$CERT_CRT"
else
  echo "Certificate already exists: $CERT_CRT"
fi