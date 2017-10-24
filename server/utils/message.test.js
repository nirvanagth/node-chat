var expect = require('expect')
var{generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        var message = generateMessage('tianhao', 'hello')
        // assert from match
        expect(message.from).toBe('tianhao')
        // assert text match
        expect(message.text).toBe('hello')
        // assert createAt is number
        expect(typeof  message.createAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'tianhao'
        var latitude = 15
        var longitude = 23
        var url = 'https;//www.google.com/maps?=15,19'
        var message = generateLocationMessage(from, latitude, longitude)
        expect(message.from).toBe('tianhao')
        expect(typeof  message.createAt).toBe('number')
    })
})