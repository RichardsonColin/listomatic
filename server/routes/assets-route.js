// Import express
const express = require('express')
// Import users controller
const assetsController = require('../controllers/assets-controller.js')
// Create express router
const router = express.Router()
// Create routes between assets-controller and endpoints
router.get('/', assetsController.assetsGetAll)
router.get('/:id', assetsController.assetsGetOne)
// Export router
module.exports = router
