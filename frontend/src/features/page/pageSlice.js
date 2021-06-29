import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    homeSlider: [],
    showSlider: [],
    movieSlider: [],
    collections: [],
    collection: {},
  },
  reducers: {
    setPage: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    },
  }
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;