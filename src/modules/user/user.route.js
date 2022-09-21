const {Router} = require('express')
const { authorizeLogin } = require('../../common/middlewares/authorizeLogin')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 registerUserController,
 loginUserController
} = require('./user.controller')
const {
 registerUserSchema,
 loginUserSchema
} = require('./user.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerUserSchema, "body"),
    registerUserController
)
router.post(
    '/login',
    validateRequest(loginUserSchema, "body"),
    authorizeLogin,
    loginUserController
)


module.exports = router