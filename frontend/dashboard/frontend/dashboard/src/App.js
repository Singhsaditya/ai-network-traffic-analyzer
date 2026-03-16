import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function App() {

  const [anomalies, setAnomalies] = useState(0);
  const [normal, setNormal] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {

      const response = await axios.get(
        "https://ai-network-traffic-analyzer.onrender.com/analyze"
      );

      const data = response.data;

      setAnomalies(data.anomalies);
      setNormal(data.normal);
      setTotal(data.total);

    } catch (error) {

      console.error("API ERROR:", error);

    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  const chartData = {
    labels: ["Normal Traffic", "Suspicious Traffic"],
    datasets: [
      {
        label: "Traffic",
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
        <Bar data={chartData} />
      </div>

    </div>
  );
}

export default App;