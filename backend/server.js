const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());

app.get("/analyze", (req, res) => {

    exec("python ml-model/predict.py", (error, stdout, stderr) => {

        if (error) {
            return res.send("Error running AI model");
        }

        res.send(stdout);

    });

});

app.listen(5000, () => {
    console.log("AI Network Analyzer API running on port 5000");
});