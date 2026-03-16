import csv
import random
import time

output_file = "data/network_logs.csv"

headers = [
    "timestamp",
    "source_ip",
    "destination_ip",
    "port",
    "protocol",
    "packet_size",
    "request_count"
]

protocols = ["TCP", "UDP", "HTTP", "HTTPS"]

def random_ip():
    return ".".join(str(random.randint(1,255)) for _ in range(4))

with open(output_file, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(headers)

    for i in range(1000):

        timestamp = int(time.time())

        source_ip = random_ip()
        destination_ip = random_ip()

        port = random.choice([22, 80, 443, 21, 25, 8080])
        protocol = random.choice(protocols)

        packet_size = random.randint(40, 1500)

        # simulate suspicious bursts
        if random.random() < 0.05:
            request_count = random.randint(300, 600)
        else:
            request_count = random.randint(1, 120)

        writer.writerow([
            timestamp,
            source_ip,
            destination_ip,
            port,
            protocol,
            packet_size,
            request_count
        ])

