const assert = require('assert')
const addStoreCode = require('../../src/request/addStoreCode')
const Magento2Api = require('../../src/index')

describe('Add Store Code Request Interceptor', function () {
  var api = new Magento2Api({ api: { url: 'https://localhost' }})

  it("doesn't change config if no store code passed", function () {
    var config = addStoreCode.call(api, {})

    assert.strictEqual(config.baseURL, undefined)
  })

  it("sets baseURL to store scoped", function() {
    var config = addStoreCode.call(api, {
      storeCode: 'test'
    })

    assert.strictEqual(config.baseURL, 'https://localhost/rest/test/V1/')
  })
})
