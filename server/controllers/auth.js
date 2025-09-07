
const supabase = require('../supabaseClient');

const registerUser = async (req, res) => {
  const { handle, email, password, category } = req.body;
  try {
    // Validate input
    if (!handle || !email || !password || !category) {
      return res.json({ message: 'All fields are required', status: 'error' });
    }

    // Normalize and validate handle
    const normalizedHandle = handle.toLowerCase().trim();
    if (normalizedHandle.length < 3) {
      return res.json({ message: 'Username must be at least 3 characters', status: 'error' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(normalizedHandle)) {
      return res.json({ message: 'Username can only contain letters, numbers, and underscores', status: 'error' });
    }

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          handle: normalizedHandle,
          email: email.toLowerCase().trim(),
          password,
          role: category,
        },
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        // Unique violation - check which field
        if (error.message.includes('handle')) {
          return res.json({ message: 'Username already taken. Please try a different handle.', status: 'error' });
        } else if (error.message.includes('email')) {
          return res.json({ message: 'Email already registered. Please try logging in instead.', status: 'error' });
        } else {
          return res.json({ message: 'Username or email already exists. Please try different values.', status: 'error' });
        }
      }
      return res.json({ message: error.message, status: 'error' });
    }

    // Optionally, create a default link for the user
    if (data && data[0]) {
      await supabase.from('links').insert([
        {
          user_id: data[0].id,
          url: 'https://linkfolio.com',
          title: 'Welcome to LinkFolio',
          icon: '',
        },
      ]);
    }

    // Generate a simple token (for demo, use Supabase row id)
    const token = data && data[0] ? data[0].id : null;
    res.json({ message: 'user created', status: 'success', token, id: token });
  } catch (err) {
    console.error('Registration error:', err);
    res.json({ message: 'Internal server error. Please try again.', status: 'error' });
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
