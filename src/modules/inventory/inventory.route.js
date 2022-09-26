const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 addProductToInventoryController,
 removeProductFromInventoryController,
 getSingleProductFromInventoryController
} = require('./inventory.controller')
const {
singleInventoryItemSchema
} = require('./inventory.schema')

const router = Router()

router.post(
    '/add-new/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorize(),
    addProductToInventoryController
)

router.get(
    '/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorize(),
   getSingleProductFromInventoryController
)


router.delete(
    '/remove/:id',
    validateRequest(singleInventoryItemSchema, "params"),
    authorize(),
    removeProductFromInventoryController
)


module.exports = router