const Joi = require('joi');

const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"

const adminSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(8)
        .pattern(new RegExp(passwordPattern)).required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required()
})

const adminUpdateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required()
});


const adminUpdatePwdSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8)
        .pattern(new RegExp(passwordPattern)).required(),
    retypedNewPwd: Joi.ref('newPassword')
});

module.exports = {
    adminSchema,
    adminUpdateSchema,
    adminUpdatePwdSchema
}