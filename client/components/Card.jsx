import React from 'react';

import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'theme.palette.text.secondary',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: '#363738',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const Card = (props) => {
  //props only has card if we're in the "in progress board"
  const { card = null, name, url } = props;

  const classes = useStyles();

  const todoArray = [];
  if (card) {
    const { todo } = card;
    for (let i = 0; i < todo.length; i += 1) {
      todoArray.push(
        <div className='task'>
          <Task
            name={todo[i].taskName}
            detail={todo[i].details}
            complete={todo[i].completed}
            id={`id${i}`}
          />
        </div>
      );
    }
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.heading}>{name}</Typography>
        <br />
        <a href={url} target="_blank">
          <em>{url}</em>
        </a>
        {todoArray}
      </Paper>
    </div>
  );
};

export default Card;
