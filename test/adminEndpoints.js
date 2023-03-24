const testConfig = require('../test.config.js')
const Magento2Api = require('../src/index')
const assert = require('assert')

describe("Real database - Admin Endpoints", function () {
  var api = new Magento2Api(testConfig)

  it('works with admin endpoints', async function () {
    var response = await api.axios.get('store/storeConfigs')
    assert.ok(response)
  })

  it('correctly signs GET requests with parameters', async function () {
    var response = await api.get('products', {
      params: {
        searchCriteria: {
          currentPage: 1,
          pageSize: 1,
        }
      }
    })

    assert.ok(response)
  })
})
