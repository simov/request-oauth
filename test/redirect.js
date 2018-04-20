
var t = require('assert')
var http = require('http')

var compose = require('request-compose')
compose.Request.oauth = require('../')
var request = compose.client


describe('redirect', () => {
  var server, oauthNonce1, oauthNonce2

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      if (req.url === '/redirect') {
        oauthNonce1 = req.headers.authorization
          .replace(/.*oauth_nonce="([^"]+)".*/, '$1')
        res.writeHead(302, {location: 'http://localhost:5000/response'})
      }
      else if (req.url === '/response') {
        oauthNonce2 = req.headers.authorization
          .replace(/.*oauth_nonce="([^"]+)".*/, '$1')
        res.writeHead(200, {'content-type': 'text/plain'})
      }
      res.end()
    })
    server.listen(5000, done)
  })

  it('refresh oauth_nonce on redirect', async () => {
    await request({
      url: 'http://localhost:5000/redirect',
      oauth: {
        consumer_key: 'consumer_key',
        consumer_secret: 'consumer_secret',
        token: 'token',
        token_secret: 'token_secret'
      }
    })
    t.ok(typeof oauthNonce1 === 'string')
    t.ok(typeof oauthNonce2 === 'string')
    t.equal(oauthNonce1.length, 32)
    t.equal(oauthNonce2.length, 32)
    t.notEqual(oauthNonce1, oauthNonce2)
  })

  after((done) => {
    server.close(done)
  })

})
