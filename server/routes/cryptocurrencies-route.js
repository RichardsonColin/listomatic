// Import express
const express = require('express')
// Import users controller
const cryptocurrenciesController = require('./../controllers/cryptocurrencies-controller.js')
// Create express router
const router = express.Router()
// Create routes between cryptocurrenciesController and endpoints
router.get('/', cryptocurrenciesController.cryptocurrenciesGetAll)
router.get('/:id', cryptocurrenciesController.cryptocurrenciesGetOne)
// Export router
module.exports = router
