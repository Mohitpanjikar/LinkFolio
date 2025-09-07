import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

// Dashboard component with improved UI
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [links, setLinks] = useState([]);
  const [socialMedia, setSocialMedia] = useState({});
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Set the origin for client-side only
    setOrigin(window.location.origin);
    
    // Check for token and fetch data
    const token = localStorage.getItem('LinkTreeToken');
    if (!token) {
      router.replace('/login');
      return;
    }
    setToken(token);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/data/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tokenMail: token }),
        });
        const data = await response.json();
        if (data.status === 'error' || !data.userData) {
          localStorage.removeItem('LinkTreeToken');
          router.replace('/login');
          return;
        }
        if (data.status === 'Okay') {
          setUserData(data.userData);
          localStorage.setItem('userHandle', data.userData.handle);
          await fetchLinks(data.userData.handle);
          await fetchSocialMedia(data.userData.handle);
        }
      } catch (error) {
        localStorage.removeItem('LinkTreeToken');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);
  
  const fetchLinks = async (handle) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/get/${handle}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setLinks(data.userData.links || []);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };
  
  const fetchSocialMedia = async (handle) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/get/socials/${handle}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setSocialMedia(data.socials || {});
      }
    } catch (error) {
      console.error('Error fetching social media:', error);
    }
  };

  // Profile update functionality
  const updateProfile = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          ...formData
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Profile updated successfully!');
        setUserData(prev => ({
          ...prev,
          ...data.userData
        }));
        return true;
      } else {
        toast.error(data.error || 'Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  // Link management functions
  const addLink = async (linkData) => {
    try {
      const response = await fetch('http://localhost:8080/api/add-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          ...linkData
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Link added successfully!');
        setLinks(data.links);
        return true;
      } else {
        toast.error(data.error || 'Failed to add link');
        return false;
      }
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  const updateLink = async (linkId, linkData) => {
    try {
      const response = await fetch('http://localhost:8080/api/update-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          linkId,
          ...linkData
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Link updated successfully!');
        setLinks(data.links);
        return true;
      } else {
        toast.error(data.error || 'Failed to update link');
        return false;
      }
    } catch (error) {
      console.error('Error updating link:', error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  const deleteLink = async (linkId) => {
    try {
      const response = await fetch('http://localhost:8080/api/delete-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          linkId
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Link deleted successfully!');
        setLinks(data.links);
        return true;
      } else {
        toast.error(data.error || 'Failed to delete link');
        return false;
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  // Social media management
  const updateSocialMedia = async (socialMediaData) => {
    try {
      const response = await fetch('http://localhost:8080/api/update-social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenMail: token,
          socialMedia: socialMediaData
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Social media updated successfully!');
        setSocialMedia(data.socialMedia);
        return true;
      } else {
        toast.error(data.error || 'Failed to update social media');
        return false;
      }
    } catch (error) {
      console.error('Error updating social media:', error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  // Render dashboard UI with improved styling
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
          <div className="h-2 bg-gray-200 rounded w-12"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-gray-800 mb-4">Session Expired</h2>
        <p className="text-gray-600 mb-6 text-center">Your session has expired or you're not logged in.</p>
        <Link href="/login" className="btn-primary">
          Login Again
        </Link>
      </div>
    );
  }

  // Generate the profile URL
  const profileUrl = origin ? `${origin}/${userData.handle}` : `/${userData.handle}`;

  // Tab content components
  const renderOverviewTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Welcome, {userData.name || userData.handle}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Your Profile</h3>
          <p>Handle: {userData.handle}</p>
          <p>Links: {links.length || 0}</p>
          <p>Role: {userData.role}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Your LinkFolio URL</h3>
          <p className="mb-2">Share your LinkFolio page:</p>
          <div className="flex items-center">
            <span className="text-indigo-600 mr-2">{profileUrl}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(profileUrl);
                toast.success('URL copied to clipboard!');
              }}
              className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <Link href={`/${userData.handle}`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          View My Page
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('LinkTreeToken');
            localStorage.removeItem('userHandle');
            router.push('/login');
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Edit Profile</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const bio = e.target.bio.value;
        const avatar = e.target.avatar.value;
        updateProfile({ name, bio, avatar });
      }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={userData.name || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            name="bio" 
            defaultValue={userData.bio || ''}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input 
            type="text" 
            name="avatar" 
            defaultValue={userData.avatar || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {userData.avatar && (
          <div className="mb-4 flex justify-center">
            <img 
              src={userData.avatar} 
              alt="Avatar preview" 
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
            />
          </div>
        )}
        
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Save Profile
        </button>
      </form>
    </div>
  );

  const renderLinksTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Manage Links</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const url = e.target.url.value;
        const title = e.target.title.value;
        const icon = e.target.icon.value;
        addLink({ url, title, icon });
        e.target.reset();
      }} className="mb-8">
        <h3 className="text-md font-semibold mb-3">Add New Link</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Link Title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="url"
              name="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL (optional)</label>
            <input
              type="text"
              name="icon"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/icon.png"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Add Link
        </button>
      </form>

      <div>
        <h3 className="text-md font-semibold mb-3">Your Links</h3>
        {links.length === 0 ? (
          <p className="text-gray-500">You haven't added any links yet.</p>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link._id} className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center mb-2">
                  {link.icon && (
                    <img src={link.icon} alt="Icon" className="w-6 h-6 mr-2" />
                  )}
                  <h4 className="text-lg font-medium">{link.title}</h4>
                </div>
                <p className="text-gray-500 mb-3 truncate">{link.url}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const newUrl = prompt("Enter new URL:", link.url);
                      const newTitle = prompt("Enter new title:", link.title);
                      const newIcon = prompt("Enter new icon URL:", link.icon);
                      if (newUrl && newTitle) {
                        updateLink(link._id, {
                          url: newUrl,
                          title: newTitle,
                          icon: newIcon || ""
                        });
                      }
                    }}
                    className="py-1 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this link?")) {
                        deleteLink(link._id);
                      }
                    }}
                    className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Social Media Links</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const facebook = e.target.facebook.value;
        const twitter = e.target.twitter.value;
        const instagram = e.target.instagram.value;
        const youtube = e.target.youtube.value;
        const linkedin = e.target.linkedin.value;
        const github = e.target.github.value;
        
        updateSocialMedia({
          facebook,
          twitter,
          instagram,
          youtube,
          linkedin,
          github
        });
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                facebook.com/
              </span>
              <input
                type="text"
                name="facebook"
                defaultValue={socialMedia.facebook || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                twitter.com/
              </span>
              <input
                type="text"
                name="twitter"
                defaultValue={socialMedia.twitter || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                instagram.com/
              </span>
              <input
                type="text"
                name="instagram"
                defaultValue={socialMedia.instagram || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                youtube.com/
              </span>
              <input
                type="text"
                name="youtube"
                defaultValue={socialMedia.youtube || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="channel"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                linkedin.com/in/
              </span>
              <input
                type="text"
                name="linkedin"
                defaultValue={socialMedia.linkedin || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                github.com/
              </span>
              <input
                type="text"
                name="github"
                defaultValue={socialMedia.github || ''}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Save Social Media Links
        </button>
      </form>
    </div>
  );

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'links':
        return renderLinksTab();
      case 'social':
        return renderSocialTab();
      default:
        return renderOverviewTab();
    }
  };

  // Main dashboard return
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
              {userData.name ? userData.name.charAt(0).toUpperCase() : userData.handle.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-heading font-medium text-gray-900">
                {userData.name || userData.handle}
              </h2>
              <p className="text-gray-500 text-sm">@{userData.handle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link 
              href={`/${userData.handle}`} 
              target="_blank" 
              className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
            >
              <span className="hidden md:inline-block mr-1">View Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <button 
              onClick={() => { localStorage.removeItem('LinkTreeToken'); router.push('/login'); }}
              className="btn-secondary text-sm py-1.5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'links' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Manage Links
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'social' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              Social Media
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Dashboard;
