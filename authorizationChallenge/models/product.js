const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Passport-Local Mongoose will add a username, hash and salt field to store the
// username, the hashed password and the salt value. Additionally Passport-Local
// Mongoose adds some methods to your Schema.


const Product = new Schema({
    title: String,
    description: String,
    price: Number,
    costPrice: Number
})

// connect passportLocalMongoose and use 'email' instead of 'username'

module.exports = mongoose.model('Product', Product)