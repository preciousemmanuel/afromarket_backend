const {Router} = require('express')
const { authorize, authorizeUser } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
createOrderController,
getMyOrdersController,
cancelOrderController,
singleOrderController
} = require('./order.controller')
const {
 createOrderSchema,
 cancelOrderSchema,
 singleOrderSchema
} = require('./order.schema')

const router = Router()

router.post(
    '/create',
    validateRequest(createOrderSchema, "body"),
    authorizeUser(),
    createOrderController
)

router.patch(
    '/cancel/:id',
    validateRequest(cancelOrderSchema, "params"),
    authorizeUser(),
    cancelOrderController
)

router.get(
    '/my-orders',
    authorizeUser(),
    getMyOrdersController
)

router.get(
    '/single/:id',
    validateRequest(singleOrderSchema, "params"),
    authorizeUser(),
    singleOrderController
)

// router.delete(
//     '/:id',
//     validateRequest(removeProductSchema, "params"),
//     authorize(),
//     removeProductController
// )


module.exports = router