import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Head from 'next/head';
import { API_ENDPOINTS } from '../utils/apiConfig';

// Platform icon mapping
const platformIcons = {
  linkedin: {
    url: 'https://linkedin.com/in/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.937v5.669H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
      </svg>
    )
  },
  github: {
    url: 'https://github.com/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
      </svg>
    )
  },
  twitter: {
    url: 'https://twitter.com/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.634 4.031c-.815.385-2.22 1.107-3.448 1.295-.122.14-.122.257-.122.515 0 4.294-2.938 8.463-8.026 8.463-1.528 0-3.057-.449-4.339-1.198.613.152 1.225.228 1.838.228 3.203 0 6.16-1.198 8.396-3.209-3.08-.152-5.529-2.294-6.318-5.249.47.089.937.151 1.404.151.55 0 1.1-.089 1.649-.23-3.202-.613-5.607-3.445-5.607-6.927 0-.089 0-.089 0-.089.957.535 2.017.857 3.02.906-1.955-1.344-3.142-3.596-3.142-6.059 0-1.341.328-2.601 1.05-3.677 3.45 4.294 8.674 7.138 14.495 7.48-.153-.536-.153-1.107-.153-1.662C21.634 5.5 23.022 4 24.86 4c.956 0 1.83.43 2.45 1.046.765-.152 1.53-.429 2.142-.781-.245.766-.766 1.413-1.441 1.84.678-.089 1.356-.306 1.989-.537-.55.663-1.223 1.245-1.989 1.724.123 13.01-9.157 23.602-22.063 23.602C2.628 31.104 1.3 24.733 1.3 19.24c0-.378 0-.742.034-1.114.877.69 1.884 1.246 3.056 1.624z"></path>
      </svg>
    )
  },
  instagram: {
    url: 'https://instagram.com/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C9.284 2 8.944 2.01 7.877 2.058c-1.064.048-1.79.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.523 5.45c-.248.636-.417 1.363-.465 2.427C2.01 8.944 2 9.284 2 12s.01 3.056.058 4.123c.048 1.064.218 1.79.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.248 1.363.417 2.427.465 1.067.048 1.407.058 4.123.058s3.056-.01 4.123-.058c1.064-.048 1.79-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.248-.636.417-1.363.465-2.427.048-1.067.058-1.407.058-4.123s-.01-3.056-.058-4.123c-.048-1.064-.218-1.79-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0018.55 2.523c-.636-.248-1.363-.417-2.427-.465C15.056 2.01 14.716 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.182.8.399 1.15.748.35.35.566.684.748 1.15.136.353.3.882.344 1.858.048 1.054.058 1.37.058 4.04s-.01 2.986-.058 4.04c-.045.976-.207 1.505-.344 1.858a3.1 3.1 0 01-.748 1.15c-.35.35-.684.566-1.15.748-.353.136-.882.3-1.858.344-1.054.048-1.37.058-4.04.058s-2.986-.01-4.04-.058c-.976-.045-1.505-.207-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.136-.353-.3-.882-.344-1.858-.048-1.054-.058-1.37-.058-4.04s.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.136.882-.3 1.858-.344 1.054-.048 1.37-.058 4.04-.058zm0 3.063a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.469a3.333 3.333 0 110-6.667 3.333 3.333 0 010 6.667zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path>
      </svg>
    )
  },
  facebook: {
    url: 'https://facebook.com/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path>
      </svg>
    )
  },
  youtube: {
    url: 'https://youtube.com/',
    icon: (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.53 0-9.4.501a3.008 3.008 0 00-2.089 2.089A31.258 31.26 0 000 12.01a31.258 31.26 0 00.523 5.806 3.008 3.008 0 002.089 2.089c1.87.501 9.4.501 9.4.501s7.53 0 9.4-.501a3.008 3.008 0 002.089-2.089 31.258 31.26 0 00.5-5.806 31.258 31.26 0 00-.5-5.806zM9.609 15.601V8.408l6.264 3.602z"></path>
      </svg>
    )
  }
};

// Function to detect platform icon based on URL
const detectPlatformIcon = (url) => {
  if (!url) return null;
  
  const lowerUrl = url.toLowerCase();
  let platform = null;
  
  if (lowerUrl.includes('linkedin.com') || lowerUrl.includes('linkedin')) {
    platform = 'linkedin';
  } else if (lowerUrl.includes('github.com') || lowerUrl.includes('github')) {
    platform = 'github';
  } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) {
    platform = 'twitter';
  } else if (lowerUrl.includes('instagram.com') || lowerUrl.includes('instagram')) {
    platform = 'instagram';
  } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('facebook') || lowerUrl.includes('fb.com')) {
    platform = 'facebook';
  } else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtube')) {
    platform = 'youtube';
  }
  
  if (platform && platformIcons[platform]) {
    return platformIcons[platform].icon;
  }
  
  return null;
};

const Handle = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [socialMedia, setSocialMedia] = useState({});
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    if (router.query?.handle) {
      // Fetch user data
      fetch(API_ENDPOINTS.getUserData(router.query.handle))
        .then(res => res.json())
        .then(data => {
          if (data.status === 'error') {
            console.error(data.error);
            return;
          }
          if (data.status === 'success') {
            setUserData(data.userData);
            setUserFound(true);
          }
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });

      // Fetch social media data
      fetch(API_ENDPOINTS.getUserSocials(router.query.handle))
        .then(res => res.json())
        .then(data => {
          if (data.status === 'error') {
            console.error(data.error);
            return;
          }
          if (data.status === 'success') {
            setSocialMedia(data.socials);
          }
        })
        .catch(err => {
          console.error('Error fetching social media:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.query]);

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userData.name || userData.handle}'s LinkFolio`,
        text: `Check out ${userData.name || userData.handle}'s LinkFolio page!`,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers without navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-3 text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userFound) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="font-bold text-xl mb-2">User Not Found</h1>
          <p className="mb-4">The profile you're looking for doesn't exist or may have been removed.</p>
          <Link href="/" className="inline-block bg-black px-4 py-2 rounded text-white hover:bg-gray-800 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{userData.name || userData.handle}'s LinkFolio</title>
        <meta name="description" content={userData.bio || `Check out ${userData.name || userData.handle}'s links!`} />
        <meta property="og:title" content={`${userData.name || userData.handle}'s LinkFolio`} />
        <meta property="og:description" content={userData.bio || `Check out ${userData.name || userData.handle}'s links!`} />
        {userData.avatar && <meta property="og:image" content={userData.avatar} />}
      </Head>

      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="min-h-screen bg-white pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-10">
            {userData.avatar ? (
              <div className="mb-6">
                <img 
                  src={userData.avatar} 
                  alt={userData.name || userData.handle} 
                  className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-black shadow-sm"
                />
              </div>
            ) : (
              <div className="mb-6">
                <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mx-auto border-2 border-black">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{userData.name || userData.handle}</h1>
            {userData.bio && <p className="text-gray-600 mt-3 max-w-sm mx-auto">{userData.bio}</p>}
            
            {/* Share Button */}
            <button 
              onClick={handleShare}
              className="mt-6 bg-black text-white px-6 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-all inline-flex items-center mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
              </svg>
              Share Profile
            </button>
          </div>
          
          {/* Links */}
          <div className="space-y-4 mb-10">
            {userData.links && userData.links.length > 0 ? (
              userData.links.map((link, index) => {
                const platformIcon = detectPlatformIcon(link.url);
                
                return (
                  <a 
                    key={index} 
                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center hover:border-black hover:shadow-md transition-all w-full"
                  >
                    {link.icon ? (
                      <div className="w-10 h-10 mr-4 flex-shrink-0">
                        <img src={link.icon} alt="" className="w-full h-full object-contain" />
                      </div>
                    ) : platformIcon ? (
                      <div className="w-10 h-10 mr-4 flex-shrink-0 flex items-center justify-center">
                        {platformIcon}
                      </div>
                    ) : (
                      <div className="w-10 h-10 mr-4 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    )}
                    <span className="font-medium text-gray-800">{link.title}</span>
                  </a>
                );
              })
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No links added yet</p>
              </div>
            )}
          </div>
          
          {/* Social Media Icons */}
          {Object.keys(socialMedia).length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mb-10">
              {Object.entries(socialMedia).map(([platform, username]) => {
                if (!username || !platformIcons[platform]) return null;
                
                return (
                  <a 
                    key={platform}
                    href={`${platformIcons[platform].url}${username}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 p-3 rounded-full hover:border-black transition-all"
                  >
                    {platformIcons[platform].icon}
                  </a>
                );
              })}
            </div>
          )}
          
          {/* Footer */}
          <div className="border-t border-gray-100 pt-6 mt-12 text-center text-gray-500 text-sm">
            <p>Made with <span className="text-black">♥</span> using <Link href="/" className="text-black hover:underline font-medium">LinkFolio</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Handle;