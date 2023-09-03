// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import postsSlice from './Slices/authSlice';
const store = configureStore({
  reducer: {
    auth: authSlice, // Include the authReducer in the store configuration
    posts: postsSlice,
  },
});

export default store;
