const {registration, login, current, logout, updateSubscribe} = require('../services/authService');

const registrationController = async (req,res) => {
  const {email, password} = req.body;
  const result = await registration(email, password);
  res.json({
    status: "success",
    message: `Your ${email} is registered`,
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}
const loginController = async (req,res) => {
  const {email, password} = req.body;
  const token = await login(email, password);
  res.json({
    status: "success",
    data: token, 
  })
}
const currentUserController = async (req, res) => {
  const user = req.user;
  const result = await current(user);
  res.json({
    status: "success",
    data: {
      email: result.email,
      subscribe: result.subscription
    },
  })
}
const logoutController = async (req,res) => {
  const [,token] = req.headers['authorization'].split(' ');
  await logout(token);
  res.json({
    status: "success",
    message: 'Not authorized',
  })
}
const updateSubscribeController = async (req, res) => {
  const user = req.user;
  const {subscribe} = req.query;
  const result = await updateSubscribe(user, subscribe);
  res.json({
    status: "success",
    email: result.email,
    subscription: result.subscription,
  })
}
module.exports = {
  registrationController,
  loginController,
  currentUserController,
  logoutController,
  updateSubscribeController
}