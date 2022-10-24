const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
makeInboundPaymentController,
confirmInboundPaymentController,
makeMerchantWithdrawalController,
fetchtWithdrawalController,
retryMerchantWithdrawalController,
retryFetchtWithdrawalController
} = require('./flw.controller')
const {
    createPayMentSchema,
    confirmPayMentSchema,
    singleModelSchema,
} = require('./flw.schema')

const router = Router()

router.post(
    '/initiate',
    validateRequest(createPayMentSchema, "body"),
    authorize(),
    makeInboundPaymentController
)

router.get(
    '/confirm',
    validateRequest(confirmPayMentSchema, "query"),
    authorize(),
    confirmInboundPaymentController
)

router.post(
    '/withdraw',
    authorize(),
    makeMerchantWithdrawalController
)

router.get(
    '/transfer/:id',
    validateRequest(singleModelSchema, "params"),
    authorize(),
    fetchtWithdrawalController
)

router.post(
    '/retry-withdraw/:id',
    validateRequest(singleModelSchema, "params"),
    authorize(),
    retryMerchantWithdrawalController
)

router.get(
    '/fetch-retry/:id',
    validateRequest(singleModelSchema, "params"),
    authorize(),
   retryFetchtWithdrawalController
)


module.exports = router