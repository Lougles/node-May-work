const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {Auth} = require('../db/authModel');
const {NotAuthorizedError, UpdateSubscribeError} = require('../helpers/errors');

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
  const deleteToken = jwt.sign({token}, process.env.JWT_SECRET, {expiresIn: 1});
  return deleteToken;
}
const updateSubscribe = async (user, subscribe) => {
  const subscription = ['starter', 'pro', 'business'];
  if (!subscription.includes(subscribe)){
    throw new UpdateSubscribeError(`This subscribe: "${subscribe}" is incorrect`)
  }
  user.subscription = subscribe;
  await user.save();
  return user;
}
module.exports = {
  registration,
  login,
  current,
  logout,
  updateSubscribe
}