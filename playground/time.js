var moment = require('moment')


var date = moment() //current point of time
date.add(1, 'year').subtract(9, 'month')
console.log(date.format('MMM Do, YYYY'))
console.log(date.format('h:mm a'))