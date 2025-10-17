import axios from 'axios';

// Base API URL - adjust this based on your backend URL
const API_BASE_URL = "https://music-app-backend.cloud/api"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or however you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    // Remove leading slash from endpoint if it exists to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const url = `${cleanEndpoint}`;
    const config = {
      url,
      ...options,
    };

    // Handle different response types based on Content-Type header
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    // Extract error message from axios error
    const errorMessage = error.response?.data?.message || error.message || 'API request failed';
    throw new Error(errorMessage);
  }
};

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  },
  
  // Register user
  register: async (username, email, password) => {
    return apiCall('/auth/register', {
      method: 'POST',
      data: { username, email, password },
    });
  },
  
  // Get current user
  getMe: async (token) => {
    // For authenticated requests, we can use axios headers
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return apiCall('/auth/me', config);
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
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
  },
  
  // Update track (with FormData support)
  update: async (id, trackData, token) => {
    const isFormData = trackData instanceof FormData;
    return apiCall(`/tracks/${id}`, {
      method: 'PATCH',
      headers: {
        ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      data: isFormData ? trackData : trackData,
    });
  },
  
  // Delete track
  delete: async (id, token) => {
    return apiCall(`/tracks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default {
  authAPI,
  trackAPI,
};