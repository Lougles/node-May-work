

// const { describe } = require("yargs");
const {authMiddleware} = require('../src/middlewares/authMiddleware');
const {NotAuthorizedError} = require('../src/helpers/errors');
const {loginController} = require('../src/controllers/authController');
const {Auth} = require('../src/db/authModel')


describe('Login Controller test', async() => {
  it('should take token from loginSevices', () => {
    const mLogin = 'e@gmail.com';
    const mPassword = 'gcgfhjkm';
    const mToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjlmNmZlMDA4OTBhZDYzMTYzYmYyOTEiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTA3VDE1OjE4OjM4LjQ3N1oiLCJpYXQiOjE2NTg4MjczMzQsImV4cCI6MTY1ODgzMDkzNH0.VOZUAuZKoOpFn3yyI8j-qzJVcicqpGoGSwP2Pue7Eu8"
    const mResult = await loginController(mLogin, mPassword);
  })
})

