// dependencies
const express = require('express')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// import custom middleware
const { initializePassport } = require('./middleware/auth')

// new express server + plug in middleware
const app = express()
app.use(morgan('dev')) // logging
app.use(bodyParser.json()) // parse json
app.use(initializePassport) // connect Passport to Express

// connect to MongoDB
mongoose.connect('mongodb://localhost/express-mongo-passport', (err) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Connected to database!')
  }
});

// routes
app.use('/', routes)

// start the server!
app.listen(3000, () => console.log('Listening on http://localhost:3000'))

module.exports = app
