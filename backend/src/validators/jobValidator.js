const Joi = require('joi')

const jobSchema = Joi.object({
    username: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    job_type: Joi.string().min(3).required(),
    salary: Joi.number().min(2).required()
});


const jobUpdateSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    job_type: Joi.string().min(3).required(),
    salary: Joi.number().min(2).required(),
    completed: Joi.boolean().required()
});

module.exports = {
    jobSchema,
    jobUpdateSchema
}

