
// -- Edit Button
// // PostList.js
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPosts, likePost, commentPost } from '../store/Slices/postsSlice';
// import { selectIsAdmin } from '../store/Slices/authSlice'; // Import the selectIsAdmin selector
// import styles from '../Styles/PostList.module.css';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentIcon from '@material-ui/icons/Comment';

// const PostList = () => {
//   const posts = useSelector(selectPosts);
//   const isAdmin = useSelector(selectIsAdmin); // Get the user's role
//   const dispatch = useDispatch();

//   const handleLike = (postId) => {
//     dispatch(likePost(postId));
//   };

//   const handleComment = (postId) => {
//     dispatch(commentPost({ postId, comment: 'Sample comment' }));
//   };

//   return (
//     <div className={styles['post-list']}>
//       <h2>Post List</h2>
//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div className={styles['post']} key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p className={styles['created-at']}>Created At: {post.createdAt}</p>
//             <div className={styles['actions']}>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleLike(post.id)}>
//                   <FavoriteIcon /> Like
//                 </button>
//                 <span>{post.likes}</span>
//               </div>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleComment(post.id)}>
//                   <CommentIcon /> Comment
//                 </button>
//                 <span>{post.comments.length}</span>
//               </div>
//               {isAdmin && ( // Display the Edit button only if the user is an admin
//                 <div className={styles['action-item']}>
//                   <button>Edit</button>
//                 </div>
//               )}
//             </div>
//             {/* Rest of the code... */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;

// -- Edit Button Implement 

// PostList.js
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPosts, likePost, commentPost, editPost } from '../store/Slices/postsSlice'; // Import editPost action
// import { selectIsAdmin } from '../store/Slices/authSlice';
// import styles from '../Styles/PostList.module.css';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentIcon from '@material-ui/icons/Comment';

// const PostList = () => {
//   const posts = useSelector(selectPosts);
//   const isAdmin = useSelector(selectIsAdmin);
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false); // Add state to track editing mode
//   const [editedPost, setEditedPost] = useState({}); // Add state to store edited post

//   const handleEdit = (post) => {
//     setEditedPost({ ...post }); // Set the edited post
//     setIsEditing(true); // Enter editing mode
//   };

//   const handleSaveEdit = () => {
//     dispatch(editPost(editedPost)); // Dispatch the editPost action with the edited post
//     setIsEditing(false); // Exit editing mode
//     setEditedPost({}); // Clear the edited post
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false); // Exit editing mode
//     setEditedPost({}); // Clear the edited post
//   };

//   const handleLike = (postId) => {
//     dispatch(likePost(postId));
//   };

//   const handleComment = (postId) => {
//     dispatch(commentPost({ postId, comment: 'Sample comment' }));
//   };

//   return (
//     <div className={styles['post-list']}>
//       <h2>Post List</h2>
//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div className={styles['post']} key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p className={styles['created-at']}>Created At: {post.createdAt}</p>
//             <div className={styles['actions']}>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleLike(post.id)}>
//                   <FavoriteIcon /> Like
//                 </button>
//                 <span>{post.likes}</span>
//               </div>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleComment(post.id)}>
//                   <CommentIcon /> Comment
//                 </button>
//                 <span>{post.comments.length}</span>
//               </div>
//               {isAdmin && (
//                 <div className={styles['action-item']}>
//                   {isEditing ? (
//                     <>
//                       <button onClick={handleSaveEdit}>Save</button>
//                       <button onClick={handleCancelEdit}>Cancel</button>
//                     </>
//                   ) : (
//                     <button onClick={() => handleEdit(post)}>Edit</button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;


// PostList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, likePost, commentPost } from '../store/Slices/postsSlice';
import styles from '../Styles/PostList.module.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const PostList = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const handleComment = (postId, comment) => {
    dispatch(commentPost({ postId, comment }));
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
            <p>{post.content}</p> {/* Display the content of the post */}
            <p className={styles['created-at']}>Created At: {post.createdAt}</p> {/* Display the createdAt field */}
            <div className={styles['actions']}>
              <div className={styles['action-item']}>
                <button onClick={() => handleLike(post.id)}>
                  <FavoriteIcon /> Like
                </button>
                <span>{post.likes}</span>
              </div>
              <div className={styles['action-item']}>
                <button onClick={() => handleComment(post.id)}>
                  <CommentIcon /> Comment
                </button>
                <span>{post.comments.length}</span>
              </div>
            </div>
            <ul className={styles['comment-list']}>
              {post.comments.map((comment, index) => (
                <li className={styles['comment-item']} key={index}>
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

