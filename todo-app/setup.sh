#!/bin/bash

# Make this script executable
chmod +x setup.sh

# Install dependencies
echo "Installing dependencies..."
npm install

# Create a build for Electron
echo "Building the application..."
npm run build

echo ""
echo "Setup complete! You can now run:"
echo "npm run dev           - to start the web app development server"
echo "npm run dev:electron  - to start both the vite server and electron app together"
echo "npm run start         - to start just the Electron app (requires build first)"
echo "npm run package-mac   - to package the app for macOS"
echo ""
echo "The web application will be available at http://localhost:5173"
