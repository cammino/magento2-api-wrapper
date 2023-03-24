const assert = require('assert')
const extractData = require('../../src/response/extractData')

describe('Extract Data Response Interceptor', function () {
  it("extracts data property from object", function() {
    var responseBody = {}

    var response = {
      data: responseBody
    }

    var extracted = extractData(response)

    assert.strictEqual(extracted, responseBody, "extracted data is not same as passed object")
  })
})
