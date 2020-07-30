import { createSlice } from '@reduxjs/toolkit';

export const deckSlice = createSlice({
  name: 'stack',
  initialState: {
    stacks: [],
  },

  reducers: {
    getStack: (state, action, i) => {
      state.stacks[i] = action.payload;
    },
  },
});

export const { getCards } = deckSlice.actions;
export const selectDeck = (state) => state;
export default deckSlice.reducer;
