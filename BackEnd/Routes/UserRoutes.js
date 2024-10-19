const express = require("express");
const router = express.Router()

const {CreateUser , LoginUser , LogoutUser} = require("../Controllers/UserController")

const IsUserLoggedIn = require('../Middlewares/IsUserLoggedIn')

router.route( "/Create" ).post(CreateUser)
router.route('/Login').post(LoginUser)
router.route('/Logout').post(IsUserLoggedIn ,LogoutUser)


module.exports = router;