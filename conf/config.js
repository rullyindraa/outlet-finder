var config = {
  database: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'outlet-finder'
  },
  register_message: {
    from: 'register@demo.com',
    subject_register: 'Node.js Register Account',
    text_register1: 'Are you creating new account?',
    text_register2: 'If that`s not you, you can ignore this message' 
  },
  message: {
    from: 'resetPassword@demo.com',
    subject_reset: 'Node.js Password Reset',
    subject_success: 'Your password has been changed',
    text_reset1: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n',
    text_reset2: 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    address: 'http://' ,
    text_confirm: 'Hello,\n\n' +
    'This is a confirmation that the password for your account has just been changed.\n'
  }
}

module.exports = config;
