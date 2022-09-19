const {Router} = require('express')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 registerUserController
} = require('./user.controller')
const {
 registerUserSchema
} = require('./user.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerUserSchema),
    registerUserController
)

module.exports = router