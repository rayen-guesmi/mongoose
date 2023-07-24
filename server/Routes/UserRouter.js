const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserControllers.js')
const { body } = require('express-validator')
const { DataValidation } = require('../middlewares/DataValidation.js')
const { AuthMiddlewares } = require('../middlewares/AuthMiddleware.js')


router.post('/', DataValidation, UserController.Register)
router.post('/Login', DataValidation, UserController.Login)
router.get('/Login', AuthMiddlewares, UserController.getAllDataUsers)



module.exports = router 