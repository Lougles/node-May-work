const {Auth} = require('../db/authModel');
const {NotAuthorizedError} = require('../helpers/errors');

const registration = async (email, password) => {
  const auth = new Auth({email,password});
  await auth.save();
};

const login = async (id) => {

};

module.exports = {
  registration,
  login
}