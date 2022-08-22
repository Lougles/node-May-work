const multer = require('multer');
const path = require('path');
const temp = path.resolve('./temp');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temp);
  },
  filename: function(req, file, cb){
    const [, extansion] = file.originalname.split('.');
    if (!extansion.match(/(jpg|jpeg|png)$/)){
      return cb(new Error(`please upload an image`));
    }
    cb(null, `${uuidv4() }.${extansion}`);
  },
});
const upload = multer({storage});

module.exports = {
  upload
}