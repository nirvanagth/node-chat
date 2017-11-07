const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer((app))
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath)) //config static express middleware

io.on('connection', (socket) => {
    console.log('New user connected')



    socket.emit('newEmail', {
        from: 'tianhao@gmail.com',
        text: 'See you then',
        createAt: '12343434'
    })

    // socket.emit('newMessage', {
    //     from: 'tianhao',
    //     text: 'nope',
    //     createAt: '647326'
    // })


    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room number are required')
        }

        socket.join(params.room) //let people talk in the same room
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        // socket.emit from Admin text Welcome to the chat app
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

        // socket.broadcast.emit from Admin text New usr joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))

        callback()
    })
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))// send the message to all users including self

        }
        callback('this is form the server.') //acknowledgement
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // }) // send the message to everybody else
    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }

    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    })
})



server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})