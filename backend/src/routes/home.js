const { Router } = require('express');
const Login = require('../models/Login')


const router = Router()
const homeController = require('../controllers/homeController')

router.get('/', homeController.getHomePage)
router.get('/users', Login.readAll)

module.exports = router