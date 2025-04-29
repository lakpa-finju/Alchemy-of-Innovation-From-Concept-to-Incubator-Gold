# Todo App

A versatile todo application that works both as a web app and desktop application (using Electron).

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Clear completed todos
- Persist todos to localStorage
- Run as a web application or native desktop app
- Package for macOS, Windows, or Linux

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Navigate to the project directory
2. Run the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This will install all necessary dependencies and build the application.

## Running the Application

### Web Application

To start the development server for the web app:

```bash
npm run dev
```

This will open the application in your default browser at http://localhost:5173.

### Desktop Application

To run both the Vite dev server and Electron app together (recommended for development):

```bash
npm run dev:electron
```

To run just the Electron app (requires building first):

```bash
npm run build  # If you haven't built the app yet
npm run start
```

## Packaging the Desktop Application

To create a packaged application for macOS:

```bash
npm run package-mac
```

For Windows:

```bash
npm run package-win
```

For Linux:

```bash
npm run package-linux
```

The packaged applications will be placed in the `dist` folder.

## Project Structure

- `src/` - React components and application logic
- `src/components/` - Individual React components
- `styles.css` - Application styling
- `main.js` - Electron main process
- `icons/` - Application icons

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. If the application doesn't open automatically, navigate to http://localhost:5173 in your browser

3. If the Electron app doesn't show the todo application, make sure the Vite server is running and check the Electron dev tools for errors
