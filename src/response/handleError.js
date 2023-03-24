module.exports = function handleError (e) {
  e.magento = this

  throw e
}
