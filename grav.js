const gravatar = require('gravatar');

const email = 'louglescom@gmail.com'
const res = gravatar.profile_url(email);

console.log(res);