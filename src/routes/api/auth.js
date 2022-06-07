const express = require('express');
const router = new express.Router();
const {
  registrationController,
  loginController,
  // logoutController
} = require('../../controllers/authController');
const {registrationValidation} = require('../../middlewares/validation')
const {asyncWrapper} = require('../../helpers/trycatchHelper');
// const {authMiddleware} = require('../../middlewares/authMiddleware');


router.post('/registration', registrationValidation, asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
// router.use(authMiddleware);
// router.post('/logout', asyncWrapper(logoutController));

module.exports = router