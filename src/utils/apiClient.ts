import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

// Request interceptor to clean up params
apiClient.interceptors.request.use(
  (config) => {
    // Remove undefined and null values from params
    if (config.params) {
      const cleanParams: Record<string, any> = {};
      Object.keys(config.params).forEach((key) => {
        const value = config.params[key];
        if (value !== undefined && value !== null) {
          cleanParams[key] = value;
        }
      });
      config.params = cleanParams;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const originalError = error;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing && refreshPromise) {
        try {
          await refreshPromise;
          return apiClient(originalRequest);
        } catch {
          return Promise.reject(originalError);
        }
      }

      isRefreshing = true;
      try {
        refreshPromise = apiClient.post('/auth/refresh');
        await refreshPromise;

        return apiClient(originalRequest);
      } catch {
        return Promise.reject(originalError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;

