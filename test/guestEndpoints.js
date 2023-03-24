const Magento2Api = require('../src/index')
const assert = require('assert')

describe("Real database - Guest Endpoints", function () {
  var api = new Magento2Api({ api: { url: 'https://localhost' }})

  it('works with guest endpoints', async function () {
    var response = await api.get('directory/countries')
    assert.ok(response)
  })
})
