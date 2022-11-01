const {Router} = require('express')
const { authorize, authorizeUser } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
createReviewController,
productReviewsController,
deleteReviewsController
} = require('./review.controller')
const {
    singleItemSchema,
    createReviewSchema,
    getProductReviewSchema
} = require('./review.schema')

const router = Router()

router.post(
    '/create/:id',
    validateRequest(createReviewSchema, "body"),
    validateRequest(singleItemSchema, "params"),
    authorizeUser(),
    createReviewController
)

router.get(
    '/product/:id',
    validateRequest(getProductReviewSchema, "query"),
    validateRequest(singleItemSchema, "params"),
    // authorizeUser(),
    productReviewsController
)

router.patch(
    '/delete/:id',
    validateRequest(singleItemSchema, "params"),
    authorizeUser(),
    deleteReviewsController
)


module.exports = router