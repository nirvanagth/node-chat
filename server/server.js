const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const {generateMessage} = require('./utils/message')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer((app))
var io = socketIO(server)

app.use(express.static(publicPath)) //config static express middleware

io.on('connection', (socket) => {
    console.log('New user connected')

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    // socket.broadcast.emit from Admin text New usr joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

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
    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.from, message.text))// send the message to all users including self

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // }) // send the message to everybody else
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})



server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})