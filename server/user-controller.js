const { User } = require('./models/models.js');
const bcrypt = require('bcrypt');

const userController = {};

//BCRYPT PLACEHOLDER CODE FOR REGISTRATION FOR NOW:
const SALT_WORK_FACTOR = 10;
bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  if (err) return next(err);
  bcrypt.hash(user.password, salt, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

//BCRYPT PLACEHOLDER CODE FOR LOGGING IN
comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
    //isMatch will be true or false
  });
};

//signup

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  //   console.log(username, password);
  User.create({ username: username, password: password }, (err, user) => {
    console.log('user', user);
    if (err) return next(err);

    res.locals.user = user;
    return next();
  });
};

//login
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) return next(err);
    if (password === user.password) {
      res.locals.user = user;
      return next();
    } else
      return next({
        error: 'Username and Password combination was not found.',
        status: 401,
      });
  });
};

module.exports = userController;
