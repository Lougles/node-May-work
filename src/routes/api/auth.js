const express = require('express');
const router = new express.Router();
const {
  registrationController,
  loginController,
  currentUserController,
  logoutController
} = require('../../controllers/authController');
const {registrationValidation} = require('../../middlewares/validation')
const {asyncWrapper} = require('../../helpers/trycatchHelper');
const {authMiddleware} = require('../../middlewares/authMiddleware');


router.post('/registration', registrationValidation, asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.patch('/avatar', authMiddleware, asyncWrapper());
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router