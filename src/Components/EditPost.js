// EditPostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../store/Slices/postsSlice';
import styles from '../Styles/PostForm.module.css';

const EditPostForm = ({ post, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    dispatch(editPost({ ...post, content: editedContent }));
    onSave();
  };

  return (
    <div className={styles['post-form']}>
      <h2>Edit Post</h2>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        rows="4"
        cols="50"
      />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPostForm;
