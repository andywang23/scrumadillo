import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { completeTask } from '../reducers/boardSlice';
const themes = createMuiTheme({
  palette: {
    primary: {
      light: '#E3E1E2',
      main: '#3f50b5',
      dark: '#DED7DE',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  detail: {
    backgroundColor: themes.palette.primary.light,
    paddingLeft: theme.spacing(4),
  },
}));

const Task = (props) => {
  let { name, detail, complete, id } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <List dense className={classes.root}>
      <ListItem className={classes.name}>
        <ListItemSecondaryAction>
          {complete ? (
            <Checkbox
              defaultChecked
              color="secondary"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onClick={() => {
                dispatch(completeTask({ todoName: name }));
              }}
            />
          ) : (
            <Checkbox
              defaultUnchecked
              color="secondary"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onClick={() => {
                dispatch(completeTask({ todoName: name }));
              }}
            />
          )}
        </ListItemSecondaryAction>
        <strong>{props.name}</strong>
      </ListItem>
      <ListItem button className={classes.detail}>
        <span
          style={
            complete
              ? { textDecoration: 'line-through' }
              : { textDecoration: 'none' }
          }
        >
          {props.detail}
        </span>

        {props.complete}
      </ListItem>
    </List>
  );
};

export default Task;
