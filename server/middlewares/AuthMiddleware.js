require('dotenv').config()
const jwt = require('jsonwebtoken')


exports.AuthMidllewares = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(400).json({ message: 'You are not authorized!' })
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded._id
    next()
}