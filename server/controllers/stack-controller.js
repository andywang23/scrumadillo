const db = require('../models/models.js');
const stackController = {};

//populates a 'deck' with stored technology cards and returns them to client
stackController.getStack = (req, res, next) => {
  const stackName = req.body;
  const queryStack = `SELECT todo.*, techName.techInStack FROM todo INNER JOIN techInStack WHERE techInStack.stack = '${stackName}'`;
  db.query(queryStack)
    .then((stack) => {
      res.locals.stack = stack.rows;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = stackController;
