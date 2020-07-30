import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/icon.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

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
}));

const NavBar = ({ logout }) => {
  
  const { button, button2 } = useStyles();
  const dispatch = useDispatch();
  
  const handleClick = () => {
    fetch('/server/cards')
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(getAll(data));
      });
  }
  return (
    <div >
      <AppBar position="static" color="#e8eaf6">
        <Toolbar>
          <IconButton edge="start">
            <img src={logo} onClick={logout} className="logo" /> 
          </IconButton>
          <Button className={button2} onClick={handleClick}>
            Add Cards
          </Button>
          <Button className={button} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
