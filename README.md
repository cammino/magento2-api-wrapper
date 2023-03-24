

# Magento2 API Wrapper

[![License: MIT](https://img.shields.io/npm/l/magento2-api-wrapper)](LICENSE)
[![NPM](https://img.shields.io/npm/v/magento2-api-wrapper)](https://www.npmjs.com/package/magento2-api-wrapper)
[![Dependencies](https://img.shields.io/librariesio/release/npm/magento2-api-wrapper)](#)
[![Builds](https://gitlab.com/lumnn/magento2-api-wrapper/badges/master/pipeline.svg)](#)
[![Coverage](https://gitlab.com/lumnn/magento2-api-wrapper/badges/master/coverage.svg)](#)

> Small Magento 2 API client that's ready to use and extend

_Note: Currently only works in Node environment. But, it should be easy to make it
compatible in browsers. Feel free to submit a merge request or contact me._

## Install

```sh
npm install magento2-api-wrapper
```

## Usage

**As a guest**

```js
const Magento2Api = require('magento2-api-wrapper')

var consumer = new Magento2Api({ api: { url: 'https://localhost' }})

consumer.get('directory/countries')
  .then(data => console.log)

// or in async functions
var countries = await customer.get('directory/countries')
```

**As a admin/customer**

```js
// Api Keys: Magento Admin > System > Extensions > Integration
var admin = new Magento2Api({ api: {
  url: 'https://localhost',
  consumerKey: 'xxx',
  consumerSecret: 'xxx',
  accessToken: 'xxx',
  tokenSecret: 'xxx',
}})

admin.get('products', {
  params: {
    searchCriteria: {
      currentPage: 1,
      pageSize: 1,
    }
  }
})
  .then(data => console.log)
```

**Responses:** Successfull response returns plain Magento data. Not wrapped as in Axios.

### Methods / Properties

It provides all same methods as Axios: https://github.com/axios/axios#request-method-aliases

- `.axios: Axios` - get axios instance
- `.baseUrl: string` - get base url
- `.getStoreBaseUrl(storeCode: string): string` - gets store scoped base url
- `.request(config): Promise`
- `.get(url: string, config?: Object): Promise`
- `.delete(url: string, config?: Object): Promise`
- `.head(url: string, config?: Object): Promise`
- `.options(url: string, config?: Object): Promise`
- `.post(url: string, data?: Object, config?: Object): Promise`
- `.put(url: string, data?: Object, config?: Object): Promise`
- `.patch(url: string, data?: Object, config?: Object): Promise`

### Options

**Constructor Options**

- `api.url`: `string` - **required** - a baseUrl for magento instace
- `api.consumerKey`: `string` - _(optional)_ - for authentication
- `api.consumerSecret`: `string` - _(optional)_ - for authentication
- `api.accessToken`: `string` - _(optional)_ - for authentication
- `api.tokenSecret`: `string` - _(optional)_ - for authentication
- `axios`: `Object` - _(optional)_ - extra Axios configuration. May be used for example to
allow self-signed certificates

**Method options**

When executing any of the methods like `.get`, `.post` you may use theese extra
axios config options:

- `storeCode`: `string` - setting storeCode will change base url so it's like
`https://example.org/rest/{storeCode}/V1/`

### Errors

Errors are thrown in same situations as in Axios. The error has extra property:

- `magento`: `Object` - A Magento 2 Api instance

### Interceptors

Adding interceptors works exactly same as in axios. Well, you'll add them to the
axios instance directly, so the best would be to refer here to axios documentation: https://github.com/axios/axios#interceptors

```js
const Magento2Api = require('magento2-api-wrapper')

var testApi = new Magento2Api({ api: { url: 'https://localhost' }})

testApi.axios.interceptors.response.use(function (data) {
  // on successfull response
})
```

### Useful Examples

#### Allowing self-signed certificate

```js
const Magento2Api = require('magento2-api-wrapper')
const https = require('https')

var selfSignedApi = new Magento2Api({
  api: { url: 'https://localhost' },
  axios: {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
  }
})
```

## Run tests

```sh
npm run test
```
