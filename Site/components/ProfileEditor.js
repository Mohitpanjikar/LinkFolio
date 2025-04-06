import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProfileEditor = ({ userData, setUserData, token }) => {
  const [name, setName] = useState(userData?.name || '');
  const [bio, setBio] = useState(userData?.bio || '');
  const [avatar, setAvatar] = useState(userData?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate the form data
    if (!name.trim()) {
      toast.warning('Please enter a name');
      setIsLoading(false);
      return;
    }

    // Add default avatar if none is provided
    const finalAvatar = avatar || 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png';

    try {
      console.log('Submitting profile update:', { name, bio, avatar: finalAvatar, token });

      const response = await fetch('http://localhost:8080/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          name,
          bio,
          avatar: finalAvatar
        }),
      });

      const data = await response.json();
      console.log('Profile update response:', data);

      if (data.status === 'success') {
        toast.success('Profile updated successfully!');
        setUserData((prev) => ({ 
          ...prev, 
          name: data.userData.name,
          bio: data.userData.bio,
          avatar: data.userData.avatar
        }));
      } else {
        toast.error(data.error || 'Failed to update profile');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Your name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tell us about yourself"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/your-avatar.png"
          />
        </div>
        
        {avatar && (
          <div className="mb-4 flex justify-center">
            <img 
              src={avatar} 
              alt="Avatar preview" 
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
            />
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditor; 