const jwt = require('jsonwebtoken');
const {NotAuthorizedError} = require('../helpers/errors')
const {Auth} = require('../db/authModel')

const authMiddleware = async (req,res,next) => {
  try{
    const {authorization} = req.headers;
    if(!authorization) {
      next(new NotAuthorizedError('Please provide a token!'));
    }
    const [,token] = req.headers['authorization'].split(' ');
    if (!token) {
      next(new NotAuthorizedError('Please provide a token!'));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const findUser = await Auth.findById(user._id);
    if(!findUser) {
      next(new NotAuthorizedError(`We can't find this User`));
    }
    if(findUser.token !== token) {
      next(new NotAuthorizedError('Invalid user token!'));
    }
    req.token = token;
    req.user = findUser;
    next();
  }catch(err) {
    next(new NotAuthorizedError('Catch Invalid token!'));
  }
 }

 module.exports = {
  authMiddleware
 }