const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 3000

var app = express()
var server = http.createServer((app))
var io = socketIO(server)

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
    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', { // send the message to all users
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})



server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})