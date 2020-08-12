const express = require('express')
const router = express.Router()

// Import home controller
const homeController = require('../controllers/home-controller')

// Create rout between homeControllers and '/' endpoint
router.get('/', homeController.homeGet)

// Export router
module.exports = router