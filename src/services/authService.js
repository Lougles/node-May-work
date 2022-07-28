const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Auth} = require('../db/authModel');
const {NotAuthorizedError} = require('../helpers/errors');
const Jimp = require('jimp');
const path = require('path');




const updateAvatar = async(user, file) => {
  const filename = file.filename;
  const newpath = path.resolve('./public/avatars');
  const FILE_DIR = `${newpath}/${filename}`;
  console.log(FILE_DIR);
  jimpAvatar(file);
  await Auth.findOneAndUpdate({_id: user._id},{$set: {avatarURL: FILE_DIR}});
  const result =  await Auth.findById(user._id);
  return result;
};
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
const registration = async (email, password) => {
  const user = new Auth({email,password});
  await user.save();
  return user;
};
const login = async (email,password) => {
  const user = await Auth.findOne({email});
  if (!user) {
    throw new NotAuthorizedError(`No user with such email: ${email}, please input correct data`);
  }
  if(!await bcrypt.compare(password, user.password)){
    throw new NotAuthorizedError(`Incorrect password`);
  }
  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt,
  }, process.env.JWT_SECRET, {expiresIn: "1h"});
  user.token = token;
  await user.save();
  return token;
};
const current = async(user) => {
  const result = await Auth.findById(user._id);
  return result;
};

const logout = async (token) => {
  if (!token) {
    throw new NotAuthorizedError(`No user with such email: ${email}, please input correct data`);
  }
  const deleteToken = jwt.sign({token}, process.env.JWT_SECRET, {expiresIn: 1});
  console.log(deleteToken);
  return deleteToken;
}

module.exports = {
  registration,
  login,
  current,
  updateAvatar,
  logout
}