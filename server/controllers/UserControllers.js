const { validationResult } = require('express-validator')
const User = require('../Models/UserModel.js')
const bcrypt = require('bcryptjs')
const { hash } = require('bcryptjs')
const jwt = require('jsonwebtoken')

// create  an account


const Register = async (req, res) => {
    try {
        // extract the validation  errors  from the req 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({ errors: errors.mapped() })
        }

        //verify that the user has no existing account
        const { name, age, email, password } = req.body;
        const found = await User.findOne({ email });
        if (found) {
            return res.status(401).json({ message: 'You have already registered!' })
        }

        //Creation of user + save in the DB
        // 1  cryptage  du password ==> security ==> hashing

        const salt = bcrypt.genSaltSync(10); // synchrone //already unbreaquable

        const hashedPassword = await bcrypt.hashSync(password, salt);
        //2 save the user in the DB
        const newUser = await User.create({ name, age, email, password: hashedPassword })
        res.status(200).json(newUser)


    } catch (error) {
        res.status(500).json({ message: error })
    }
}

//login

const login = async (req, res) => {
    try {
        //extract the validation errors from the req
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(402).json({ errors: errors.mapped() })

        }
        // verify if the user exists or no 
        const { email, password } = req.body
        const isfound = await User.findOne({ email })
        if (!isfound) {
            return res.status(402).json({ message: 'You have to register before' })
        }
        //compare the password (in the DB) with password (tapped by the user:req.body )
        const isMatch = await bcrypt.compare(password, isfound.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'Wrong password ' })
        }
        //generate a key :token 
        const token = jwt.sign({
            id: isfound_id
        }, process.env.SECRET, { expiresIn: '30d' })
        res.status(200).json({ isfound, token })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}
const getAllDataUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = { Register, login, getAllDataUsers }