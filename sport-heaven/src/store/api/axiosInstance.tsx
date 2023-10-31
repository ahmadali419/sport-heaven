import axios from 'axios';

// Create an Axios instance with a base URL
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your base URL
});

export const axiosAdminInstance = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your base URL
});

// Add an interceptor to include the user token in each request
axiosAdminInstance.interceptors.request.use(
    (config) => {
        // Get the user token from where you have it stored (e.g., local storage, state, cookies)
        const adminToken = localStorage.getItem('adminToken'); // Replace with your storage method

        // Add the user token to the request headers
        if (adminToken) {
            config.headers['Authorization'] = `Bearer ${adminToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

