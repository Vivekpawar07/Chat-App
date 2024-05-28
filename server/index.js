const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const http = require('http')
const userModel = require('./schema/user')
const status = require('./routes/usersStatus')
require('dotenv').config();
const PORT = process.env.PORT ;
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup')
const contacts = require("./routes/getAllusers")
const addmsg = require("./routes/messages")
const getmsg = require("./routes/getAllmsg")
const app = express();
const server = http.createServer(app); 
const {Server} = require('socket.io')
app.use(cors());
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
app.use('/Avatars', express.static(path.join(__dirname, 'Avatars')));
//login
app.use(loginRoutes)
//signup
app.use(signupRoutes)
// get all users in database
app.use(contacts)
// add msg to the database
app.use(addmsg)
// get appmessages
app.use(getmsg)
// is user online or offline
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods:['GET','POST']
    }
  })
const userNamespace =io.of("online-users")
userNamespace.on("connection",async(socket)=>{
    console.log('user connected')
    console.log(socket)
    const user_id = socket.handshake.auth.token
    await userModel.findByIdAndUpdate(user_id, { $set: { isOnline: true }})

    socket.on('disconnect',async()=>{
        console.log('user disconnected')
        await userModel.findByIdAndUpdate(user_id, { $set: { isOnline: false }})
    })

})
io.on('connection',(socket)=>{
    socket.on('new-chat', (data) => {
      socket.broadcast.emit('loadNewChat', data);
    });
  });
  
app.use(status)
server.listen(PORT,()=>{
    console.log("thala is listening", PORT)
})

