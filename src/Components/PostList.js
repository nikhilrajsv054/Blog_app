// // PostList.js (with sample dummy data)
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPosts, likePost, commentPost } from '../store/Slices/postsSlice'; // Import actions and selectors
// import styles from '../Styles/PostList.module.css'; // Import the CSS module
// import dummyPosts from '../dummyData'; // Import the sample dummy data

// const PostList = () => {
//   const posts = useSelector(selectPosts); // Get posts from Redux store
//   const dispatch = useDispatch();

//   const handleLike = (postId) => {
//     dispatch(likePost(postId)); // Dispatch the likePost action
//   };

//   const handleComment = (postId, comment) => {
//     dispatch(commentPost({ postId, comment })); // Dispatch the commentPost action
//   };

//   return (
//     <div className={styles['post-list']}>
//       <h2>Post List</h2>
//       {dummyPosts.map((post) => (
//         <div className={styles['post']} key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.summary}</p>
//           <p className={styles['likes']}>Likes: {post.likes}</p>
//           <div className={styles['actions']}>
//             <button onClick={() => handleLike(post.id)}>Like</button>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Add a comment"
//                 onChange={(e) => {
//                   const comment = e.target.value;
//                   handleComment(post.id, comment);
//                 }}
//                 className={styles['comment-input']}
//               />
//               <button onClick={() => handleComment(post.id)} className={styles['comment-button']}>
//                 Comment
//               </button>
//             </div>
//           </div>
//           <ul className={styles['comment-list']}>
//             {post.comments.map((comment, index) => (
//               <li className={styles['comment-item']} key={index}>
//                 {comment}
//               </li>
//             ))}
//           </ul>
//           <p className={styles['genre']}>Genre: {post.genre}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;


// PostList.js (with sample dummy data)
// PostList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../store/Slices/postsSlice'; // Import your selector
import styles from '../Styles/PostList.module.css'; // Import your CSS module

const PostList = () => {
  const posts = useSelector(selectPosts);

  return (
    <div className={styles['post-list']}>
      <h2>Post List</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className={styles['post']} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <p className={styles['likes']}>Likes: {post.likes}</p>
            <div className={styles['actions']}>
              {/* Your like and comment buttons */}
            </div>
            {/* <ul className={styles['comment-list']}>
              {post.comments.map((comment, index) => (
                <li className={styles['comment-item']} key={index}>
                  {comment}
                </li>
              ))}
            </ul> */}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

