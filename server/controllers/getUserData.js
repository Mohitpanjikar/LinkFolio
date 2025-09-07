
const supabase = require('../supabaseClient');

const getUserData = async (req, res) => {
  const handle = req.params.handle;
  try {
    // Get user by handle
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('handle', handle)
      .single();
    if (error || !user) {
      return res.json({ status: 'error', error: 'User not found' });
    }
    // Get links for user
    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);
    const userData = {
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      links: links || []
    };
    return res.json({ message: 'found', userData, status: 'success' });
  } catch (err) {
    return res.json({ status: 'error', error: err.message });
  }
};

const getUserSocials = async (req, res) => {
  const handle = req.params.handle;
  try {
    // Get user by handle
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('handle', handle)
      .single();
    if (error || !user) {
      return res.json({ status: 'error', error: 'User not found' });
    }
    // Get social media for user
    const { data: socials, error: smError } = await supabase
      .from('social_media')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (smError || !socials) {
      return res.json({ status: 'error', error: 'Social media not found' });
    }
    return res.json({ message: 'found', socials, status: 'success' });
  } catch (err) {
    return res.json({ status: 'error', error: err.message });
  }
};

module.exports = { getUserData, getUserSocials };
