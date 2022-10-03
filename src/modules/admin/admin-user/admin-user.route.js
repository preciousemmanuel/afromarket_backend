const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin} = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
registerAdminController,
loginAdminController,
forgotPasswordController,
resetPasswordController
} = require('./admin-user.controller')
const {
 registerAdminSchema,
 loginAdminSchema,
 forgotPasswordSchema,
 resetPasswordSchema
} = require('./admin-user.schema')

const router = Router()

router.post(
    '/create',
    validateRequest(registerAdminSchema, "body"),
    // authorizeSuperAdmin,
    registerAdminController
)
router.post(
    '/login',
    validateRequest(loginAdminSchema, "body"),
    authAdminLogin,
    loginAdminController
)

router.post(
    '/pass/forgot',
    validateRequest(forgotPasswordSchema, "body"),
    forgotPasswordController
)

router.post(
    '/pass/reset',
    validateRequest(resetPasswordSchema, "body"),
    resetPasswordController

)

module.exports = router