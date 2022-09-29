const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.uploadProductSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity_available: Joi.number().integer().optional(),
    CategoryId: Joi.string().required(),
    price: Joi.number().integer().required(),
})

exports.singleProductSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.uploadProductImageSchema = Joi.object().keys({
    id: Joi.string().required(),
})