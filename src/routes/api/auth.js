const express = require('express');
const router = new express.Router();
const {
  registrationController,
  loginController,
  currentUserController,
  logoutController,
  updateSubscribeController
} = require('../../controllers/authController');
const {registrationValidation} = require('../../middlewares/validation')
const {asyncWrapper} = require('../../helpers/trycatchHelper');
const {authMiddleware} = require('../../middlewares/authMiddleware');


router.post('/registration', registrationValidation, asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.patch('/users', authMiddleware, asyncWrapper(updateSubscribeController))

module.exports = router