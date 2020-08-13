// Import express
const express = require('express')
// Import users controller
const exchangesController = require('./../controllers/exchanges-controller.js')
// Create express router
const router = express.Router()
// Create routes between exchangesController and endpoints
router.get('/', exchangesController.exchangesGetAll)
router.get('/:id', exchangesController.exchangesGetOne)
router.get('/:id/base-pairs', exchangesController.exchangesGetBasePairs)
router.get('/:exchange_id/base-pairs/:base_pair_id/cryptocurrencies', exchangesController.exchangesGetTradingPairs)
// Export router
module.exports = router
