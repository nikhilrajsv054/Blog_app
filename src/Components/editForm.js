Copy code

// PostList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const navigate = useNavigate(); // Get the navigate function

  const handleEditClick = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);

    if (postToEdit) {
      navigate(`/edit-post/${postId}`, { state: { post: postToEdit } }); // Use navigate
    }
  };

  return (
    <div>
      <h2>Post List</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
          {isAdmin && (
            <button onClick={() => handleEditClick(post.id)}>Edit</button>
          )}
          <Link to={`/full-post/${post.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;



// EditPostForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editPost } from '../store/Slices/postsSlice';

const EditPostForm = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [editedPost, setEditedPost] = useState({
    title: post.title, // Pre-fill title
    content: post.content, // Pre-fill content
  });

  const handleTitleChange = (e) => {
    setEditedPost({ ...editedPost, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setEditedPost({ ...editedPost, content: e.target.value });
  };

  const handleEditSubmit = () => {
    dispatch(editPost({ id: post.id, title: editedPost.title, content: editedPost.content }));
    history.push(`/full-post/${post.id}`);
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
