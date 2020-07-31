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
      console.log('hii' , action.payload)
      console.log('bye' ,Object.entries(state.stacks))
      for (let i = 0 ; i< state.stacks.length ; i++) {
        if (state.stacks[i].hasOwnProperty(action.payload)) {
          useDispatch(getAll(state.stacks[i].action.payload))
        }
      }
      // const i = action.payload;
      // useDispatch(getAll(state.stacks[i]))
    },    
  },
});

export const { getStack , selectStack } = deckSlice.actions;
export const selectDeck = (state) => state;
export default deckSlice.reducer;
