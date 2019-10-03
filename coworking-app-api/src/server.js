const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-uyaue.mongodb.net/app-datbase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// "req.query" to access query string values
// "req.params" to access route params
// "req.body" to access the body from the request
// "req.headers" to access the headers from the request

app.use(express.json());

app.use(routes);

app.listen(3333);
console.log('listening on port 3333');
