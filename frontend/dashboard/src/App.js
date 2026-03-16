import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {

  const [anomalies, setAnomalies] = useState(0);
  const [normal, setNormal] = useState(0);
  const [total, setTotal] = useState(0);

  const analyzeTraffic = async () => {

    try {

      const response = await axios.get(
        "https://ai-network-traffic-analyzer.onrender.com/analyze"
      );

      const data = response.data;

      setAnomalies(data.anomalies);
      setNormal(data.normal);
      setTotal(data.total);

    } catch (error) {

      console.error("API error:", error);

    }

  };

  // AUTO REFRESH EVERY 5 SECONDS
  useEffect(() => {

    analyzeTraffic();

    const interval = setInterval(() => {
      analyzeTraffic();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const data = {
    labels: ["Normal Traffic", "Suspicious Traffic"],
    datasets: [
      {
        label: "Traffic Analysis",
        data: [normal, anomalies],
        backgroundColor: ["#36A2EB", "#FF6384"]
      }
    ]
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>AI Network Traffic Analyzer</h1>

      <h3>Live Monitoring</h3>

      <div style={{ marginBottom: "30px" }}>

        <h2>Suspicious Activities Detected</h2>

        <div style={{
          fontSize: "40px",
          color: "#ff4444",
          fontWeight: "bold"
        }}>
          {anomalies}
        </div>

        <p>Total Logs Processed: {total}</p>

      </div>

      <div style={{ width: "600px" }}>
        <Bar data={data} />
      </div>

    </div>
  );
}

export default App;