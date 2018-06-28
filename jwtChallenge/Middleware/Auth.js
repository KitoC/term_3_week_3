const passport = require('passport')
const passportJwt = require('passport-jwt')
const Jwt = require('jsonwebtoken')
const User = require('../Models/User')


const jwtSecret = "Hello123"
const jwtAlgorithm = 'HS256'
const jwtExpiry = '6h'


passport.use(User.createStrategy())

passport.use(new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
}, (payload, done) => {
    User.findById(payload.sub).then((user) => {
        if(user) {
            done(null, user)
        } else {
            done(null, false)
        }
    }).catch((error) => {
        done(error, false)
    })
}))


const register = (req, res, next) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).send(err.message)
        }


        req.user = user
        next()
    })
}


const signJwtForUser = (req, res) => {

    const token = Jwt.sign(
        {
            email: req.user.email
        },
        jwtSecret,
        {
            subject: req.user._id.toString(),
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpiry
        }
    )

    res.json({token: token})
}

module.exports = {
    initializePassport: passport.initialize(),
    requireJwt: passport.authenticate('jwt', { session: false }),
    login: passport.authenticate('local', { session: false }),
    register,
    signJwtForUser
}
