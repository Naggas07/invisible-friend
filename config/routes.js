const express = require('express');
const router = express.Router();

// require models

const userController = require('../controllers/user.controller')

// user routes

router.get('/', userController.home)
router.get('/login', userController.login)
router.post('/login', userController.doLogin)
router.get('/new', userController.create)
router.post('/new', userController.doCreate)
router.get('/user/home', userController.userHome)
router.post('/logout', userController.logout)


module.exports = router