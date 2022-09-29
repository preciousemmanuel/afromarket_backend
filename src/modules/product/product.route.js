const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    uploadProductController,
    removeProductController,
    uploadProductImagesController
} = require('./product.controller')
const {
 uploadProductSchema,
 removeProductSchema,
 uploadProductImageSchema
} = require('./product.schema')

const router = Router()

router.post(
    '/upload',
    validateRequest(uploadProductSchema, "body"),
    authorize(),
    uploadProductController
)
router.patch(
    '/:id/upload-image',
    validateRequest(uploadProductImageSchema, "params"),
    authorize(),
    upload.single("picture"),
    uploadProductImagesController
)

router.delete(
    '/:id',
    validateRequest(removeProductSchema, "params"),
    authorize(),
    removeProductController
)


module.exports = router