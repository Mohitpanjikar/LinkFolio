// API configuration for both development and production environments
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Helper function to construct full API URLs
export const apiEndpoint = (path) => `${API_URL}${path}`;

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  register: apiEndpoint('/api/register'),
  login: apiEndpoint('/api/login'),
  
  // Dashboard endpoints
  dashboard: apiEndpoint('/data/dashboard'),
  updateProfile: apiEndpoint('/api/update-profile'),
  addLink: apiEndpoint('/api/add-link'),
  updateLink: apiEndpoint('/api/update-link'),
  deleteLink: apiEndpoint('/api/delete-link'),
  updateSocialMedia: apiEndpoint('/api/update-social-media'),
  
  // Public profile endpoints
  getUserData: (handle) => apiEndpoint(`/get/${handle}`),
  getUserSocials: (handle) => apiEndpoint(`/get/socials/${handle}`),
};

export default API_ENDPOINTS; 