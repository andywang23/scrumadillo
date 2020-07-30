import { createSlice } from '@reduxjs/toolkit';
import { getAll } from '../reducers/boardslice';
import { useDispatch } from 'react-redux';

export const deckSlice = createSlice({
  name: 'stack',
  initialState: {
    stacks: [],
  },

  reducers: {
    getStack: (state, action) => {
      // action payload is data returned from fetch request on mounting
      state.stacks = action.payload;
    },
    selectStack: (state, action) => {
      // action paylod is the index given when clicking on drop down option
      const i = action.payload;
      useDispatch(getAll(state.stacks[i]))
    },    
  },
});

export const { getStack , selectStack } = deckSlice.actions;
export const selectDeck = (state) => state;
export default deckSlice.reducer;
