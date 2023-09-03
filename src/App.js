// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostForm from './Components/PostForm'; 
import PostList from './Components/PostList';
import Login from './Components/Login';
import './App.css';
// Import your PostList component

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/post-form">Add Post</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <Routes>
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

