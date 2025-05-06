# Personal Blog Application

A simple personal blog application with full CRUD functionality built with React and Express.

## Features

- View all blog posts
- View individual blog posts
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Responsive design

## Tech Stack

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Express
- **Data Storage:** JSON file (for simplicity)
- **Build Tools:** Webpack, Babel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

1. Build the frontend:

```bash
npm run dev
```

2. Start the server:

```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
```

## Project Structure

- `/public` - Static assets and compiled frontend code
- `/src` - React components and frontend code
- `/src/components` - React components
- `/src/data` - JSON data storage
- `server.js` - Express server with API endpoints

## API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a single blog post by ID
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update an existing blog post
- `DELETE /api/posts/:id` - Delete a blog post

## License

ISC