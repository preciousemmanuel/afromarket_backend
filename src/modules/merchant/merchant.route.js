const {Router} = require('express')
const { authMerchLogin } = require('../../common/middlewares/authorizeLogin')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
registerMerchantController,
loginMerchantController
} = require('./merchant.controller')
const {
 registerMerchantSchema,
 loginMerchantSchema
} = require('./merchant.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerMerchantSchema, "body"),
    registerMerchantController
)
router.post(
    '/login',
    validateRequest(loginMerchantSchema, "body"),
    authMerchLogin,
    loginMerchantController
)


module.exports = router