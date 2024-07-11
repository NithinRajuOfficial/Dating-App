import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject("Axios request error:",error);
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest,"originalRequest-----")
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Retrying with refresh token...');
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/api/auth/refresh-token');
        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
          
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          console.error("Refresh token endpoint did not return a new access token");
          // Redirect to login or handle the error as needed
          return Promise.reject(error);
        }
      } catch (retryError) {
        console.error("Failed in retrying request ERROR:", retryError);
        // Handle the error (e.g., redirect to login)
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
