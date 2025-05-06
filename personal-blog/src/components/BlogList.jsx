import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>No blog posts yet</h2>
        <Link to="/new" className="btn btn-primary mt-3">Create your first post</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">All Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="blog-post">
          <h3>{post.title}</h3>
          <div className="post-date">
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div className="post-content">
            {post.content.length > 200
              ? `${post.content.substring(0, 200)}...`
              : post.content}
          </div>
          <div className="btn-group">
            <Link to={`/post/${post.id}`} className="btn btn-primary me-2">Read More</Link>
            <Link to={`/edit/${post.id}`} className="btn btn-secondary me-2">Edit</Link>
            <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;