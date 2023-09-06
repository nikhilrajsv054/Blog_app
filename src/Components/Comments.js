/* FullPost.module.css */

.full-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.full-post h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.full-post p {
  font-size: 16px;
  line-height: 1.5;
}

/* Add more styles as needed */

<Route path="/full-post/:postId" component={FullPost} />

<div className={styles['action-item']}>
                {selectedPost === post.id ? (
                  // ... Comment form and comments listing ...
                ) : (
                  <>
                    <Link to={`/full-post/${post.id}`} className={styles['read-more']}>
                      Read more
                    </Link>
                  </>
                )}
              </div>


// FullPost.js

import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/Slices/postsSlice';
import { useParams } from 'react-router-dom';

const FullPost = () => {
  const { postId } = useParams();
  const posts = useSelector(selectPosts);
  const post = posts.find((p) => p.id === postId);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default FullPost;

/* PostList.module.css */

/* Existing styles */

/* Add styles for the comment section */
.comment-section {
  margin-top: 16px;
}

.comment-form {
  display: flex;
  margin-top: 8px;
}

.comment-form input {
  flex-grow: 1;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 4px;
}

.comment-form button {
  padding: 4px 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  background-color: #f0f0f0;
  padding: 8px;
  margin-top: 8px;
  border-radius: 4px;
}
// PostList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, likePost, commentPost, editPost } from '../store/Slices/postsSlice';
import { selectIsAdmin } from '../store/Slices/authSlice';
import { Link } from 'react-router-dom';
import styles from '../Styles/PostList.module.css'; // Import the CSS module
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const PostList = () => {
  const posts = useSelector(selectPosts);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState(''); // Author name state

  const handleEdit = (post) => {
    setEditedPost({ ...post });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(editPost(editedPost));
    setIsEditing(false);
    setEditedPost({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost({});
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const handleComment = (postId) => {
    setSelectedPost(selectedPost === postId ? null : postId);
    setCommentText('');
    setCommentAuthor(''); // Clear the author name input
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      dispatch(
        commentPost({
          postId: selectedPost,
          text: commentText,
          author: commentAuthor, // Include the author name
          timestamp: new Date().toLocaleString(), // Include the timestamp
        })
      );
      setCommentText('');
      setCommentAuthor(''); // Clear the author name input
    }
  };

  const handleCancelComment = () => {
    setSelectedPost(null);
    setCommentText('');
    setCommentAuthor(''); // Clear the author name input
  };

  return (
    <div className={styles['post-list']}>
      <h2>Post List</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className={styles['post']} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p className={styles['created-at']}>Created At: {post.createdAt}</p>
            <div className={styles['actions']}>
              <div className={styles['action-item']}>
                {selectedPost !== post.id && (
                  <>
                    <button onClick={() => handleLike(post.id)}>
                      <FavoriteIcon /> Like
                    </button>
                    <span>{post.likes}</span>
                    {isAdmin && (
                      <button onClick={() => handleEdit(post)}>Edit</button>
                    )}
                  </>
                )}
              </div>
              <div className={styles['action-item']}>
                {selectedPost === post.id ? (
                  <div className={styles['comment-form']}>
                    <input
                      type="text"
                      placeholder="Your Name" // Author name input
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={handleCommentSubmit}>Submit</button>
                    <button onClick={handleCancelComment}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleComment(post.id)}>
                    <CommentIcon /> Comment
                  </button>
                )}
                <span>{post.comments.length}</span>
                {selectedPost === post.id && (
                  <ul className={styles['comment-list']}>
                    {post.comments.map((comment, index) => (
                      <li className={styles['comment-item']} key={index}>
                        <span className={styles['comment-text']}>{comment.text}</span>
                        <span className={styles['comment-author']}>Author: {comment.author}</span>
                        <span className={styles['comment-timestamp']}>Timestamp: {comment.timestamp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {isAdmin && selectedPost !== post.id && (
                <div className={styles['action-item']}>
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <Link to={`/full-post/${post.id}`}>Read more</Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
