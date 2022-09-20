const Joi = require('joi').extend(require('@joi/date'))

exports.registerUserSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})