const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Auth} = require('../db/authModel');
const {NotAuthorizedError} = require('../helpers/errors');


const registration = async (email, password) => {
  const user = new Auth({email,password});
  await user.save();
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
  }, process.env.JWT_SECRET);
  return token;
};

const logout = async (user) => {
  let check = await Auth.findById(user._id);
  if (!check) {
    throw new NotAuthorizedError(`You are not Aunthorized`);
  }
  check = 'No data';
  return check
}

module.exports = {
  registration,
  login,
  logout
}