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
    var formattedTime = moment(message.createAt).format('h:mm a')
    console.log('New Message', message)
    var li = jQuery('<li></li>')
    li.text(`${message.from} ${formattedTime}: ${message.text}`)

    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a')

    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.from} ${formattedTime}: `)
    a.attr('href', message.url)
    li.append(a)
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

    var messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location.')
    })
})
