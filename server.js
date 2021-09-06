const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");


// Set the environment variable PORT to tell your web server what port to listen on, also set variable for experess for use later on.
const PORT = process.env.PORT || 3001;
const app = express();

//Returns middleware that parses both json and urlencoded. The options are passed to both middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// Sets up route which forwards all API requests
app.use("/api/notes", apiRouter);


//Return notes.html
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//Returns index.html for any other requests 
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
)


// Ensures server is listening for requests at the correct port
app.listen(PORT, () =>
    console.log(`Listening for requests on port ${PORT}.`)
);


