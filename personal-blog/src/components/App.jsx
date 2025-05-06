import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';

const App = () => {
  return (
    <div>
      <header>
        <nav className="container">
          <h1>Personal Blog</h1>
          <div>
            <Link to="/" className="btn btn-light me-2">Home</Link>
            <Link to="/new" className="btn btn-primary">New Post</Link>
          </div>
        </nav>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;