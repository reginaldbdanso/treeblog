const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { Schema } = mongoose

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {

    // validate email
    if (!email || !password) {
        throw new Error('Email and password are required')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email')
    }
    const exists = await this.findOne({email})
    if (exists) {
        throw new Error('User already exists')
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough')
    }

    

    // generate salt and password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create new user
    const user = await this.create({ email, password: hash })

    return user;

}

//static login method
userSchema.statics.login = async function (email, password) {
    // validate email
    if (!email || !password) {
        throw new Error('Email and password are required')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email')
    }

    // check if user exists
    const user = await this.findOne({email})
    if (!user) {
        throw new Error('User not found')
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)