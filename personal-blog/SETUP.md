# Personal Blog Setup Guide

This guide will help you get the personal blog application up and running.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/lakpasherpa/git/Alchemy-of-Innovation-From-Concept-to-Incubator-Gold/personal-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with auto-reload)

To run the application in development mode with auto-reload of the frontend:
```bash
npm run dev:full
```

This will:
- Start the Express server on port 3000
- Watch for changes to React components and rebuild automatically

### Production Mode

To build the production version and start the server:
```bash
npm run build
npm start
```

## Access the Application

Once the server is running, open your browser and go to:
```
http://localhost:3000
```

## Features

- View all blog posts on the home page
- Click on a post to view the full content
- Create new posts using the "New Post" button
- Edit posts using the "Edit" button on each post
- Delete posts using the "Delete" button

## Data Storage

All blog posts are stored in:
```
/src/data/blogPosts.json
```

The data is automatically initialized with sample posts if the file doesn't exist.

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is properly installed:
   ```bash
   node -v
   ```

2. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

3. Check for any error messages in the console