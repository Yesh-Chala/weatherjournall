// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;

const Server = app.listen(port, () => {
    console.log("Running on local host:"+port);
});

//get
app.get("/bring", (req, res) => {
    res.send(projectData);
});

//Post
app.post("/send", (req, res) =>{
    console.log(req.body);
        projectData.date = req.body.date;
        projectData.time = req.body.time;
        projectData.temp = req.body.temp;
        projectData.content = req.body.content;
        res.send(req.body);
});