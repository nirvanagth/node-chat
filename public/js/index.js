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
    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//     from: 'apple',
//     text: 'nice'
// }, function(data) {
//     console.log('Got it', data)
// })

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name = message]').val()
    }, function () {

    })
})
