


// EditPostForm.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editPost } from '../store/Slices/postsSlice';

const EditPostForm = ({ postId }) => {
  const post = useSelector((state) => state.posts.find((post) => post.id === postId));
  const dispatch = useDispatch();
  const history = useHistory();

  const [editedPost, setEditedPost] = useState({
    title: post.title,
    content: post.content,
  });

  const handleTitleChange = (e) => {
    setEditedPost({ ...editedPost, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setEditedPost({ ...editedPost, content: e.target.value });
  };

  const handleEditSubmit = () => {
    dispatch(editPost({ id: postId, title: editedPost.title, content: editedPost.content }));
    history.push(`/full-post/${postId}`);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <label>Title:</label>
      <input type="text" value={editedPost.title} onChange={handleTitleChange} />
      <label>Content:</label>
      <textarea value={editedPost.content} onChange={handleContentChange} />
      <button onClick={handleEditSubmit}>Save</button>
    </div>
  );
};

export default EditPostForm;
