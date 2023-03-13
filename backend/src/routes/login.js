const express = require('express');
const authUserRefresh = require('../middleware/authLogin');

const router = express.Router()
const loginController = require('../controllers/loginController');

router.post('/', loginController.login)
router.post('/refreshToken', authUserRefresh, loginController.refreshUserLogin)

module.exports = router