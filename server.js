'use strict';

const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers')
const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise

const NODE_ENV = process.env.NODE_ENV || 'developement'
// Mongoose
const database = (NODE_ENV !== 'test') ? 'simple': 'simple_test'
const mongodbHost = process.env.MONGODB_URL || `127.0.0.1:27017/${database}`
Mongoose.connect(`mongodb://${mongodbHost}`, {useMongoClient: true})

// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: 3000,
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['token']
        }
    }
});

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

var routes = require('./routes/routes.js'); //require routes

server.route(routes); //add routes
// server.ext('onPreResponse', corsHeaders)