const Jimp = require('jimp');
const fs = require('fs-extra');
const path = require('path');
const temp = path.resolve('./temp');

const jimpAvatar = (file, user) => {
  const dir = `./public/${user._id}`
  const FILE_DIR = `${dir}/${file.filename}`;
  fs.ensureDir(dir);
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
  fs.unlink(`${temp}/${file.filename}`)
}
module.exports = {
  jimpAvatar
}