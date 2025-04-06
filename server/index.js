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

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/linkTree-9')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send("Hello");
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
