const express = require('express');
const multer = require('multer');
const path = require('path');
// const fileDir = path.resolve('./public/avatars');
const temp = path.resolve('./temp');
const { v4: uuidv4 } = require('uuid');

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temp);
  },
    fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error(`please upload an image`))
    }
    cb(null, true);
  },
  filename: function(req, file, cb){
    const [, extansion] = file.originalname.split('.');
    cb(null, `${uuidv4() }.${extansion}`);
  },
});

const upload = multer({storage});


router.post('/registration', registrationValidation, asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));
router.patch('/avatar', [authMiddleware, upload.single('avatar')], asyncWrapper(updateAvatarController));
// router.put('/avatar', [authMiddleware, upload.single('avatar')], asyncWrapper(updateAvatarController));
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.get('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router