const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')

const { initializePassport } = require('./Middleware/Auth')

const app = express()

app.use(bodyParser.json())

app.use(initializePassport)

mongoose.connect('mongodb://localhost/express-mongo-passport', (err) => {
    if (err) {
        console.log('An error occurred: ' + err)
    } else {
        console.log('Connected to Database')
    }
})

app.use('/', routes)

app.listen(3000, () => console.log('Listening on port 3000'))