const Joi = require('joi')

const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"

const employerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(8)
        .pattern(new RegExp(passwordPattern))
        .message("Invalid Password").required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required()
});

const employerUpdateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required()
});


const employerUpdatePwdSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8)
        .pattern(new RegExp(passwordPattern))
        .message("Invalid Password").required(),
    retypedNewPwd: Joi.any().valid(Joi.ref('newPassword')).required().messages({
        "any.only": "Password must match"
    })
});


module.exports = {
    employerSchema,
    employerUpdatePwdSchema,
    employerUpdateSchema
}