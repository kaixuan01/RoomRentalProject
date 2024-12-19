// src/redux/someSlice.js
import { createSlice } from '@reduxjs/toolkit';

const someSlice = createSlice({
  name: 'some',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem } = someSlice.actions;
export default someSlice.reducer;
