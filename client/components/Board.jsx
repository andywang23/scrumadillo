import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from './Card.jsx';
import { selectBoard, increment } from '../reducers/boardSlice';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  board: {
    backgroundColor: '#004ba0',
  },
}));

const Board = (props) => {
  const { id } = props;

  const dispatch = useDispatch();
  console.log('use selector', useSelector(selectBoard));
  const { boardState } = useSelector(selectBoard);
  const { current } = boardState;
  console.log('current', current);
  const classes = useStyles();
  const cardsArr = [];

  if (id === 'stack') {
    for (let i = current + 1; i < boardState.cards.length; i++) {
      cardsArr.push(<Card key={i} name={boardState.cards[i].name} />, <br />);
    }
  }

  if (id === 'inProgress' && boardState.cards[current]) {
    cardsArr.push(
      <div>
        <Card
          className={classes.board}
          key={current}
          name={boardState.cards[current].name}
          url={boardState.cards[current].url}
          card={boardState.cards[current]}
        />
        <Button onClick={() => dispatch(increment())}>Card Complete</Button>
      </div>
    );
  }

  if (id === 'complete') {
    for (let i = 0; i < current; i++) {
      cardsArr.push(<Card key={i} name={boardState.cards[i].name} />, <br />);
    }
  }
  return (
    <div>
      <Grid item xs={12}>
        {cardsArr}
      </Grid>
    </div>
  );
};

export default Board;
