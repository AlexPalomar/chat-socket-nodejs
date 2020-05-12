const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//Initialization
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//Setting
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//Middleware
// app.use(morgan('dev'));
// app.use(express.static('src/public'));
app.use(express.static(path.join(__dirname, 'public')));
//Routes 

//start the server 
server.listen(app.get('port'), () =>{ 
    console.log('Server running on port ', app.get('port'));
});