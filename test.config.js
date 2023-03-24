try {
  module.exports = require('./test.config.local.js')
} catch (e) {
  module.exports = {
    api: {
      url: process.env.MAGENTO2API_URL,
      consumerKey: process.env.MAGENTO2API_CONSUMER_KEY,
      consumerSecret: process.env.MAGENTO2API_CONSUMER_SECRET,
      accessToken: process.env.MAGENTO2API_ACCESS_TOKEN,
      tokenSecret: process.env.MAGENTO2API_TOKEN_SECRET,
    }
  }
}
