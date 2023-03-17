const Joi = require('joi')

const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"

const employeeSchema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(8)
        .pattern(new RegExp(passwordPattern))
        .message("Invalid Password").required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required(),
    cnic_no: Joi.string().length(13).pattern(/^[0-9]+$/).message("13 Digits Only").required(),
    job_type: Joi.string().min(2).required()
});

const employeeUpdateSchema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().min(11).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).required(),
    dob: Joi.date().required(),
    gender: Joi.string().length(1).required(),
    cnic_no: Joi.string().length(13).pattern(/^[0-9]+$/).message("13 Digits Only").required(),
    job_type: Joi.string().min(2).required()
});


const employeeUpdatePwdSchema = Joi.object({
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
    employeeSchema,
    employeeUpdatePwdSchema,
    employeeUpdateSchema
}