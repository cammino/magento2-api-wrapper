const assert = require('assert')
const Magento2Api = require('../../src/index')

describe('Error Response Interceptor', function () {
  it("adds magento instnace to error", async function() {
    // some inexistent url should be here. Hope its enough for test purposes
    var api = new Magento2Api({ api: { url: 'https://localhost:15505' }})
    try {
      await api.get('/inexistent')
    } catch (e) {
      assert(e.magento === api, 'Error .magento property must be same instance as api instance')
    }
  })
})
