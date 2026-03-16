const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());

app.get("/analyze", (req, res) => {

    exec("python ml-model/predict.py", (error, stdout, stderr) => {

        if (error) {
            console.error(error);
            return res.status(500).send("Error running AI model");
        }

        try {

            const result = JSON.parse(stdout);

            res.json(result);

        } catch (err) {

            console.error("JSON parse error:", err);
            res.status(500).send("Error parsing AI output");

        }

    });

});

app.listen(5000, () => {
    console.log("AI Network Analyzer API running on port 5000");
});