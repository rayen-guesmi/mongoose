const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, err => err ? console.log(err) : console.log(`DB is connected...`))
} 