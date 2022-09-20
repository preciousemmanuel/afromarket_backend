const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.uploadProductSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity_available: Joi.number().integer().optional(),
    category: Joi.string().required(),
    price: Joi.number().integer().required(),
})

exports.removeProductSchema = Joi.object().keys({
    id: Joi.string().required(),
})