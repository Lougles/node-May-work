const {registration, login, current, updateAvatar, logout} = require('../services/authService');


const registrationController = async (req,res) => {
  const {email, password} = req.body;
  const result = await registration(email, password);
  res.json({
    status: "success",
    message: `Your ${email} is registered`,
    data: {
      email: result.email,
      subscription: result.subscription,
      ava: result.avatarURL,
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
      subscribe: result.subscription,
      ava: result.avatarURL,
    },
  })
}

const updateAvatarController = async (req, res) => {
  const user = req.user;
  const file = req.file;
  // console.log('USER',user);
  // console.log('file', file);
  const result = await updateAvatar(user, file);
  console.log(result);
  res.json({
    status: "success",
    data: {
      ava: result.avatarURL,
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
module.exports = {
  registrationController,
  loginController,
  currentUserController,
  updateAvatarController,
  logoutController
}