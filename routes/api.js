//Routing for our API requests//
const api = require("express").Router();
const fs = require("fs");
// Id generator 
const { v4: uuidv4 } = require("uuid");



// Declare .get request from our server

api.get("/", (req, res) => {
    console.log(`${req.method} request received.`);

    fs.readFile("../db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(404).send("Notes not found").end();
        }

        res.json(JSON.parse(data));
    })
})


// Declare .post request plus validate incoming note 
api.post("/", (req, res) => {

    const { title, text } = req.body;


    if (!title || !text) {
        res.status(500).statusMessage("Not all the required data").end();
    } else {
        //create our new note object
        const newNote = {
            id: uuidv4(),
            title,
            text
        }


        // Update our ReadFile and send data back as Json and then update db.json

        fs.readFile("../db/db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err)
            } else {

                const notesArray = JSON.parse(data);
                notesArray.push(newNote);

                res.json(JSON.parse(data));


                fs.writeFile("../db/db.json", JSON.stringify(notesArray, null, 4), err =>
                    err ? console.error(err) : console.log("Data written to file.")
                )
            }
        })
    }
})



// Allows delete function to be handled by returning updated notes to readFile and then subsequently updates our db.json file

api.delete("/:id", (req, res) => {

    fs.readFile("../db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(404).send("Notes not found").end();
        }

        const notesArray = JSON.parse(data)

        const updatedNotes = notesArray.filter(note => note.id !== req.params.id)


        res.json(updatedNotes);


        fs.writeFile("../db/db.json", JSON.stringify(updatedNotes, null, 4), err =>
            err ? console.error(err) : console.log("Note deleted from file.")
        )


    })


})
module.exports = api;