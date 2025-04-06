import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const SocialMediaManager = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    github: ''
  });

  // Fetch user's social media links
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/data/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenMail: token,
          }),
        });

        const data = await response.json();
        console.log('Dashboard data:', data);

        if (data.status === 'Okay') {
          // Additional fetch to get the social media data
          const socialsResponse = await fetch(`http://localhost:8080/get/socials/${data.userData.handle}`);
          const socialsData = await socialsResponse.json();
          console.log('Socials data:', socialsData);
          
          if (socialsData.status === 'success') {
            setSocialMedia(socialsData.socials || {
              facebook: '',
              twitter: '',
              instagram: '',
              youtube: '',
              linkedin: '',
              github: ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
        toast.error('Failed to load social media links');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean empty values
      const cleanedSocialMedia = {};
      Object.keys(socialMedia).forEach(key => {
        if (socialMedia[key] && socialMedia[key].trim() !== '') {
          cleanedSocialMedia[key] = socialMedia[key].trim();
        } else {
          cleanedSocialMedia[key] = '';
        }
      });

      console.log('Submitting social media update:', cleanedSocialMedia);

      const response = await fetch('http://localhost:8080/api/update-social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          socialMedia: cleanedSocialMedia
        }),
      });

      const data = await response.json();
      console.log('Response from update social media:', data);

      if (data.status === 'success') {
        setSocialMedia(data.socialMedia);
        toast.success('Social media links updated successfully!');
      } else {
        toast.error(data.error || 'Failed to update social media links');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error updating social media links:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (platform, value) => {
    setSocialMedia({
      ...socialMedia,
      [platform]: value
    });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading social media links...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                facebook.com/
              </span>
              <input
                type="text"
                id="facebook"
                value={socialMedia.facebook || ''}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                twitter.com/
              </span>
              <input
                type="text"
                id="twitter"
                value={socialMedia.twitter || ''}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                instagram.com/
              </span>
              <input
                type="text"
                id="instagram"
                value={socialMedia.instagram || ''}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
              YouTube
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                youtube.com/
              </span>
              <input
                type="text"
                id="youtube"
                value={socialMedia.youtube || ''}
                onChange={(e) => handleChange('youtube', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="channel"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                linkedin.com/in/
              </span>
              <input
                type="text"
                id="linkedin"
                value={socialMedia.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                github.com/
              </span>
              <input
                type="text"
                id="github"
                value={socialMedia.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Updating...' : 'Save Social Media Links'}
        </button>
      </form>
    </div>
  );
};

export default SocialMediaManager; 