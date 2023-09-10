// PostForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, editPost, selectIsAdmin } from '../store/Slices/authSlice';
import styles from '../Styles/PostForm.module.css';
const { ipcRenderer } = window.require('electron');

const PostForm = ({ postToEdit }) => {
  // ...

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      if (postToEdit) {
        // Edit existing post
        dispatch(editPost({ id: postToEdit.id, title, content }));
        ipcRenderer.send('editPost', { id: postToEdit.id, title, content });
      } else {
        // Create a new post
        dispatch(addPost({ title, content }));
        ipcRenderer.send('addPost', { title, content });
      }
    }
  };

  // ...
};

export default PostForm;


----------------------------------------

// main.js (Electron main process)
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs-extra');
const path = require('path');

// ...

// Handle IPC requests to add a new post
ipcMain.on('addPost', async (event, newPost) => {
  try {
    // Read the existing JSON data file
    const jsonData = await fs.readJson('data.json');

    // Generate a unique ID for the new post (you can use a library like `uuid`)
    newPost.id = Date.now();

    // Add the new post to the JSON data
    jsonData.push(newPost);

    // Write the updated JSON data back to the file
    await fs.writeJson('data.json', jsonData);

    // Send a response back to the renderer process if needed
    event.reply('addPostResponse', newPost);
  } catch (error) {
    console.error('Error adding post:', error);
    // Handle the error and send an error response if needed
    event.reply('addPostResponse', { error: error.message });
  }
});

// Handle IPC requests to edit an existing post
ipcMain.on('editPost', async (event, editedPost) => {
  try {
    // Read the existing JSON data file
    const jsonData = await fs.readJson('data.json');

    // Find the index of the post to edit by its ID
    const postIndex = jsonData.findIndex((post) => post.id === editedPost.id);

    if (postIndex !== -1) {
      // Update the post's title and content
      jsonData[postIndex].title = editedPost.title;
      jsonData[postIndex].content = editedPost.content;

      // Write the updated JSON data back to the file
      await fs.writeJson('data.json', jsonData);

      // Send a response back to the renderer process if needed
      event.reply('editPostResponse', editedPost);
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    console.error('Error editing post:', error);
    // Handle the error and send an error response if needed
    event.reply('editPostResponse', { error: error.message });
  }
});

// ...

// Create the main window
app.on('ready', () => {
  // ...
});



