// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [], // Initial state with an empty array
};


const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload); // Add a new post
    },
    likePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload);
      if (post) {
        post.likes += 1; // Increment the likes count
      }
    },
    commentPost: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.comments.push(comment); // Add a comment to the post
      }
    },
  },
});

export const { addPost, likePost, commentPost } = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export default postsSlice.reducer;
