const express = require('express');
const userController = require('../controllers/user-controller.js');

const userRouter = express.Router();

// create user
userRouter.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals);
});

userRouter.post('/login', userController.verifyUser, (req, res) => {
  console.log('res locals username and id');
  return res.status(200).json(res.locals);
});
module.exports = userRouter;
