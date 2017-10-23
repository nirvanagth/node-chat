var expect = require('expect')
var{generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        var message = generateMessage('tianhao', 'hello')
        // assert from match
        expect(message.from).toBe('tianhao')
        // assert text match
        expect(message.text).toBe('hello')
        // assert createAt is number
        expect(typeof  res.createAt).toBe('number')
    })
} )