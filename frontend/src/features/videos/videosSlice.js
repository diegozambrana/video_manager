import { createSlice } from '@reduxjs/toolkit'

export const VideosSlice = createSlice({
  name: 'videos',
  initialState: {
    enabledAds: false
  },
  reducers: {
    setVideos: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    },
  }
});

export const { reducers } = VideosSlice.actions
export default VideosSlice.reducer