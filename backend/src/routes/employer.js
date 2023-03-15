const { Router } = require('express')
const { authenticateAdmin } = require('../middleware/authAdmin')
const { authenticateEmployer } = require('../middleware/authEmployer')
const authToken = require('../middleware/authToken')
const router = Router()

const employerController = require('../controllers/employerController')

router.get('/', authenticateAdmin, employerController.getEmployer)
router.get('/names', authenticateAdmin, employerController.getEmployerNames)
router.get('/id/:id', authenticateAdmin, employerController.getEmployerById)
router.get('/find', authToken, employerController.getEmployerByName)
router.get('/:username', authToken, employerController.getEmployerByUsername)

router.delete('/:username', authenticateEmployer, employerController.deleteEmployerByUsername)

router.post('/sign-up', employerController.signUpEmployer)

router.patch('/updatePwd', authenticateEmployer, employerController.updateEmployerPwd)
router.patch('/:username', authenticateEmployer, employerController.updateEmployer)

router.patch('/:username/uploadImage', authenticateEmployer, employerController.uploadImage)
router.get('/:username/getImage', authenticateEmployer, employerController.getImage)

module.exports = router