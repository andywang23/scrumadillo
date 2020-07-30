const db = require('../models/models.js');
const userController = {};

// create user

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('input user password', req.body);
  res.locals.username = username;
  res.locals.password = password;
  const createUserQuery = `INSERT INTO public.user (name, password) VALUES ('${username}','${password}')`;
  db.query(createUserQuery)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.log('sql error', err);
      next(err);
    });
};

// verify user

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  let checkUserNameExist = `SELECT * FROM public.user WHERE name = '${username}'`;
  db.query(checkUserNameExist).then((user) => {
    const userRow = user.rows[0];
    if (!user.rows) {
      return res.status(404).json({ name: 'This user does not exist' });
    }
    if (password === userRow.password) {
      console.log("we're in!");
      res.locals.username = userRow.username;
      res.locals.id = userRow.id;
      return next();
    } else
      return next({
        error: 'Username and Password combination was not found.',
        status: 401,
      });
  });
};

module.exports = userController;
