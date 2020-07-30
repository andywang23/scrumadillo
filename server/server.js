const express = require('express');
const app = express();
const path = require('path');
// const request = require('superagent');

const githubController = require('./controllers/github-controller.js');
const boardController = require('./controllers/board-controller.js');

const stackRouter = require('./routers/stack-router.js');
const userRouter = require('./routers/user-router.js');
// const boardRouter = require('./routers/board-router.js');\

const main = express.Router();

const url = require('url');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//main route for proxy calls to localhost 3000.
app.use('/server', main);

//OAuth
main.get('/github', githubController.authorize, githubController.token, (req, res) => {
  return res.status(200).json(res.locals.authorized);
});

// //login and signup routes
// main.post('/login', userController.verifyUser, (req, res) => {
//   return res.status(200).json(res.locals.user);
// });

// main.post('/signup', userController.createUser, (req, res) => {
//   return res.status(200).json(res.locals.user);
// });

//Route for storing and retrieving board state
main.get('/boardState/:username', boardController.getBoard, (req, res) => {
  return res.status(200).json(res.locals.board);
});
main.post('/boardState', boardController.saveBoard, (req, res) => {
  return res.status(200).json(res.locals.board);
});

/** Routes for handling requests **/
main.use('/stack', stackRouter);
main.use('/user', userRouter);

/** SERVE STATIC ASSETS IN PRODUCTION MODE ONLY **/
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.get('/', express.static('client'));
  };

/* --Error Handling-- */
/** CATCH-ALL ROUTE HANDLER **/
app.use('*', (req, res) => {
  return res.status(404).json('Error: page not found');
});
/** GLOBAL ERROR HANDLER **/
app.use((err, req, res, next) => {
  if (err) return res.status(err.status).json(err);
  return res.status(500).json('Server error');
});

app.listen(3000, () => console.log(process.env.NODE_ENV));
