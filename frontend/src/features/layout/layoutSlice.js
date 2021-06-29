import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    enabledAds: false
  },
  reducers: {
    setLayout: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    },
  }
});

export const { setLayout } = layoutSlice.actions
export default layoutSlice.reducer