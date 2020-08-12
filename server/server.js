require('dotenv').config()
// Import express framework
const express = require('express')

// Import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

// Import routes
const homeRouter = require('./routes/home-route')
const exchangesRouter = require('./routes/exchanges-route')
const cryptocurrenciesRouter = require('./routes/cryptocurrencies-route')
const basePairsRouter = require('./routes/base-pairs-route')

// Setup default port
const PORT = process.env.SERVER_PORT || 8000
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

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
  })
}

// Implement route for '/api' endpoint
app.use('/api', homeRouter)
// Implement route for '/exchanges' endpoint
app.use('/exchanges', exchangesRouter)
// Implement route for '/cryptocurrencies' endpoint
app.use('/cryptocurrencies', cryptocurrenciesRouter)
// Implement route for '/base-pairs' endpoint
app.use('/base-pairs', basePairsRouter)
// Default route for inexistent endpoint
app.use((req, res, next) => {
    res.status(404).send('Ah ah ah! You didn\'t say the magic word!')
    // .render('404_error_template', {title: "Sorry, page not found"});
});
// Implement route for errors
app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!')
})

// Start express app
app.listen(PORT, () => console.log(`Server is running on: ${PORT}`))