require("dotenv").config(); // Require the dotenv
const express = require('express'); // Require Express web framework for NodeJS
const mongoose = require('mongoose'); // Require Mongoose - MongoDB schema /model validation library
const Record = require('./api/models/recordModel'); // created model loading here
const PORT = process.env.PORT || 8008; // create PORT from .env or use 8008

// create the MongoDB connection string from .env value or use mongodb://localhost/test (stand alone local database)
const mongoConnectStr = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost/test';

// mongoose instance connection url connection
//************************************************ */
mongoose.Promise = global.Promise;
mongoose
    .connect(mongoConnectStr, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    })
    .then(() => {
        console.log("Database connection Success!");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });
//************************************************* */

const app = express(); // Declare the Express Application for configuring, running and rendering the web framework

// don't expose we use Express. need to know basis
app.set('x-powered-by', false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const routes = require('./api/routes/commonApiRoutes'); //importing route
routes(app); //register the route

// App Error Middlewear
app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});


app.listen(PORT);


console.log('A music record catalogue RESTful API server started on: ' + PORT);
