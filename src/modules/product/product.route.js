const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    uploadProductController,
    removeProductController,
    uploadProductImagesController,
    getSingleProductyByAUserController,
    getAllProductsController,
    getMyProductsByMerchantController,
    getSingleProductyByAMerchantController
} = require('./product.controller')
const {
 uploadProductSchema,
 singleProductSchema,
 uploadProductImageSchema,
 getAllProductSchema
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
    authorizeMerchant(),
    upload.single("image"),
    uploadProductImagesController
)

router.get(
    '/get-one/:id',
    validateRequest(singleProductSchema, "params"),
    getSingleProductyByAUserController
) 

router.get(
    '/owned/:id',
    validateRequest(singleProductSchema, "params"),
    getSingleProductyByAMerchantController
) 

router.get(
    '/get-all',
    validateRequest(getAllProductSchema, "query"),
    getAllProductsController
) 

router.get(
    '/my-all',
    authorize(),
    validateRequest(getAllProductSchema, "query"),
    getMyProductsByMerchantController
) 

router.post(
    '/remove/:id',
    validateRequest(singleProductSchema, "params"),
    authorizeMerchant(),
    removeProductController
)


module.exports = router