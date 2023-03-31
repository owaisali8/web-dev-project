const { pool } = require('../config/db')

const jobQueries = require('../data/jobQueries')

const jobValidator = require('../validators/jobValidator')
const employerQueries = require('../data/employerQueries')
const employeeQueries = require('../data/employeeQueries')


const getAllJobs = async (req, res) => {
    try {
        const result = await pool.query(jobQueries.getAllJobs)
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getJobById = async (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(jobQueries.getJobByID, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }

        const data = result.rows[0]
        if (!data) res.status(404).json(null)

        res.status(200).json(data)
    })
}


const getJobByTitle = (req, res) => {
    const title = req.query.title;
    if (!title) {
        res.status(400).json(null)
        return
    }
    pool.query(jobQueries.getJobByTitle, ['%' + title + '%'], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows
        if (!result.rowCount) {
            res.status(404).json(null)
            return
        }

        res.status(200).json(data)
    })
}

const getUncompletedJobs = async (req, res) => {
    try {
        const result = await pool.query(jobQueries.getUncompletedJobs);
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployerJobs = async (req, res) => {
    const username = req.params.username
    const userId = req.user.userId;
    if (!username || !userId) return res.sendStatus(400)
    try {
        const result = await pool.query(jobQueries.getEmployerJobs, [userId]);
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployeeAppliedJobs = async (req, res) => {
    const username = req.params.username
    const userId = req.user.userId;
    if (!username) return res.sendStatus(400)
    try {
        const result = await pool.query(jobQueries.getEmployeeAppliedJobs, [userId]);
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const deleteJobByID = async (req, res) => {
    const username = req.params.username
    const id = parseInt(req.params.job_id)
    if (!username || !id) return res.sendStatus(404)
    if (username != req.user.username) return res.sendStatus(403)
    try {
        await pool.query(jobQueries.deleteJobByID, [id])
        res.sendStatus(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

const createJob = async (req, res) => {
    const { error } = jobValidator.jobSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const { username, title, description, job_type, salary } = req.body

    if (username != req.user.username) return res.sendStatus(403)

    try {
        const result = await pool.query(employerQueries.getIdFromUsername, [username]);
        if (!result.rowCount) return res.sendStatus(404);
        const id = result.rows[0].employer_id
        await pool.query(jobQueries.createJob, [title, description, job_type, salary, id])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const applyForJob = async (req, res) => {
    const { username, job_id } = req.body
    if (!username || !job_id) return res.sendStatus(400)
    try {
        const result = await pool.query(employeeQueries.getEmployeeByUsername, [username]);
        if (!result.rowCount) return res.sendStatus(404);
        const employee_id = parseInt(result.rows[0].employee_id)
        const id = parseInt(job_id)
        await pool.query(jobQueries.applyJob, [id, employee_id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

const updateJob = async (req, res) => {
    const { err } = jobValidator.jobUpdateSchema.validate(req.body)

    if (err) {
        return res.status(400).send(err.details[0].message)
    }

    const { job_id, title, description, job_type, salary, completed } = req.body

    try {
        const result = await pool.query(jobQueries.getJobByID, [parseInt(job_id)])
        if (!result.rowCount) return res.sendStatus(404)
        await pool.query(jobQueries.updateJob, [parseInt(job_id), title, description, job_type, parseInt(salary), completed])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    getJobByTitle,
    getUncompletedJobs,
    getEmployerJobs,
    getEmployeeAppliedJobs,

    deleteJobByID,

    createJob,
    applyForJob,
    updateJob

}
