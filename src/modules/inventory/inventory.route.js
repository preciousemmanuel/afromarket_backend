const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 addProductToInventoryController,
 removeProductFromInventoryController,
 getSingleProductFromInventoryController,
 getAllProductsFromMyInventoryController,
 getAllInventoryController,
 searchInventoryController
} = require('./inventory.controller')
const {
singleInventoryItemSchema,
getAllProductSchema,
inventoryPriceSchema,
searchInventorySchema
} = require('./inventory.schema')

const router = Router()

router.post(
    '/add-new/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    validateRequest(inventoryPriceSchema, "body"),
    authorizeMerchant(),
    addProductToInventoryController
)

router.get(
    '/single/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorizeMerchant(),
   getSingleProductFromInventoryController
)

router.get(
    '/my-all',
    validateRequest(getAllProductSchema, "query"),
    authorizeMerchant(),
    getAllProductsFromMyInventoryController
)

router.get(
    '/get-all',
    validateRequest(getAllProductSchema, "query"),
    getAllInventoryController
)
router.patch(
    '/remove/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorizeMerchant(),
    removeProductFromInventoryController
)

router.post(
    '/find',
    validateRequest(searchInventorySchema, "body"),
    validateRequest(getAllProductSchema, "query"),
    searchInventoryController
)


module.exports = router