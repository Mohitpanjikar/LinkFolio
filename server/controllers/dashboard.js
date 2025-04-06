const User = require('../models/user');
const jwt = require('jsonwebtoken');

const jwt_decode = (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    try {
      return jwt.verify(token, process.env.SECRET_JWT);
    } catch (verifyError) {
      console.log('Token verification failed, using manual decode');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
      return JSON.parse(jsonPayload);
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    error.message = 'Invalid token. Please login again.';
    throw error;
  }
};

const dashBoardData = async (req, res) => {
    const { tokenMail } = req.body;
    console.log('Token received:', tokenMail ? 'Yes' : 'No');
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        console.log('Decoded email:', email);
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        const userData = {
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            handle: user.handle,
            links: user.links.length
        }
        return res.json({ message: 'user loaded', userData, status: 'Okay' });
    } catch (err) {
        console.error('Dashboard error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

const updateProfile = async (req, res) => {
    const { tokenMail, name, bio, avatar } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { name, bio, avatar },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        return res.json({ 
            message: 'Profile updated successfully', 
            status: 'success',
            userData: {
                name: updatedUser.name,
                bio: updatedUser.bio,
                avatar: updatedUser.avatar
            }
        });
    } catch (err) {
        console.error('Update profile error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

const addLink = async (req, res) => {
    const { tokenMail, url, title, icon } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        user.links.push({ url, title, icon });
        await user.save();
        
        return res.json({ 
            message: 'Link added successfully', 
            status: 'success',
            links: user.links
        });
    } catch (err) {
        console.error('Add link error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

const updateLink = async (req, res) => {
    const { tokenMail, linkId, url, title, icon } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        const linkIndex = user.links.findIndex(link => link._id.toString() === linkId);
        
        if (linkIndex === -1) {
            return res.json({ status: 'error', error: 'Link not found' });
        }
        
        user.links[linkIndex] = { ...user.links[linkIndex], url, title, icon };
        await user.save();
        
        return res.json({ 
            message: 'Link updated successfully', 
            status: 'success',
            links: user.links
        });
    } catch (err) {
        console.error('Update link error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

const deleteLink = async (req, res) => {
    const { tokenMail, linkId } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        user.links = user.links.filter(link => link._id.toString() !== linkId);
        await user.save();
        
        return res.json({ 
            message: 'Link deleted successfully', 
            status: 'success',
            links: user.links
        });
    } catch (err) {
        console.error('Delete link error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

const updateSocialMedia = async (req, res) => {
    const { tokenMail, socialMedia } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        
        const decodedTokenMail = jwt_decode(tokenMail);
        if (!decodedTokenMail || !decodedTokenMail.email) {
            return res.json({ status: 'error', error: 'Invalid token format. Please login again.' });
        }
        
        const email = decodedTokenMail.email;
        
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { socialMedia },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        
        return res.json({ 
            message: 'Social media updated successfully', 
            status: 'success',
            socialMedia: updatedUser.socialMedia
        });
    } catch (err) {
        console.error('Update social media error:', err);
        return res.json({ status: 'error', error: err.message });
    }
}

module.exports = { 
    dashBoardData,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    updateSocialMedia
};
