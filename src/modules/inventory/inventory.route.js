const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
 addProductToInventoryController
} = require('./inventory.controller')
const {
 addProductToInventorySchema
} = require('./inventory.schema')

const router = Router()

router.post(
    '/add-new',
    validateRequest(addProductToInventorySchema, "params"),
    authorize(),
    addProductToInventoryController
)


module.exports = router