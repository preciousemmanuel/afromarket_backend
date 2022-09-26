const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.singleInventoryItemSchema = Joi.object().keys({
    id: Joi.string().required(),
})

