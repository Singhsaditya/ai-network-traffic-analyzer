const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());

app.get("/analyze", (req, res) => {

    try {

        const filePath = path.resolve(__dirname, "../data/network_logs.csv");

        if (!fs.existsSync(filePath)) {
            return res.status(500).send("CSV file not found on server");
        }

        const file = fs.readFileSync(filePath, "utf8");

        const rows = file.trim().split("\n");

        const total = rows.length - 1;

        let anomalies = 0;

        for (let i = 1; i < rows.length; i++) {

            const cols = rows[i].split(",");

            const requestCount = parseInt(cols[6]);

            if (requestCount > 300) anomalies++;

        }

        const normal = total - anomalies;

        res.json({
            total,
            anomalies,
            normal
        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Server error");

    }

});

app.listen(5000, () => {
    console.log("AI Network Analyzer API running on port 5000");
});