var app = require('express')();
const cors = require('cors');
const { addUser,removeUser,getCurrentUser,getAllUsers } = require("./users");
app.use(cors());


var http = require('http').createServer(app);
const PORT = process.env.PORT || 5000;


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


var io = require('socket.io')(http, options={
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('new client connected');
    

    socket.on('joinRoom',({name,channel}) => {
          console.log('join')
          console.log(name)
          const newUser = addUser({id:socket.id,name,room:channel})
          console.log(newUser)
                 socket.join(newUser.room);
                 socket.emit('message',{
                    userId:socket.id,
                    username:"admin",
                    text:`welcome ${newUser.name} to chat room ${newUser.room}` 
                 });
        
                 socket.broadcast.to(newUser.room).emit('message',{
                    userId:socket.id,
                    username:"admin",
                    text:`${newUser.name} has joined the chat` 
                });

                io.to(newUser.room).emit('users',getAllUsers())
            });
        
            socket.on('chat',(text) => {
                console.log('chat');
                const user = getCurrentUser(socket.id);
                console.log(user);
                if(user) {
                    console.log('yes!')
                    io.to(user.room).emit('message',{
                        userId:user.id,
                        username:user.name,
                        text:text
                    });

                    console.log({
                        userId:user.id,
                        username:user.name,
                        text:text
                    })
                    console.log('send!')
                }
            })
        
            socket.on('disconnect',() => {
                console.log('disconected')
                const removedUser = removeUser(socket.id);
                if(removedUser) {
                    io.to(removedUser.room).emit('message',{
                        userId:removedUser.id,
                        username:"admin"
                        ,
                        text:`${removedUser.name} has been disconnect from room`
                    })
                    io.to(removedUser.room).emit('users',getAllUsers())
                }
            })
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});