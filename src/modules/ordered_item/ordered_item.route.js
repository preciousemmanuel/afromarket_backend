const {Router} = require('express')
const { authorize, authorizeUser } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
getSingleOrderedItemController,
getAllOrderedItemsOfAnOrderController,
} = require('./ordered_item.controller')
const {
 singleItemSchema,
 singleOrderSchema
} = require('./ordered_item.schema')

const router = Router()

router.get(
    '/get_one/:id/:item_id',
    validateRequest(singleItemSchema, "params"),
    authorizeUser(),
    getSingleOrderedItemController
)

router.get(
    '/all_items/:id',
    validateRequest(singleOrderSchema, "params"),
    authorizeUser(),
    getAllOrderedItemsOfAnOrderController
)


module.exports = router