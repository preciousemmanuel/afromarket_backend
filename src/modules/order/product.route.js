const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
    uploadProductController,
    removeProductController
} = require('./product.controller')
const {
 uploadProductSchema,
 removeProductSchema
} = require('./product.schema')

const router = Router()

router.post(
    '/upload',
    validateRequest(uploadProductSchema, "body"),
    authorize(),
    uploadProductController
)
router.delete(
    '/:id',
    validateRequest(removeProductSchema, "params"),
    authorize(),
    removeProductController
)


module.exports = router