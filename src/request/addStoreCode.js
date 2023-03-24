module.exports = function addStoreCodeRequestInterceptor (config) {
  if (!config.storeCode) {
    return config
  }

  config.baseURL = this.getStoreBaseUrl(config.storeCode)

  return config
}
