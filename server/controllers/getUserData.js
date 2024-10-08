const User = require('../models/user');

const getUserData = async (req, res) => {
  const handle = req.params.handle;
  try {
    const user = await User.findOne({ handle: handle });
    console.log(user);
    const userData = {
      name: user.handle,
      avatar: user.avatar,
      bio: user.bio,
      links: user.links,
    };

    return res.json({ message: 'found', userData, status: 'success' });
  } catch (err) {
    console.log(err);
    return res.json({ status: 'error', error: err.message });
  }
};


const getUserSocials = async (req,res) => {
    const handle = req.params.handle;
    try {
        console.log(handle);
        const user = await User.findOne({handle:handle});
        const socials = user.socialMedia; 
        return res.json({message: 'found',socials,status:'success'})

    } catch (err) {
        return res.json({status:'error', error:err.message });
    }
}

module.exports = { getUserData,getUserSocials };
