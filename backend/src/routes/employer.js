const { Router } = require('express')
const { authenticateAdmin } = require('../middleware/authAdmin')
const { authenticateEmployer } = require('../middleware/authEmployer')
const router = Router()

const employerController = require('../controllers/employerController')

router.get('/', authenticateAdmin, employerController.getEmployer)
router.get('/names', authenticateAdmin, employerController.getEmployerNames)
router.get('/id/:id', authenticateAdmin, employerController.getEmployerById)
router.get('/find', authenticateEmployer, employerController.getEmployerByName)
router.get('/:username', authenticateEmployer, employerController.getEmployerByUsername)

router.delete('/:username', authenticateEmployer, employerController.deleteEmployerByUsername)

router.post('/sign-up', employerController.signUpEmployer)

router.patch('/updatePwd', authenticateEmployer, employerController.updateEmployerPwd)
router.patch('/:username', authenticateEmployer, employerController.updateEmployer)

router.patch('/:username/uploadImage', authenticateEmployer, employerController.uploadImage)
router.get('/:username/getImage', authenticateEmployer, employerController.getImage)

module.exports = router