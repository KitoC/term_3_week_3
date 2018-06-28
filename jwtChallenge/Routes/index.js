const express = require('express')
const router = express.Router()

const { requireJwt, register, signJwtForUser, login } = require('../Middleware/Auth')

router.get('/', (req, res) => {
    res.send('Anyone can view this page!')
})

router.get('/protected', requireJwt, (req, res) => {
    res.send('You have a valid token!')
})

router.post('/register', register, signJwtForUser)

router.post('/login', login, signJwtForUser)


module.exports = router