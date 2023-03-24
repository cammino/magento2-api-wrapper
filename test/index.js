const assert = require('assert')
const Magento2Api = require('../src/index')
const MockAdapter = require('axios-mock-adapter')

describe('Magento2Api Instance', function () {
  it("won't instantiate work with empty api object", async function () {
    assert.throws(
      () => new Magento2Api()
    )

    assert.throws(
      () => new Magento2Api({})
    )
  })

  it("instantiate with just url", async function () {
    var api = new Magento2Api({ api: { url: 'https://localhost' }})
    assert.ok(api)
  })

  it('gets axios', function () {
    var api = new Magento2Api({ api: { url: 'https://localhost' }})
    assert.ok(api.axios)
  })

  it('instantiates with all details', function () {
    var api = new Magento2Api({ api: {
      url: 'https://localhost',
      consumerKey: 'probably',
      consumerSecret: 'this',
      accessToken: 'wont',
      tokenSecret: 'work',
    }})
    assert.ok(api)
  })

  it('correctly encodes parameter values', async function () {
    var api = new Magento2Api({ api: { url: 'https://localhost' }})

    var uri = api.axios.getUri({
      method: "GET",
      url: "non-existent-path",
      params: {
        test: '/',
        other: [ 'brackets', '[]' ],
      }
    })

    assert.strictEqual(
      uri,
      'non-existent-path?test=%2F&other[0]=brackets&other[1]=%5B%5D'
    )
  })

  it('authenticates', async function () {
    var api = new Magento2Api({ api: {
      url: 'https://localhost',
      consumerKey: 'probably',
      consumerSecret: 'this',
      accessToken: 'wont',
      tokenSecret: 'work',
    }})
    var mock = new MockAdapter(api.axios)
    mock.onAny().reply(500)

    try {
      await api.post('/test')
    } catch (e) {
      assert(e.config.headers.Authorization)
      assert.match(e.config.headers.Authorization, /^OAuth oauth_consumer_key="probably"/)
      assert.match(e.config.headers.Authorization, /oauth_signature_method="HMAC-SHA256"/)
      assert.match(e.config.headers.Authorization, /oauth_version="1\.0"/)

      return
    }

    assert.fail("The request in this test should fail")
  })

  it('adds magento api to error object', async function () {
    var api = new Magento2Api({ api: {
      url: 'https://localhost',
    }})
    var mock = new MockAdapter(api.axios)
    mock.onAny().reply(500)

    try {
      await api.get('')
    } catch (e) {
      assert.strictEqual(e.magento, api)
      return
    }

    assert.fail("The request in this test should fail")
  })
})

describe('Magento2Api instance requests', async function () {
  var api = new Magento2Api({ api: { url: 'https://localhost' }})
  var mock = new MockAdapter(api.axios)
  var data = {
    test: 1,
    two: 2
  }

  mock.onAny('https://localhost/rest/V1/test').reply(200, data)
  mock.onAny().reply(() => {
    assert.fail("Incorrect request was made")
  })

  it('offers requests', async function () {
    var response = await api.request({
      'method': 'get',
      'url': '/test'
    })

    assert.deepStrictEqual(data, response)
  })

  it('offers get request', async function () {
    await api.get('test')
  })

  it('offers delete request', async function () {
    await api.delete('test')
  })

  it('offers head request', async function () {
    await api.head('test')
  })

  it('offers options request', async function () {
    await api.options('test')
  })

  it('offers post request', async function () {
    await api.post('test')
  })

  it('offers put request', async function () {
    await api.put('test')
  })

  it('offers patch request', async function () {
    await api.patch('test')
  })
})
