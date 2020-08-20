require('dotenv').config()
// Import express framework
const express = require('express')

// Import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const path = require('path')
const cors = require('cors')

// Import routes
// const homeRouter = require('./routes/home-route')
const exchangesRouter = require('./routes/exchanges-route')
const assetsRouter = require('./routes/assets-route')

// Setup default port
const PORT = process.env.PORT || 8000
// Create express app
const app = express()
// Implement middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

// Implement route for '/exchanges' endpoint
app.use('/exchanges', exchangesRouter)
// Implement route for '/assets' endpoint
app.use('/assets', assetsRouter)
// Default route for inexistent endpoint

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  // Serve the static files from the React app
  app.use(express.static(path.join(__dirname, '/build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(`${__dirname}/index.html`))
  })
}
app.use((req, res, next) => {
  res.status(404).send('Ah ah ah! You didn\'t say the magic word!')
})
// Implement route for errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start express app
app.listen(PORT, () => console.log(`Server is running on: ${PORT}`))
