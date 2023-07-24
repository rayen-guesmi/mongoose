const { error } = require('console');
const express = require('express');
const { connectDB } = require('./config/connectDB');
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const UserRouter = require('./Routes/UserRouter.js')

app.use(express.json())
app.use('/api/users', UserRouter)

mongoose.set('strictQuery', true)
connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => err ? console.log(error) : console.log(`Server is running on port ${PORT}...`))