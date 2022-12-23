// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { Router } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const PORT = 2022;
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));

// get Route
app.get("/data", GetData);
function GetData(req, res) {
  res.send(projectData);
  projectData = [];
}

// post Route
app.post("/add_Data", AddData);
function AddData(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData.push(newEntry);
}
