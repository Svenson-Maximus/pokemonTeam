// Imports
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
const cors = require('cors')
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');


// Set up App
const app = express();
app.use(cors()); // Allow all cross-origing requests. More information: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(express.static('public')); // Host all static files in the folder /public
app.use(bodyParser.json()); // Support json encoded bodies
const port = process.env.PORT || '3001'; // Use the PORT variable if set (e.g., when deploying to Heroku)
app.set('port', port);

const server = http.createServer(app);


// Create the client and connect to the database
let database;
const client = new MongoClient(config.mongodb_connection_string);
client.connect((error, db) => {
    if (error || !db) {
        console.log("Could not connect to MongoDB:")
        console.log(error.message);
    }
    else {
        database = db.db('MEP');
        console.log("Successfully connected to MongoDB.");
    }
})

//##################################################################################################
// ENDPOINTS 
//##################################################################################################

//--------------------------------------------------------------------------------------------------
// Welcome message
//--------------------------------------------------------------------------------------------------
app.get('/api', async (req, res) => {
    res.send("Welcome to the Pokemon Databse API");
})

//--------------------------------------------------------------------------------------------------
// Get all trainers
//--------------------------------------------------------------------------------------------------
app.get('/api/trainers', async (req, res) => {
    try {
        const collection = database.collection('trainers');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = {};

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get all pokemon
//--------------------------------------------------------------------------------------------------
app.get('/api/pokemons', async (req, res) => {
    try {
        const collection = database.collection('pokemons');

        // You can specify a query/filter here
        // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
        const query = {};

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get a pokemon by their id
//--------------------------------------------------------------------------------------------------
app.get('/api/pokemons/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('pokemons');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.findOne(query);

        if (!result) {
            let responseBody = {
                status: "No object with Name " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Create a new trainer
//--------------------------------------------------------------------------------------------------
app.post('/api/trainers', async (req, res) => {

    try {
        const collection = database.collection('trainers');

        var trainers = {
            name: req.body.name,
            gymbadges: req.body.gymbadges,
            age: req.body.age,
            pokemon: req.body.pokemon
        };
        const result = await collection.insertOne(trainers);

        res.status(201).send({ name: result.insertedName });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Update an existing trainer
//--------------------------------------------------------------------------------------------------
app.put('/api/trainers/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;
    let trainersPokemon = req.body;
    delete trainers._id; // delete the _id from the object, because the _id cannot be updated

    try {
        const collection = database.collection('trainers');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.updateOne(query, { $set: trainersPokemon });

        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No trainer with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Trainer with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
/*
//--------------------------------------------------------------------------------------------------
// Delete an existing trainer
//--------------------------------------------------------------------------------------------------
app.delete('/api/trainers/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('trainers');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = {
                status: "No trainer with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            let responseBody = {
                status: "Trainer with id " + id + " has been successfully deleted."
            }
            res.send(responseBody);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
*/

//--------------------------------------------------------------------------------------------------
// Get an trainer by its id
//--------------------------------------------------------------------------------------------------
app.get('/api/trainers/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('trainers');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.findOne(query);

        if (!result) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})



//--------------------------------------------------------------------------------------------------
// Start the server
//--------------------------------------------------------------------------------------------------
server.listen(port, () => console.log("app listening on port " + port));
