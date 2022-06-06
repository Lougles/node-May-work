const {registration, login, logout} = require('../services/authService');

const registrationController = async (req,res) => {
  const {email, password} = req.body;
  await registration(email, password);
  res.json({
    status: "success", 
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

const logoutController = async (req,res) => {
  const user = req.user;
  await logout(user);
  res.json({
    status: "success"
  })
}

module.exports = {
  registrationController,
  loginController,
  logoutController
}