import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Blog API functions
export const blogApi = {
  // Fetch all blog posts
  async getPosts(maxResults = 10) {
    try {
      const response = await apiClient.get(`/blog/posts?max_results=${maxResults}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get a specific blog post by ID
  async getPostById(postId) {
    try {
      const response = await apiClient.get(`/blog/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog post ${postId}:`, error);
      throw error;
    }
  },

  // Health check for blog service
  async healthCheck() {
    try {
      const response = await apiClient.get('/blog/health');
      return response.data;
    } catch (error) {
      console.error('Blog health check failed:', error);
      throw error;
    }
  }
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  async submitMessage(contactData) {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact message:', error);
      throw error;
    }
  },

  // Get contact messages (admin function)
  async getMessages(skip = 0, limit = 50, status = null) {
    try {
      let url = `/contact/messages?skip=${skip}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  // Update message status (admin function)
  async updateMessageStatus(messageId, newStatus) {
    try {
      const response = await apiClient.put(`/contact/messages/${messageId}/status`, {
        new_status: newStatus
      });
      return response.data;
    } catch (error) {
      console.error('Error updating message status:', error);
      throw error;
    }
  }
};

// General API functions
export const generalApi = {
  // Test backend connectivity
  async testConnection() {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      throw error;
    }
  }
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      type: 'server_error',
      status,
      message: data?.message || data?.detail || 'Server error occurred',
      data: data
    };
  } else if (error.request) {
    // Request made but no response received
    return {
      type: 'network_error',
      message: 'Network error - please check your connection',
      data: null
    };
  } else {
    // Something else happened
    return {
      type: 'unknown_error',
      message: error.message || 'An unexpected error occurred',
      data: null
    };
  }
};

export default {
  blogApi,
  contactApi,
  generalApi,
  handleApiError
};