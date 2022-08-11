const express = require('express');
const router = new express.Router();
const {
  registrationController,
  loginController,
  currentUserController,
  updateAvatarController,
  logoutController
} = require('../../controllers/authController');
const {registrationValidation} = require('../../middlewares/validation')
const {asyncWrapper} = require('../../helpers/trycatchHelper');
const {authMiddleware} = require('../../middlewares/authMiddleware');
const {upload} = require('../../helpers/avatarMulter');

router.post('/registration', registrationValidation, asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.patch('/avatar', [authMiddleware, upload.single('avatar')], asyncWrapper(updateAvatarController));
router.use('/download', express.static('./public'))
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router