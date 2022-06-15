const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./src/users');

const restController = require('./src/controllers/restController')

mongoose.connect('mongodb+srv://CASAdmin:cardsagainststudent@cas.yqcqx.mongodb.net/CASDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

io.on('connection', socket => {
    const _id = socket.id
    console.log(`User ${_id} just connected!`);

    socket.on('getCards', restController.getBlackCardByID);

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
    
        socket.join(user.room);
    
        // Welcome current user
        socket.emit('message', 'Welcome!');
    
        // Broadcast when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            'message',
            `${user.username} has joined!`
          );
    
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      });

    socket.on('disconnect', () => {
        console.log('Socket disconnected: ' + _id)
    })
});

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: 'null'}));
app.use(require('./src/routes'));

server.listen(3000, () => console.log('API and Socket Server - started on port http://localhost:3000/'));

