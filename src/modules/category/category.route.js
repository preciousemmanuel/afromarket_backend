const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    getAllCategoriesController,
    getAllProductsInACategoryController
} = require('./category.controller')
const {
getAllCategoriesSchema,
singleProductSchema
} = require('./category.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(getAllCategoriesSchema, "query"),
    getAllCategoriesController

)
router.get(
    '/one/:id',
    validateRequest(singleProductSchema, "params"),
    getAllProductsInACategoryController

)
// router.patch(
//     '/:id/upload-image',
//     validateRequest(uploadProductImageSchema, "params"),
//     authorizeMerchant(),
//     upload.single("image"),
//     uploadProductImagesController
// )

// router.get(
//     '/get-one/:id',
//     validateRequest(singleProductSchema, "params"),
//     getSingleProductyByAUserController
// ) 

// router.get(
//     '/owned/:id',
//     validateRequest(singleProductSchema, "params"),
//     getSingleProductyByAMerchantController
// ) 

// router.get(
//     '/get-all',
//     validateRequest(getAllProductSchema, "query"),
//     getAllProductsController
// ) 

// router.get(
//     '/my-all',
//     authorize(),
//     validateRequest(getAllProductSchema, "query"),
//     getMyProductsByMerchantController
// ) 

// router.post(
//     '/remove/:id',
//     validateRequest(singleProductSchema, "params"),
//     authorizeMerchant(),
//     removeProductController
// )


module.exports = router