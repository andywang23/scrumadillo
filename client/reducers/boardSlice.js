import { createSlice } from '@reduxjs/toolkit';

//the createSlice method encapsulates a piece of the store.
// The state and the methods for changing state are accessing throughout the app with useSelector and useDispatch  from 'react-redux'

export const boardSlice = createSlice({
  name: 'Board',
  initialState: {
    current: 0, //index of current card
    username: '',
    cards: [], // an array of card objects filled from the deck
  },
  reducers: {
    increment: (state) => {
      state.current += 1;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    complete: (state) => {
      state.completed = true;
    },
    getAll: (state, action) => {
      state.cards = action.payload;
    },
    assignUser: (state, action) => {
      state.username = action.payload.username;
    },
    newState: (state, action) => {
      state.username = action.payload.username;
      state.current = action.payload.current;
      state.cards = action.payload.cards;
    },
  },
});

export const {
  increment,
  addCard,
  getAll,
  complete,
  getCards,
  assignUser,
  newState,
} = boardSlice.actions;

export const selectBoard = (state) => state;

export default boardSlice.reducer;
