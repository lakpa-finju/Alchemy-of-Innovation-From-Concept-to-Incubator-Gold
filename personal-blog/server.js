const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path to our blog posts data file
const DATA_PATH = path.join(__dirname, 'src/data/blogPosts.json');

// Helper to read posts
const getBlogPosts = () => {
  if (!fs.existsSync(DATA_PATH)) {
    return [];
  }
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data);
};

// Helper to write posts
const saveBlogPosts = (posts) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), 'utf8');
};

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_PATH)) {
  const initialPosts = [
    {
      id: 1,
      title: 'First Blog Post',
      content: 'This is the content of my first blog post.',
      date: new Date().toISOString()
    }
  ];
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  saveBlogPosts(initialPosts);
}

// API Routes
const apiRouter = express.Router();

// GET all blog posts
apiRouter.get('/posts', (req, res) => {
  const posts = getBlogPosts();
  res.json(posts);
});

// GET a single post by ID
apiRouter.get('/posts/:id', (req, res) => {
  const posts = getBlogPosts();
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

// POST a new blog post
apiRouter.post('/posts', (req, res) => {
  const posts = getBlogPosts();
  const newPost = {
    id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString()
  };
  
  posts.push(newPost);
  saveBlogPosts(posts);
  
  res.status(201).json(newPost);
});

// PUT (update) a blog post
apiRouter.put('/posts/:id', (req, res) => {
  const posts = getBlogPosts();
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    title: req.body.title || posts[postIndex].title,
    content: req.body.content || posts[postIndex].content,
    updated: new Date().toISOString()
  };
  
  saveBlogPosts(posts);
  res.json(posts[postIndex]);
});

// DELETE a blog post
apiRouter.delete('/posts/:id', (req, res) => {
  const posts = getBlogPosts();
  const postId = parseInt(req.params.id);
  const newPosts = posts.filter(p => p.id !== postId);
  
  if (newPosts.length === posts.length) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  saveBlogPosts(newPosts);
  res.json({ message: 'Post deleted successfully' });
});

// Use the API router
app.use('/api', apiRouter);

// Serve the React app for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});