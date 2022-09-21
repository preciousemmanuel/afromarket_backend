const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.createOrderSchema = Joi.object().keys({
    order_tray: Joi.array().items(Joi.object()).required(),
})

exports.cancelOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.singleOrderSchema = Joi.object().keys({
    id: Joi.string().required(),
})
// exports.removeProductSchema = Joi.object().keys({
//     id: Joi.string().required(),
// })