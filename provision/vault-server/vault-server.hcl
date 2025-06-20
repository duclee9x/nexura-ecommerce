# Vault Server Configuration File (vault.hcl)

# --- Storage Backend ---
# This section tells Vault where to store its data.
# For simple setups or development, 'file' storage is convenient.
# For production environments, consider more robust, highly available options
# like Integrated Storage (Raft), Consul, or cloud-specific storage backends.
storage "file" {
  path = "./data" # The directory where Vault will keep its persistent data.
}

ui            = true
api_addr      = "http://0.0.0.0:8200"
log_level     = "debug"

listener "tcp" {
  address = "0.0.0.0:8200" # Listens on all network interfaces on port 8200.
  tls_disable = true      # Set this to 'false' to enable TLS, which is highly recommended.
}
