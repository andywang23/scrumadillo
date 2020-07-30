import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
const themes = createMuiTheme({
  palette: {
    primary: {
      main: '#fafafa',
      contrastText: '#fff',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  detail: {
    backgroundColor: themes.palette.primary.main,
    paddingLeft: theme.spacing(4),
  },
}));

const Task = (props) => {
  const classes = useStyles();

  return (
    <List>
      <ListItem>
        <ListItemSecondaryAction>
          <Checkbox
            defaultUnchecked
            color="secondary"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
            onClick={() => {


              if (document.querySelector(`#${props.id}`).style.textDecoration === 'line-through') {
                document.querySelector(`#${props.id}`).style.textDecoration = 'none';
                // set completed to false
              } else {
                document.querySelector(`#${props.id}`).style.textDecoration = 'line-through';

                // set completed to true
              }
            }}
          />
        </ListItemSecondaryAction>
        <strong>{props.name}</strong>
      </ListItem>
      <ListItem button className={classes.detail}>
        <span id={props.id}>{props.detail}</span>


        {props.complete}
      </ListItem>
    </List>
  );
};

export default Task;
