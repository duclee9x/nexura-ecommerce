import miniupnpc
import requests
import os

# ========== CONFIG ==========
CLOUDFLARE_API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")
CLOUDFLARE_ZONE_ID = os.getenv("CLOUDFLARE_ZONE_ID")
DNS_RECORD_NAMES = [
    "duclee.store",
    "grafana.duclee.store",
    "prometheus.duclee.store",
    "alertmanager.duclee.store",
    "argocd.duclee.store",
    "vault.duclee.store"
]

# ========== HELPERS ==========

def get_upnp_ip():
    upnp = miniupnpc.UPnP()
    upnp.discoverdelay = 200
    upnp.discover()
    upnp.selectigd()
    return upnp.externalipaddress()

def get_dns_record_id_and_ip(zone_id, record_name):
    headers = {
        "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?type=A&name={record_name}"
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    result = response.json()['result']
    if not result:
        raise Exception(f"A record for {record_name} not found.")
    return result[0]['id'], result[0]['content']

def update_dns_record(zone_id, record_id, record_name, ip):
    headers = {
        "Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "type": "A",
        "name": record_name,
        "content": ip,
        "ttl": 120,
        "proxied": False
    }
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}"
    response = requests.put(url, headers=headers, json=data)
    response.raise_for_status()
    print(f"[✓] Updated {record_name} to {ip}")

# ========== MAIN ==========

def main():
    try:
        current_ip = get_upnp_ip()
        print(f"[i] Current external IP (via UPnP): {current_ip}")
    except Exception as e:
        print(f"[!] Failed to get IP via UPnP: {e}")
        return

    for record_name in DNS_RECORD_NAMES:
        try:
            record_id, old_ip = get_dns_record_id_and_ip(CLOUDFLARE_ZONE_ID, record_name)
            if old_ip == current_ip:
                print(f"[=] {record_name} already points to {current_ip}")
            else:
                print(f"[~] Updating {record_name} from {old_ip} to {current_ip}")
                update_dns_record(CLOUDFLARE_ZONE_ID, record_id, record_name, current_ip)
        except Exception as err:
            print(f"[!] Error processing {record_name}: {err}")

if __name__ == "__main__":
    main()