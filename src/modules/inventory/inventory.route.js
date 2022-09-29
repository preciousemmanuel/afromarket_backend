const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 addProductToInventoryController,
 removeProductFromInventoryController,
 getSingleProductFromInventoryController,
 getAllProductsFromMyInventoryController,
 getAllInventoryController
} = require('./inventory.controller')
const {
singleInventoryItemSchema,
getAllProductSchema,
inventoryPriceSchema
} = require('./inventory.schema')

const router = Router()

router.post(
    '/add-new/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    validateRequest(inventoryPriceSchema, "body"),
    authorize(),
    addProductToInventoryController
)

router.get(
    '/single/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorize(),
   getSingleProductFromInventoryController
)

router.get(
    '/my-all',
    validateRequest(getAllProductSchema, "query"),
    authorize(),
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
    authorize(),
    removeProductFromInventoryController
)


module.exports = router