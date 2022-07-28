const Jimp = require('jimp');

const jimpAvatar = (file) => {
  const FILE_DIR = `./public/avatars/${file.filename}`;
  Jimp.read(file.path)
  .then(ava => {
    return ava
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(FILE_DIR); // save
  })
  .catch(err => {
    console.error(err);
  });
}
module.exports = {
  jimpAvatar
}