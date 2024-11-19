const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve static files for your HTML
app.use(express.static("addition/assets"));

// Handle form submission
app.post("/submit-form", (req, res) => {
    const formData = req.body;

    // Path to JSON file
    const filePath = path.join(__dirname, "addition/assets/data.json");

    // Read existing data or initialize an empty array
    let existingData = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath);
        existingData = JSON.parse(fileContent);
    }

    // Add new data to the array
    existingData.push(formData);

    // Write back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(200).send("Form data saved successfully!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
