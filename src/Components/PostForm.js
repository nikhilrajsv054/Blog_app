// PostForm.js (Create New Post)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/Slices/postsSlice';
import { selectIsAdmin } from '../store/Slices/authSlice';
import styles from '../Styles/PostForm.module.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      // Create a new post
      dispatch(addPost({ title, content }));
      
      // Clear the form fields after creating the post
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className={styles['post-form']}>
      <h2>Create Post</h2>
      {isAdmin ? (
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      ) : (
        <p>You must be an admin to create posts.</p>
      )}
    </div>
  );
};

export default PostForm;
