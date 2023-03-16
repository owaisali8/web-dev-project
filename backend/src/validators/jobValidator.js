const Joi = require('joi')

const jobSchema = Joi.object({
    username: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    job_type: Joi.string().min(3).required(),
    salary: Joi.number().min(2).required()
});


const jobUpdateSchema = Joi.object({
    job_id: Joi.number().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    job_type: Joi.string().min(3).required(),
    salary: Joi.number().min(2).required(),
    completed: Joi.bool().required()
});

module.exports = {
    jobSchema,
    jobUpdateSchema
}

