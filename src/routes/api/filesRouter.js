const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileDir = path.resolve('./public/avatars')

const router = new express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    const [, extansion] = file.originalname.split('.');
    cb(null, `${uuidv4() }.${extansion}`)
  }
});

const uploadMiddleware = multer({storage});


const {asyncWrapper} = require('../../helpers/trycatchHelper')
const {
  uploadController,
} = require('../../controllers/filesController');


router.post('/upload', uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
router.use('/download', express.static(fileDir));

module.exports = router;