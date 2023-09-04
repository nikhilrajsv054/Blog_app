// PostForm.js (Updated with id and content fields)
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, likePost, commentPost } from '../store/Slices/postsSlice'; // Import actions
import styles from '../Styles/PostForm.module.css'; // Import the CSS module
import { useHistory } from 'react-router-dom';

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Get the history object
  // const [newPost, setNewPost] = useState({
  //   id: Date.now(), // Generate a unique id using Date.now()
  //   title: '',
  //   content: '', // Added content field
  //   likes: 0,
  //   comments: [],
  // });

  // const handlePostSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(addPost(newPost)); // Dispatch the entire post object
  //   setNewPost({ ...newPost, title: '', content: '', likes: 0, comments: [] }); // Reset the form fields

  //   // Navigate to the PostList component after adding a post
  //   history.push('/');
  // };

  const [newPost, setNewPost] = useState({
    id: Date.now(),
    title: '',
    content: '',
    likes: 0,
    comments: [],
    createdAt: new Date().toLocaleString(), // Add createdAt field with the current date and time
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(newPost));
    setNewPost({
      id: Date.now(),
      title: '',
      content: '',
      likes: 0,
      comments: [],
      createdAt: new Date().toLocaleString(),
    });
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId)); // Dispatch the likePost action with the postId
  };

  const handleComment = (postId, comment) => {
    dispatch(commentPost({ postId, comment })); // Dispatch the commentPost action with the postId
  };

  return (
    <div className={styles['post-form']}>
      <h2>Add a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content" // Add a content field
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>
      <h2>Actions</h2>
      <div className={styles['actions']}>
        <button onClick={() => handleLike(newPost.id)}>Like Post</button> {/* Use newPost.id */}
        <button onClick={() => handleComment(newPost.id, 'Sample comment')}>Comment on Post</button> {/* Use newPost.id */}
      </div>
    </div>
  );
};

export default PostForm;