// API utility functions for the music app

// Base API URL - adjust this based on your backend URL
const API_BASE_URL = 'https://music-app-backend.cloud/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.indexOf('application/json') !== -1) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Register user
  register: async (username, email, password) => {
    return apiCall('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  },
  
  // Get current user
  getMe: async (token) => {
    return apiCall('/auth/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Track API functions
export const trackAPI = {
  // Get all tracks
  getAll: async (page = 1, limit = 10) => {
    return apiCall(`/tracks?page=${page}&limit=${limit}`);
  },
  
  // Search tracks
  search: async (query, page = 1, limit = 10) => {
    return apiCall(`/tracks/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  },
  
  // Get track by ID
  getById: async (id) => {
    return apiCall(`/tracks/${id}`);
  },
  
  // Get tracks by album ID
  getByAlbumId: async (albumId) => {
    return apiCall(`/tracks/album/${albumId}`);
  },
  
  // Get all genres
  getGenres: async () => {
    return apiCall('/tracks/genres');
  },
  
  // Create new track with file upload
  create: async (formData, token) => {
    return apiCall('/tracks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },
  
  // Update track (with FormData support)
  update: async (id, trackData, token) => {
    const isFormData = trackData instanceof FormData;
    return apiCall(`/tracks/${id}`, {
      method: 'PATCH',
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      body: isFormData ? trackData : JSON.stringify(trackData),
    });
  },
  
  // Delete track
  delete: async (id, token) => {
    return apiCall(`/tracks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default {
  authAPI,
  trackAPI,
};