import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function App() {

  const [result, setResult] = useState("");
  const [anomalies, setAnomalies] = useState(0);

  const analyzeTraffic = async () => {

    const response = await axios.get("https://ai-network-traffic-analyzer.onrender.com");

    setResult(response.data);

    const match = response.data.match(/\d+/);

    if (match) {
      setAnomalies(parseInt(match[0]));
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
        data: [1000 - anomalies, anomalies],
        backgroundColor: ["#36A2EB", "#FF6384"]
      }
    ]
  };

  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>

      <h1>AI Network Traffic Analyzer</h1>

      <h3>Live Monitoring</h3>

      <div style={{marginBottom:"30px"}}>

        <h2>Suspicious Activities Detected</h2>

        <div style={{
          fontSize:"40px",
          color:"#ff4444",
          fontWeight:"bold"
        }}>
          {anomalies}
        </div>

      </div>

      <div style={{width:"600px"}}>
        <Bar data={data} />
      </div>

      <pre style={{
        marginTop:"30px",
        background:"#111",
        color:"#0f0",
        padding:"20px"
      }}>
        {result}
      </pre>

    </div>
  );
}

export default App;