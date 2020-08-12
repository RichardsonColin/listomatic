// Import express
const express = require('express')
// Import users controller
const basePairsController = require('./../controllers/base-pairs-controller.js')
// Create express router
const router = express.Router()
// Create routes between base-pairs-controller and endpoints
router.get('/', basePairsController.basePairsGetAll)
router.get('/:id', basePairsController.basePairsGetOne)
// Export router
module.exports = router
