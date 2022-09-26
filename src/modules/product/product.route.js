const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    uploadProductController,
    removeProductController,
    uploadProductImagesController,
    getSingleProductController
} = require('./product.controller')
const {
 uploadProductSchema,
 singleProductSchema,
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
    upload.single("image"),
    uploadProductImagesController
)

router.get(
    '/:id',
    validateRequest(singleProductSchema, "params"),
    getSingleProductController
) 

router.delete(
    '/:id',
    validateRequest(singleProductSchema, "params"),
    authorize(),
    removeProductController
)


module.exports = router