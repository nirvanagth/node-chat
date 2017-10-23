var socket = io()

socket.on('connect', function () { //client side js should use function in case browser does not support ES6
    console.log('Connected to server')


    // socket.emit('createMessage', {
    //     from: 'Tianhao',
    //     text: 'shit happens'
    // })
    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey. This is Tianhao'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newEmail', function (email) {
    console.log('New Email', email)
})

socket.on('newMessage', function (message) {
    console.log('New Message', message)
})
