const User = require("../models/userSchema")
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)
        // send response
        res.status(200).json({email, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

// Signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    
    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)
        // send response
        res.status(200).json({email, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }

}

module.exports = { signupUser, loginUser}