const { Router } = require('express');
const jobController = require('../controllers/jobController')
const { authenticateEmployer } = require('../middleware/authEmployer')
const { authenticateEmployee } = require('../middleware/authEmployee')
const authToken = require('../middleware/authToken')

const router = Router()

router.get('/', authToken, jobController.getAllJobs)
router.get('/id/:id', authToken, jobController.getJobById)
router.get('/find', authToken, jobController.getJobByTitle)
router.get('/uncompletedJobs', authToken, jobController.getUncompletedJobs)
router.get('/:username/myJobs', authenticateEmployer, jobController.getEmployerJobs)
router.get('/:username/myAppliedJobs', authenticateEmployee, jobController.getEmployeeAppliedJobs)

router.get('/paged', authToken, jobController.getPagedJobs)

router.delete('/:job_id', authenticateEmployer, jobController.deleteJobByID)

router.post('/applyForJob', authenticateEmployee, jobController.applyForJob)
router.post('/', authenticateEmployer, jobController.createJob)

router.patch('/:job_id', authenticateEmployer, jobController.updateJob)


module.exports = router