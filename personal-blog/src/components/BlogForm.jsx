import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setFormData({
          title: data.title,
          content: data.content
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const url = isEditing ? `/api/posts/${id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      const data = await response.json();
      navigate(isEditing ? `/post/${data.id}` : '/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="post-form">
      <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here"
            rows="10"
          ></textarea>
        </div>
        
        <div className="btn-group">
          <button type="submit" className="btn btn-primary me-2">
            {isEditing ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(isEditing ? `/post/${id}` : '/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;