const crypto = require('crypto')
const axios = require('axios')
const Qs = require('qs')
const buildFullPath = require('axios/lib/core/buildFullPath')
const buildURL = require('axios/lib/helpers/buildURL')
const OAuth = require('oauth-1.0a')
const addStoreCodeRequestInterceptor = require('./request/addStoreCode')
const handleResponseError = require('./response/handleError')
const extractData = require('./response/extractData')

var axiosInstances = new WeakMap()
var oauthInstances = new WeakMap()

function hashFunctionSha256 (baseString, key) {
  return crypto
    .createHmac('sha256', key)
    .update(baseString)
    .digest('base64')
}

function addOAuthHeaderInterceptor (config) {
  if (!this.apiParams.consumerKey) {
    return config
  }

  if (!oauthInstances.has(this)) {
    oauthInstances.set(this, new OAuth({
      consumer: {
        key: this.apiParams.consumerKey,
        secret: this.apiParams.consumerSecret
      },
      signature_method: 'HMAC-SHA256',
      hash_function: hashFunctionSha256
    }))
  }

  const oauth = oauthInstances.get(this)
  const token = {
    key: this.apiParams.accessToken,
    secret: this.apiParams.tokenSecret
  }

  var fullPath = buildFullPath(config.baseURL, config.url);
  fullPath = buildURL(fullPath, config.params, config.paramsSerializer);

  const authorization = oauth.authorize({
    method: config.method.toUpperCase(),
    url: fullPath
  }, token)

  const header = oauth.toHeader(authorization);
  //const header = { Authorization: 'Bearer ' + token.key };
  
  Object.assign(config.headers.common, header)

  return config
}

class Magento2Api {
  constructor ({ api, axios } = {}) {
    if (!api) {
      throw new TypeError("Expected object as a parameter")
    }
    api.apiVersion = api.apiVersion || '1'
    api.url = api.url.trim('/')

    this.apiParams = api
    this.axiosOptions = axios
  }

  get baseUrl () {
    return this.apiParams.url + 'rest/V' + this.apiParams.apiVersion + '/'
  }

  get axios () {
    if (!axiosInstances.has(this)) {
      const instance = axios.create({
        ...this.axiosOptions,
        baseURL: this.baseUrl,
        paramsSerializer: function (params) {
          return Qs.stringify(params, { encodeValuesOnly: true })
        },
      })
      instance.interceptors.request.use(addOAuthHeaderInterceptor.bind(this))
      instance.interceptors.request.use(addStoreCodeRequestInterceptor.bind(this))
      instance.interceptors.response.use(extractData, handleResponseError.bind(this))

      axiosInstances.set(this, instance)
    }

    return axiosInstances.get(this)
  }

  getStoreBaseUrl (storeCode) {
    return this.apiParams.url + 'rest/' + storeCode + '/V' + this.apiParams.apiVersion + '/'
  }

  request () {
    return this.axios.request.apply(null, arguments)
  }

  get () {
    return this.axios.get.apply(null, arguments)
  }

  delete () {
    return this.axios.delete.apply(null, arguments)
  }

  head () {
    return this.axios.head.apply(null, arguments)
  }

  options () {
    return this.axios.options.apply(null, arguments)
  }

  post () {
    return this.axios.post.apply(null, arguments)
  }

  put () {
    return this.axios.put.apply(null, arguments)
  }

  patch () {
    return this.axios.patch.apply(null, arguments)
  }
}

module.exports = Magento2Api
