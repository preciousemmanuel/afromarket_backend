const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.removeProductSchema = Joi.object().keys({
    id: Joi.string().required(),
})

exports.addProductToInventorySchema = Joi.object().keys({
    id: Joi.string().required(),
})