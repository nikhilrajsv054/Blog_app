// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    // editPost: (state, action) => {
    //   const { id, content } = action.payload;
    //   const postToEdit = state.find((post) => post.id === id);
    //   if (postToEdit) {
    //     postToEdit.content = content;
    //   }
    // },
  },
});

export const { addPost, editPost } = postsSlice.actions;
export const selectPosts = (state) => state.posts;
export default postsSlice.reducer;
