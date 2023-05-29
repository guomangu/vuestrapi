const crypto = require('crypto');

const salt = crypto.randomBytes(16).toString('base64');
// console.log(salt);



module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: salt,
    },
},
});
