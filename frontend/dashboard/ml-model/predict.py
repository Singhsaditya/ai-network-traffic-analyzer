import pandas as pd
import joblib
import json

model = joblib.load("../ml-model/anomaly_model.pkl")
data = pd.read_csv("../data/network_logs.csv")

# Select features
features = data[["port", "packet_size", "request_count"]]

# Predict anomalies
predictions = model.predict(features)

data["anomaly"] = predictions

# Count anomalies
anomaly_count = (data["anomaly"] == -1).sum()

# Total logs
total_logs = len(data)

# Normal traffic
normal_count = total_logs - anomaly_count

result = {
    "total": int(total_logs),
    "anomalies": int(anomaly_count),
    "normal": int(normal_count)
}

print(json.dumps(result))