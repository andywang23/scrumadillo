import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/icon.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { useDispatch } from 'react-redux';
import { getCards } from '../reducers/deckSlice';
import { getAll } from '../reducers/boardslice';

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: 'auto',
  },
  button2: {
    marginRight: 'auto',
  },
  dropMenu: {
    marginRight: 'auto',
    minWidth: 120,
  }
}));

const NavBar = (props) => {
  const { logout } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div >
      <AppBar position="static" color="#e8eaf6">
        <Toolbar>
          <IconButton edge="start">
            <img src={logo} onClick={logout} className="logo" /> 
          </IconButton>
          {/* <Button
            className={classes.button2}
            id="getCards"
            onClick={() => {
              fetch('/server/cards')
                .then((resp) => resp.json())
                .then((data) => {
                  // dispatch(getCards(data));
                  dispatch(getAll(data));
                });
              document.querySelector('#getCards').style.display = 'none';
            }}
          >
            Add Cards
          </Button> */}
          <FormControl className={classes.dropMenu}>
            <InputLabel>Stacks</InputLabel>
            <Select value ={3} onChange={(event)=> alert(event.target.value)}>
              <MenuItem value ={0}>MERN</MenuItem>
              <MenuItem value ={1}>NERP</MenuItem>
              <MenuItem value ={2}> stack 3</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.button} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
