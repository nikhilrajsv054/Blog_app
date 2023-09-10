import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state for the posts
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Create an async thunk for adding a new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost, { dispatch }) => {
  // Send an IPC request to add the post data
  const response = await window.electron.ipcRenderer.invoke('addPost', newPost);

  // Dispatch a Redux action with the response data
  dispatch(addPost(response));
  return response;
});

// Create an async thunk for editing an existing post
export const editExistingPost = createAsyncThunk('posts/editExistingPost', async (editedPost, { dispatch }) => {
  // Send an IPC request to edit the post data
  const response = await window.electron.ipcRenderer.invoke('editPost', editedPost);

  // Dispatch a Redux action with the response data
  dispatch(editPost(response));
  return response;
});

// Create the posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // ... Your other reducers ...

    // Add a post to the state
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    // Edit a post in the state
    editPost: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editExistingPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editExistingPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(editExistingPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, editPost } = postsSlice.actions;

export default postsSlice.reducer;
