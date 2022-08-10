const Jimp = require('jimp');
const fs = require('fs-extra');
const path = require('path');
const temp = path.resolve('./temp');
const {uploadAva} = require('../../google-storage')

const jimpAvatar = async (file, user) => {
  // const dir = `${user._id}`;
  // const FILE_DIR = `${dir}/${file.filename}`;
  // fs.ensureDir(dir);
  const filename = file.filename;
  const filepath = file.path;
  Jimp.read(filepath)
  // .then(ava => {
  //   return ava
  //     .resize(250, 250) // resize
  //     .quality(60) // set JPEG quality
  //     .write(FILE_DIR); // save
  // })
  .then(ava => {
    return ava
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
  })
  .catch(err => {
    console.error(err);
  });
  await uploadAva(filepath, filename).catch(console.error);
  fs.unlink(`${temp}/${filename}`);
}
module.exports = {
  jimpAvatar
}