import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? 'Post not found' 
            : 'Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3">
        {error}
        <div className="mt-3">
          <Link to="/" className="btn btn-primary">Back to Blog List</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="alert alert-warning mt-3">
        Post not found
        <div className="mt-3">
          <Link to="/" className="btn btn-primary">Back to Blog List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <div className="post-date">
        {new Date(post.date).toLocaleDateString()}
        {post.updated && ` (Updated: ${new Date(post.updated).toLocaleDateString()})`}
      </div>
      <div className="post-content">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="btn-group">
        <Link to="/" className="btn btn-primary me-2">Back to Blog List</Link>
        <Link to={`/edit/${post.id}`} className="btn btn-secondary me-2">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default BlogPost;