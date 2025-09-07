const express = require('express');
const app = express();
const cors = require('cors');
const { registerUser, loginUser } = require('./controllers/auth');
const {
  dashBoardData,
  updateProfile,
  addLink,
  updateLink,
  deleteLink,
  updateSocialMedia
} = require('./controllers/dashboard');
const {getUserData,getUserSocials} = require('./controllers/getUserData');
require('dotenv').config();

// Security and CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CORS_ORIGIN ? 
      process.env.CORS_ORIGIN.split(',').map(url => url.trim()) : 
      ['http://localhost:3000', 'https://linkfolio.netlify.app'];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/', (req, res) => {
  res.json({ 
    message: "LinkFolio API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Dashboard routes
app.post('/data/dashboard', dashBoardData);
app.post('/api/update-profile', updateProfile);
app.post('/api/add-link', addLink);
app.post('/api/update-link', updateLink);
app.post('/api/delete-link', deleteLink);
app.post('/api/update-social-media', updateSocialMedia);

// Public profile routes
app.get('/get/:handle', getUserData);
app.get('/get/socials/:handle', getUserSocials);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ status: 'error', error: 'Route not found' });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
