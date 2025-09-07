
const supabase = require('../supabaseClient');

const registerUser = async (req, res) => {
  const { handle, email, password, category } = req.body;
  try {
    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          handle,
          email,
          password,
          role: category,
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        // Unique violation
        return res.json({ message: 'Try a different handle or email', status: 'error' });
      }
      return res.json({ message: error.message, status: 'error' });
    }

    // Optionally, create a default link for the user
    if (data && data[0]) {
      await supabase.from('links').insert([
        {
          user_id: data[0].id,
          url: 'typefinance.com',
          title: 'typefinance',
          icon: '',
        },
      ]);
    }

    // Generate a simple token (for demo, use Supabase row id)
    const token = data && data[0] ? data[0].id : null;
    res.json({ message: 'user created', status: 'success', token, id: token });
  } catch (err) {
    res.json({ message: err.message, status: 'error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error) {
      return res.json({ message: error.message, status: 'error' });
    }

    if (!data || data.length === 0) {
      return res.json({ status: 'not found', error: 'Invalid credentials' });
    }

    // Use user id as token for demo
    const token = data[0].id;
    return res.json({ message: 'User found', status: 'success', token, id: token });
  } catch (err) {
    return res.json({ message: err.message, status: 'error' });
  }
};

module.exports = { registerUser, loginUser };
