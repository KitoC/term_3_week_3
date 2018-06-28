const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const { User } = require('../models')

// JWT config
const jwtSecret = 'doggo123' // <-- I should be an env var
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '6h'

passport.use(User.createStrategy())

// Passport processes the JWT for us
passport.use(new PassportJwt.Strategy({
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm]
}, (payload, done) => {
  // Payload is the info from our token
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        done(null, user)
      } else{
        done(null, false)
      }
    })
    .catch((error) => {
      done(error, false)
    })
}))

// register middleware (create new user in our database)
const register = (req, res, next) => {
  console.log('Registering', req.body.email)
  User.register(new User({ email: req.body.email, role: 'user' }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    // Add the user info to req.user so we can access
    // it from other middleware
    req.user = user
    next()
  });
}

const isAdmin = (req, res, next) => {

  if (req.user.role && req.user.role === 'admin') {
    next()
  } else {
    res.sendStatus(403)
  }
}

// create a JWT (user just logged in or just signed up)
const signJwtForUser = (req, res) => {
  const user = req.user

  console.log('Generating JWT for', user.email)

  // create a signed token
  const token = JWT.sign(
    {
      email: user.email
    },
    jwtSecret,
    {
      subject: user._id.toString(),
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn
    }
  );

  // send it to the user
  res.send({token: token})
}

module.exports = {
  initializePassport: passport.initialize(),
  requireJwt: passport.authenticate('jwt', { session: false }),
  login: passport.authenticate('local', { session: false }),
  register,
  signJwtForUser,
  isAdmin
}
