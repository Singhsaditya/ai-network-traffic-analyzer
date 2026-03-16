import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {

  const [anomalies, setAnomalies] = useState(0);
  const [normal, setNormal] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {

      const response = await axios.get(
        "https://ai-network-traffic-analyzer.onrender.com/analyze"
      );

      console.log("API DATA:", response.data);

      setAnomalies(response.data.anomalies);
      setNormal(response.data.normal);
      setTotal(response.data.total);

    } catch (error) {

      console.error("API ERROR:", error);

    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  const data = {
    labels: ["Normal Traffic", "Suspicious Traffic"],
    datasets: [
      {
        label: "Traffic Distribution",
        data: [normal, anomalies],
        backgroundColor: ["#36A2EB", "#FF6384"]
      }
    ]
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>AI Network Traffic Analyzer</h1>

      <h3>Live Monitoring</h3>

      <h2>Suspicious Activities Detected</h2>

      <div style={{ fontSize: "40px", color: "red", fontWeight: "bold" }}>
        {anomalies}
      </div>

      <p>Total Logs Processed: {total}</p>

      <div style={{ width: "600px" }}>
        <Bar data={data} />
      </div>

    </div>
  );
}

export default App;