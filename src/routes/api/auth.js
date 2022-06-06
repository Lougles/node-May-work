const express = require('express');
const router = new express.Router();
const {
  registrationController,
  loginController
} = require('../../controllers/authController')
const {asyncWrapper} = require('../../helpers/trycatchHelper');


router.post('/registration', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));


module.exports = router