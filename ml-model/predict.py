import pandas as pd
import joblib

# Load trained model
model = joblib.load("ml-model/anomaly_model.pkl")

# Load network logs
data = pd.read_csv("data/network_logs.csv")

# Select features used during training
features = data[["port", "packet_size", "request_count"]]

# Run anomaly detection
predictions = model.predict(features)

# Add predictions to dataset
data["anomaly"] = predictions

# Save analyzed results
data.to_csv("data/analyzed_logs.csv", index=False)

# Count anomalies
anomaly_count = (data["anomaly"] == -1).sum()

print("Analysis completed")
print(f"Suspicious activities detected: {anomaly_count}")