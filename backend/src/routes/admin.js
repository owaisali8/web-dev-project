const { Router } = require('express');
const { authenticateAdmin, authenticateAdminRefresh } = require('../middleware/authAdmin')

const router = Router()
const adminController = require('../controllers/adminController')

router.get('/', authenticateAdmin, adminController.getAdmin)
router.get('/names', authenticateAdmin, adminController.getAdminNames)
router.get('/id/:id', authenticateAdmin, adminController.getAdminById)
router.get('/find', authenticateAdmin, adminController.getAdminByName)
router.get('/:username', authenticateAdmin, adminController.getAdminByUsername)

router.delete('/:username', authenticateAdmin, adminController.deleteAdminByUsername)

router.post('/login', adminController.loginAdmin)
router.post('/refreshToken', authenticateAdminRefresh, adminController.refreshAdminToken)
router.post('/', adminController.signUpAdmin)
//logout will del refreshTOken from frontend

router.patch('/updatePwd', authenticateAdmin, adminController.updateAdminPwd)
router.patch('/:username', authenticateAdmin, adminController.updateAdmin)

router.patch('/:username/uploadImage', authenticateAdmin, adminController.uploadImage)
router.get('/:username/getImage', adminController.getImage)

module.exports = router