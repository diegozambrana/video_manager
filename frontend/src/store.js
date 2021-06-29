import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './features/layout/layoutSlice';
import videosSlice from './features/videos/videosSlice';
import pageSlice from './features/page/pageSlice';

export default configureStore({
  reducer: {
      layout: layoutSlice,
      videos: videosSlice,
      page: pageSlice,
  }
})