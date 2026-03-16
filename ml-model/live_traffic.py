import csv
import random
import time
from datetime import datetime

output_file = "data/network_logs.csv"

protocols = ["TCP", "UDP", "HTTP", "HTTPS"]

def random_ip():
    return ".".join(str(random.randint(1,255)) for _ in range(4))

while True:

    timestamp = datetime.now().strftime("%H:%M:%S")

    source_ip = random_ip()
    destination_ip = random_ip()

    port = random.choice([22,80,443,21,25,8080])
    protocol = random.choice(protocols)

    packet_size = random.randint(40,1500)

    if random.random() < 0.05:
        request_count = random.randint(300,600)
    else:
        request_count = random.randint(1,120)

    row = [
        timestamp,
        source_ip,
        destination_ip,
        port,
        protocol,
        packet_size,
        request_count
    ]

    with open(output_file,"a",newline="") as f:
        writer = csv.writer(f)
        writer.writerow(row)

    print("New traffic log generated")

    time.sleep(1)
    