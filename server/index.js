const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
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

// Updated CORS configuration to work with deployed frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN ? 
    process.env.CORS_ORIGIN.split(',') : 
    ['http://localhost:3000', 'https://linkfolio.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Updated MongoDB connection to use environment variable for deployment flexibility
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/linkTree-9';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.get('/', (req, res) => {
  res.send("LinkFolio API is running");
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

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
