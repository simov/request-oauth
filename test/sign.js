
// https://developer.twitter.com/en/docs/basics/authentication/overview/oauth

var t = require('assert')
var fs = require('fs')
var path = require('path')
var qs = require('querystring')
var crypto = require('crypto')

var compose = require('request-compose')
var Request = compose.Request
var Response = compose.Response
var mw = require('../')

var oauth = require('oauth-sign')
var rsaPrivatePEM = fs.readFileSync(path.join(__dirname, 'ssl', 'test.key'))

var sign = {
  reqsign: {
    request: {
      method: 'POST',
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11',
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk',
        timestamp: '1272323042',
        version: '1.0',
        consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98'
      },
    },
    oauth: {
      consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98',
      signature: '8wUi7m5HFQy76nowoCThusfgB+Q=',
      params: {
        oauth_callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11',
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: '1272323042',
        oauth_version: '1.0'
      }
    }
  },
  reqsignRSA: {
    request: {
      method: 'POST',
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11',
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk',
        timestamp: '1272323042',
        version: '1.0',
        private_key: rsaPrivatePEM,
        signature_method: 'RSA-SHA1'
      }
    },
    oauth: {
      signature: 'MXdzEnIrQco3ACPoVWxCwv5pxYrm5MFRXbsP3LfRV+zfcRr+WMp/dOPS/3r+Wcb+17Z2IK3uJ8dMHfzb5LiDNCTUIj7SWBrbxOpy3Y6SA6z3vcrtjSekkTHLek1j+mzxOi3r3fkbYaNwjHx3PyoFSazbEstnkQQotbITeFt5FBE=',
      params: {
        oauth_callback: 'http://localhost:3005/the_dance/process_callback?service_provider_id=11',
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk',
        oauth_signature_method: 'RSA-SHA1',
        oauth_timestamp: '1272323042',
        oauth_version: '1.0'
      }
    }
  },
  accsign: {
    request: {
      method: 'POST',
      url: 'https://api.twitter.com/oauth/access_token',
      oauth: {
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8',
        signature_method: 'HMAC-SHA1',
        token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc',
        timestamp: '1272323047',
        verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY',
        version: '1.0',
        consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98',
        token_secret: 'x6qpRnlEmW9JbQn4PQVVeVG8ZLPEx6A0TOebgwcuA'
      }
    },
    oauth: {
      consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98',
      token_secret: 'x6qpRnlEmW9JbQn4PQVVeVG8ZLPEx6A0TOebgwcuA',
      signature: 'PUw/dHA4fnlJYM6RhXk5IU/0fCc=',
      params: {
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc',
        oauth_timestamp: '1272323047',
        oauth_verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY',
        oauth_version: '1.0'
      }
    }
  },
  accsignRSA: {
    request: {
      method: 'POST',
      url: 'https://api.twitter.com/oauth/access_token',
      oauth: {
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8',
        signature_method: 'RSA-SHA1',
        token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc',
        timestamp: '1272323047',
        verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY',
        version: '1.0',
        private_key: rsaPrivatePEM
      }
    },
    oauth: {
      signature: 'gZrMPexdgGMVUl9H6RxK0MbR6Db8tzf2kIIj52kOrDFcMgh4BunMBgUZAO1msUwz6oqZIvkVqyfyDAOP2wIrpYem0mBg3vqwPIroSE1AlUWo+TtQxOTuqrU+3kDcXpdvJe7CAX5hUx9Np/iGRqaCcgByqb9DaCcQ9ViQ+0wJiXI=',
      params: {
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: '9zWH6qe0qG7Lc1telCn7FhUbLyVdjEaL3MO5uHxn8',
        oauth_signature_method: 'RSA-SHA1',
        oauth_token: '8ldIZyxQeVrFZXFOZH5tAwj6vzJYuLQpl0WUEYtWc',
        oauth_timestamp: '1272323047',
        oauth_verifier: 'pDNg57prOHapMbhv25RNf75lVRd6JDsni1AJJIDYoTY',
        oauth_version: '1.0'
      }
    }
  },
  upsign: {
    request: {
      method: 'POST',
      url: 'http://api.twitter.com/1/statuses/update.json',
      oauth: {
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: 'oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y',
        signature_method: 'HMAC-SHA1',
        token: '819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw',
        timestamp: '1272325550',
        version: '1.0',
        consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98',
        token_secret: 'J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA'
      },
      form: {
        status: 'setting up my twitter 私のさえずりを設定する'
      }
    },
    oauth: {
      consumer_secret: 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98',
      token_secret: 'J6zix3FfA9LofH0awS24M3HcBYXO5nI1iYe8EfBA',
      signature: 'yOahq5m0YjDDjfjxHaXEsW9D+X0=',
      params: {
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: 'oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_token: '819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw',
        oauth_timestamp: '1272325550',
        oauth_version: '1.0'
      }
    }
  },
  upsignRSA: {
    request: {
      method: 'POST',
      url: 'http://api.twitter.com/1/statuses/update.json',
      oauth: {
        consumer_key: 'GDdmIQH6jhtmLUypg82g',
        nonce: 'oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y',
        signature_method: 'RSA-SHA1',
        token: '819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw',
        timestamp: '1272325550',
        version: '1.0',
        private_key: rsaPrivatePEM
      },
      form: {
        status: 'setting up my twitter 私のさえずりを設定する'
      }
    },
    oauth: {
      signature: 'fF4G9BNzDxPu/htctzh9CWzGhtXo9DYYl+ZyRO1/QNOhOZPqnWVUOT+CGUKxmAeJSzLKMAH8y/MFSHI0lzihqwgfZr7nUhTx6kH7lUChcVasr+TZ4qPqvGGEhfJ8Av8D5dF5fytfCSzct62uONU0iHYVqainP+zefk1K7Ptb6hI=',
      params: {
        oauth_consumer_key: 'GDdmIQH6jhtmLUypg82g',
        oauth_nonce: 'oElnnMTQIZvqvlfXM56aBLAf5noGD0AQR3Fmi7Q6Y',
        oauth_signature_method: 'RSA-SHA1',
        oauth_token: '819797-Jxq8aYUDRmykzVKrgoLhXSq67TEa5ruc4GJC2rWimw',
        oauth_timestamp: '1272325550',
        oauth_version: '1.0'
      }
    }
  },
  rfc5849: {
    request: {
      method: 'POST',
      url: 'http://example.com/request?b5=%3D%253D&a3=a&c%40=&a2=r%20b',
      oauth: {
        consumer_key: '9djdj82h48djs9d2',
        nonce: '7d8f3e4a',
        signature_method: 'HMAC-SHA1',
        token: 'kkk9d7dh3k39sjv7',
        timestamp: '137131201',
        consumer_secret: 'j49sk3j29djd',
        token_secret: 'dh893hdasih9',
        realm: 'Example'
      },
      form: {
        c2: '',
        a3: '2 q'
      }
    },
    oauth: {
      signature: 'OB33pYjWAnf+xtOHN4Gmbdil168=',
      params: {
        realm: 'Example',
        oauth_consumer_key: '9djdj82h48djs9d2',
        oauth_nonce: '7d8f3e4a',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: '137131201',
        oauth_token: 'kkk9d7dh3k39sjv7',
        oauth_version: '1.0'
      }
    }
  },
  rfc5849RSA: {
    request: {
      method: 'POST',
      url: 'http://example.com/request?b5=%3D%253D&a3=a&c%40=&a2=r%20b',
      oauth: {
        consumer_key: '9djdj82h48djs9d2',
        nonce: '7d8f3e4a',
        signature_method: 'RSA-SHA1',
        token: 'kkk9d7dh3k39sjv7',
        timestamp: '137131201',
        private_key: rsaPrivatePEM,
        realm: 'Example'
      },
      form: {
        c2: '',
        a3: '2 q'
      }
    },
    oauth: {
      signature: 'ThNYfZhYogcAU6rWgI3ZFlPEhoIXHMZcuMzl+jykJZW/ab+AxyefS03dyd64CclIZ0u8JEW64TQ5SHthoQS8aM8qir4t+t88lRF3LDkD2KtS1krgCZTUQxkDL5BO5pxsqAQ2Zfdcrzaxb6VMGD1Hf+Pno+fsHQo/UUKjq4V3RMo=',
      params: {
        realm: 'Example',
        oauth_consumer_key: '9djdj82h48djs9d2',
        oauth_nonce: '7d8f3e4a',
        oauth_signature_method: 'RSA-SHA1',
        oauth_timestamp: '137131201',
        oauth_token: 'kkk9d7dh3k39sjv7',
        oauth_version: '1.0'
      }
    }
  },
  plaintext: {
    request: {
      method: 'POST',
      url: 'https://dummy.com',
      oauth: {
        consumer_secret: 'consumer_secret',
        token_secret: 'token_secret',
        signature_method: 'PLAINTEXT'
      }
    },
    oauth: {
      signature: 'consumer_secret&token_secret',
    }
  }
}

var client = (args) => compose(

  Request.defaults(args),

  (() =>
    args.url ? Request.url(args.url) : ({options}) => ({options})
  )(),
  (() =>
    args.qs ? Request.qs(args.qs) : ({options}) => ({options})
  )(),

  (() =>
    args.form ? Request.form(args.form) :
    args.json ? Request.json(args.json) :
    args.body ? Request.body(args.body) :
    ({options}) => ({options})
  )(),

  (() =>
    args.oauth ? mw(args.oauth) : ({options}) => ({options})
  )(),

)()

var parse = {
  header: (payload) =>
    payload.replace('OAuth', '').trim().split(',')
      .map((kvp) => kvp.split('='))
      .reduce((all, [key, value]) => (
        all[key] = decodeURIComponent(value.replace(/"/g, '')),
        all
      ), {})
  ,
  query: (payload) =>
    qs.parse(payload.split('?')[1])
  ,
  body: (payload) =>
    qs.parse(payload)
}


describe('sign', () => {

  it('reqsign', async () => {
    t.equal(
      oauth.hmacsign(
        sign.reqsign.request.method,
        sign.reqsign.request.url,
        sign.reqsign.oauth.params,
        sign.reqsign.oauth.consumer_secret
      ),
      sign.reqsign.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.reqsign.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.reqsign.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.reqsign.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('reqsignRSA', async () => {
    t.equal(
      oauth.rsasign(
        sign.reqsignRSA.request.method,
        sign.reqsignRSA.request.url,
        sign.reqsignRSA.oauth.params,
        rsaPrivatePEM
      ),
      sign.reqsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.reqsignRSA.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.reqsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.reqsignRSA.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('accsign', async () => {
    t.equal(
      oauth.hmacsign(
        sign.accsign.request.method,
        sign.accsign.request.url,
        sign.accsign.oauth.params,
        sign.accsign.oauth.consumer_secret,
        sign.accsign.oauth.token_secret
      ),
      sign.accsign.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.accsign.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.accsign.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.accsign.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('accsignRSA', async () => {
    t.equal(
      oauth.rsasign(
        sign.accsignRSA.request.method,
        sign.accsignRSA.request.url,
        sign.accsignRSA.oauth.params,
        rsaPrivatePEM
      ),
      sign.accsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.accsignRSA.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.accsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.accsignRSA.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('upsign', async () => {
    t.equal(
      oauth.hmacsign(
        sign.upsign.request.method,
        sign.upsign.request.url,
        Object.assign({}, sign.upsign.oauth.params, sign.upsign.request.form),
        sign.upsign.oauth.consumer_secret,
        sign.upsign.oauth.token_secret
      ),
      sign.upsign.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.upsign.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.upsign.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.upsign.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('upsignRSA', async () => {
    t.equal(
      oauth.rsasign(
        sign.upsignRSA.request.method,
        sign.upsignRSA.request.url,
        Object.assign({}, sign.upsignRSA.oauth.params, sign.upsignRSA.request.form),
        rsaPrivatePEM
      ),
      sign.upsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    var {options} = await client(sign.upsignRSA.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.upsignRSA.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.upsignRSA.oauth.params,
      'all other oauth parameters should be correct'
    )
  })


  it('rfc5849', async () => {
    var {options} = await client(sign.rfc5849.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.rfc5849.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.rfc5849.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('rfc5849RSA', async () => {
    var {options} = await client(sign.rfc5849RSA.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.rfc5849RSA.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.rfc5849RSA.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('plaintext', async () => {
    var {options} = await client(sign.plaintext.request)
    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_signature,
      sign.plaintext.oauth.signature,
      'oauth_signature should be correct'
    )

    t.ok(
      /^\d+$/.test(payload.oauth_timestamp),
      ''
    )
    t.ok(
      /^[0-9a-f]+$/.test(payload.oauth_nonce),
      ''
    )
    t.equal(
      payload.oauth_version,
      '1.0'
    )
    t.equal(
      payload.oauth_signature_method,
      'PLAINTEXT'
    )
  })


  it('invalid transport_method', async () => {
    try {
      await client({
        oauth: {
          transport_method: 'headerquery'
        }
      })
    }
    catch (err) {
      t.equal(
        err.message,
        'oauth: transport_method invalid',
        'should throw'
      )
    }
  })

  it('invalid method while using transport_method `body`', async () => {
    try {
      await client({
        url: 'http://example.com/',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        oauth: {
          transport_method: 'body'
        }
      })
    }
    catch (err) {
      t.equal(
        err.message,
        'oauth: transport_method: body requires POST and ' +
          'content-type: application/x-www-form-urlencoded',
        'should throw'
      )
    }
  })

  it('invalid content-type while using transport_method `body`', async () => {
    try {
      await client({
        method: 'POST',
        url: 'http://example.com/',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
        oauth: {
          transport_method: 'body'
        }
      })
    }
    catch (err) {
      t.equal(
        err.message,
        'oauth: transport_method: body requires POST and ' +
          'content-type: application/x-www-form-urlencoded',
        'should throw'
      )
    }
  })

  it('query transport_method', async () => {

    sign.accsign.request.oauth =
      Object.assign({}, sign.accsign.request.oauth, {transport_method: 'query'})

    var {options} = await client(sign.accsign.request)

    t.equal(
      options.headers.Authorization,
      undefined,
      'authorization header should not be set'
    )

    t.ok(
      /^\/oauth\/access_token\?.+/.test(options.path),
      'path should contain path + query'
    )

    var payload = parse.query(options.path)

    t.equal(
      payload.oauth_signature,
      sign.accsign.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.accsign.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('query transport_method + form option + url params', async () => {

    sign.rfc5849.request.oauth =
      Object.assign({}, sign.rfc5849.request.oauth, {transport_method: 'query'})

    var {options} = await client(sign.rfc5849.request)

    t.equal(
      options.headers.Authorization,
      undefined,
      'authorization header should not be set'
    )

    t.ok(
      /^\/request\?.+/.test(options.path),
      'path should contain path + query'
    )

    var payload = parse.query(options.path)

    t.equal(
      payload.oauth_signature,
      sign.rfc5849.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      Object.assign({},
        {
          b5: '=%3D',
          a3: 'a',
          'c@': '',
          a2: 'r b'
        },
        sign.rfc5849.oauth.params
      ),
      'all other oauth parameters should be correct'
    )
  })

  it('query transport_method + qs option + url params', async () => {

    var opts = Object.assign({}, sign.rfc5849.request)
    opts.url = 'http://example.com/request?a2=r%20b'
    opts.oauth.transport_method = 'query'
    opts.qs = {
      b5: '=%3D',
      a3: ['a', '2 q'],
      'c@': '',
      c2: ''
    }
    delete opts.form

    var {options} = await client(opts)

    t.equal(
      options.headers.Authorization,
      undefined,
      'authorization header should not be set'
    )

    t.ok(
      /^\/request\?.+/.test(options.path),
      'path should contain path + query'
    )

    var payload = parse.query(options.path)

    t.equal(
      payload.oauth_signature,
      sign.rfc5849.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      Object.assign({},
        {
          a2: 'r b',
          b5: '=%3D',
          a3: [ 'a', '2 q' ],
          'c@': '',
          c2: '',
        },
        sign.rfc5849.oauth.params
      ),
      'all other oauth parameters should be correct'
    )
  })

  it('body transport_method', async () => {

    var opts = sign.accsign.request.oauth = Object.assign({}, sign.accsign.request)
    opts.oauth.transport_method = 'body'
    opts.form = {}

    var {options, body} = await client(opts)

    t.equal(
      options.headers.Authorization,
      undefined,
      'authorization header should not be set'
    )

    t.ok(
      /^\/oauth\/access_token$/.test(options.path),
      'path should not contain querystring'
    )

    var payload = parse.body(body)

    t.equal(
      payload.oauth_signature,
      sign.accsign.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      sign.accsign.oauth.params,
      'all other oauth parameters should be correct'
    )
  })

  it('body transport_method + form option + url params', async () => {

    sign.rfc5849.request.oauth =
      Object.assign({}, sign.rfc5849.request.oauth, {transport_method: 'body'})

    var {options, body} = await client(sign.rfc5849.request)

    t.equal(
      options.headers.Authorization,
      undefined,
      'authorization header should not be set'
    )

    t.ok(
      /^\/request\?.+$/.test(options.path),
      'path should contain path + querystring'
    )

    var payload = parse.body(body)

    t.equal(
      payload.oauth_signature,
      sign.rfc5849.oauth.signature,
      'oauth_signature should be correct'
    )

    delete payload.oauth_signature
    t.deepEqual(
      payload,
      Object.assign({},
        {
          c2: '',
          a3: '2 q'
        },
        sign.rfc5849.oauth.params
      ),
      'all other oauth parameters should be correct'
    )
  })


  it('body_hash manually set', async () => {
    var {options} = await client({
      method: 'POST',
      url: 'http://example.com',
      oauth: {
        consumer_secret: 'consumer_secret',
        body_hash: 'ManuallySetHash'
      },
      json: {foo: 'bar'}
    })

    var payload = parse.header(options.headers.Authorization)
    t.equal(
      payload.oauth_body_hash,
      'ManuallySetHash',
      'oauth body hash should be set'
    )
  })

  it('body_hash automatically built for string', async () => {
    var {options} = await client({
      method: 'PUT',
      url: 'http://www.example.com/resource',
      oauth: {
        body_hash: true
      },
      body: 'Hello World!'
    })

    var payload = parse.header(options.headers.Authorization)

    t.equal(
      payload.oauth_body_hash,
      'Lve95gjOVATpfV8EL5X4nxwjKHE=',
      'https://tools.ietf.org/id/draft-eaton-oauth-bodyhash-00.html#anchor15'
    )
  })

  it('body_hash automatically built for JSON', async () => {
    var {options} = await client({
      method: 'POST',
      url: 'http://example.com',
      oauth: {
        consumer_secret: 'consumer_secret',
        body_hash: true
      },
      json: {foo: 'bar'}
    })

    var payload = parse.header(options.headers.Authorization)
    t.equal(
      payload.oauth_body_hash,
      'pedE0BZFQNM7HX6mFsKPL6l+dUo=',
      'oauth body hash should be generated'
    )
  })

  it('body_hash PLAINTEXT signature_method', async () => {
    try {
      await client({
        method: 'POST',
        url: 'http://example.com',
        oauth: {
          consumer_secret: 'consumer_secret',
          body_hash: true,
          signature_method: 'PLAINTEXT'
        },
        json: {foo: 'bar'}
      })
    }
    catch (err) {
      t.equal(
        err.message,
        'oauth: PLAINTEXT signature_method not supported with body_hash signing',
        'should throw'
      )
    }
  })

})
