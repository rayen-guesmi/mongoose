const { body } = require('express-validator')




exports.DataValidation = [
    body('email', 'please put a valid Email').isEmail(),
    body('password', 'Password should be at least 6').isLength({ min: 6 })
]