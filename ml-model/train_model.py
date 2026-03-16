import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

# Load dataset
data = pd.read_csv("data/network_logs.csv")

# Use numeric features
features = data[["port", "packet_size", "request_count"]]

# Train anomaly detection model
model = IsolationForest(
    contamination=0.05,
    random_state=42
)

model.fit(features)

# Save trained model
joblib.dump(model, "ml-model/anomaly_model.pkl")

print("Model trained and saved successfully")