const express = require('express');
const socketIO = require('socket.io');
const PORT = 1000;
const users = {};
const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const server = app.listen(PORT, (error) => {
    console.log(`Listening on port: ${PORT}`);
    if(error){
        console.log('something went wrong with server');
    }else{
        console.log(`Server is running on port: ${PORT}`);
    }
});

const io = socketIO(server); //io is the websocket server

io.on('connection', (socket)=>{ //creates channel called socket
    console.log('A user connected');

    socket.on('chat-message', (msg) =>{ //adds chat message event listner to channel
        data = {message: msg, sender: users[socket.id]}
        socket.broadcast.emit('send-message', data); //websocket server sends the message to all clients
    });

    socket.on('new-user', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    });

    socket.on('', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    });

    socket.on('disconnect', ()=>{
        console.log('User disconnected');
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});
  


