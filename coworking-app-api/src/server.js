const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

// to enable http/websocket protocol
const app = express();
const server = http.Server(app);
const io = socketio(server);


// to define mongoDb connection
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-uyaue.mongodb.net/app-database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connectedUsers = {};
// event fired when we get a new user connection
io.on('connection', socket => {
    const { user_id } = socket.handshake.query; // it comes from frontend-ui
    connectedUsers[user_id] = socket.id;
});

// middleware for adding web socket to new users
app.use((req, res, next) => {
    // assign properties below to all requests
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


// "req.query" to access query string values
// "req.params" to access route params
// "req.body" to access the body from the request
// "req.headers" to access the headers from the request


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


// app.listen(3333);
server.listen(3333);
console.log('listening on port 3333');
