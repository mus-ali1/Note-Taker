const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api.js");


// Set the environment variable PORT to tell your web server what port to listen on, also set variable for experess for use later on.
const PORT = process.env.PORT || 3001;
const app = express();

//Returns middleware that parses both json and urlencoded. The options are passed to both middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

