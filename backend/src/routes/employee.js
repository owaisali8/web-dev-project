const { Router } = require('express')
const { authenticateAdmin } = require('../middleware/authAdmin')
const { authenticateEmployee } = require('../middleware/authEmployee')
const authToken = require('../middleware/authToken')

const router = Router()
const employeeController = require('../controllers/employeeController')
const { authenticateEmployer } = require('../middleware/authEmployer')

router.get('/', authenticateAdmin, employeeController.getEmployee)
router.get('/names', authenticateAdmin, employeeController.getEmployeeNames)
router.get('/id/:id', authenticateAdmin, employeeController.getEmployeeById)
router.get('/unverified', authenticateAdmin, employeeController.getUnverifiedEmployees)
router.get('/verified', authenticateAdmin, employeeController.getVerifiedEmployees)
router.get('/find', authToken, employeeController.getEmployeeByName)
router.get('/:username', authToken, employeeController.getEmployeeByUsername)

router.delete('/:username', authenticateEmployee, employeeController.deleteEmployeeByUsername)

router.post('/', employeeController.signUpEmployee) // Create Employer

router.patch('/updatePwd', authenticateEmployee, employeeController.updateEmployeePwd)
router.patch('/changeVerfication', authenticateAdmin, employeeController.changeVerification)
router.patch('/updateRating', authenticateEmployer, employeeController.updateRating)
router.patch('/:username', authenticateEmployee, employeeController.updateEmployee)

router.patch('/:username/uploadImage', authenticateEmployee, employeeController.uploadImage)
router.get('/:username/getImage', authenticateEmployee, employeeController.getImage)

router.patch('/:username/uploadCNIC', authenticateEmployee, employeeController.uploadCNIC)
router.get('/:username/getCNIC', authenticateEmployee, employeeController.getCNIC)


module.exports = router