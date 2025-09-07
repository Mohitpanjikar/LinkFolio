
const supabase = require('../supabaseClient');

const dashBoardData = async (req, res) => {
    const { tokenMail } = req.body;
    try {
        if (!tokenMail) {
            return res.json({ status: 'error', error: 'No token provided. Please login again.' });
        }
        // Use tokenMail as user id
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', tokenMail)
          .single();
        if (error || !data) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        // Get links count
        const { count } = await supabase
          .from('links')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', tokenMail);
        const userData = {
            name: data.name,
            role: data.role,
            avatar: data.avatar,
            handle: data.handle,
            links: count || 0
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
        // Update user profile in Supabase
        const { data, error } = await supabase
          .from('users')
          .update({ name, bio, avatar })
          .eq('id', tokenMail)
          .select();
        if (error || !data || !data[0]) {
            return res.json({ status: 'error', error: 'User not found. Please login again.' });
        }
        return res.json({ 
            message: 'Profile updated successfully', 
            status: 'success',
            userData: {
                name: data[0].name,
                bio: data[0].bio,
                avatar: data[0].avatar
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
        // Add link in Supabase
        const { data, error } = await supabase
          .from('links')
          .insert([
            { user_id: tokenMail, url, title, icon }
          ])
          .select();
        if (error) {
            return res.json({ status: 'error', error: error.message });
        }
        // Get all links for user
        const { data: links } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', tokenMail);
        return res.json({ 
            message: 'Link added successfully', 
            status: 'success',
            links
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
        // Update link in Supabase
        const { data, error } = await supabase
          .from('links')
          .update({ url, title, icon })
          .eq('id', linkId)
          .eq('user_id', tokenMail)
          .select();
        if (error) {
            return res.json({ status: 'error', error: error.message });
        }
        // Get all links for user
        const { data: links } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', tokenMail);
        return res.json({ 
            message: 'Link updated successfully', 
            status: 'success',
            links
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
        // Delete link in Supabase
        const { error } = await supabase
          .from('links')
          .delete()
          .eq('id', linkId)
          .eq('user_id', tokenMail);
        if (error) {
            return res.json({ status: 'error', error: error.message });
        }
        // Get all links for user
        const { data: links } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', tokenMail);
        return res.json({ 
            message: 'Link deleted successfully', 
            status: 'success',
            links
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
        // Update social media in Supabase
        const { data, error } = await supabase
          .from('social_media')
          .upsert({ user_id: tokenMail, ...socialMedia })
          .eq('user_id', tokenMail)
          .select();
        if (error) {
            return res.json({ status: 'error', error: error.message });
        }
        return res.json({ 
            message: 'Social media updated successfully', 
            status: 'success',
            socialMedia: data && data[0] ? data[0] : socialMedia
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
