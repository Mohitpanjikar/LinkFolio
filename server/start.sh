# Render Deployment Script
echo "Starting LinkFolio Backend on Render..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies
npm install

# Start the server
echo "Starting server on port $PORT"
npm start
