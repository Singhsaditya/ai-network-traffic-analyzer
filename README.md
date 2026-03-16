# AI Network Traffic Analyzer

AI-powered system that analyzes network traffic logs and detects suspicious activities using machine learning. The system processes network log data and classifies traffic as normal or anomalous, providing a real-time dashboard for monitoring.

## Live Demo
Frontend: https://ai-network-traffic-analyzer.vercel.app  
Backend API: https://ai-network-traffic-analyzer.onrender.com/analyze  

## Features
- Detect suspicious network traffic using machine learning
- Real-time traffic monitoring dashboard
- Automatic log analysis
- Data visualization using charts
- Cloud deployment

## Tech Stack
Frontend:
- React.js
- Chart.js
- Axios

Backend:
- Node.js
- Express.js

Machine Learning:
- Python
- Scikit-learn
- Pandas

Deployment:
- Vercel (Frontend)
- Render (Backend)

## System Architecture
React Dashboard → Node API → Python ML Model → Network Logs → Prediction

## Project Workflow
1. Network traffic logs are stored in CSV format.
2. Node.js API triggers the Python ML model.
3. The ML model analyzes traffic patterns.
4. Suspicious activities are detected.
5. Results are returned to the React dashboard for visualization.

## Sample Output
