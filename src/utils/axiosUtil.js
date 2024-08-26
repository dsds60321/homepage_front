import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;utf-8',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        console.log(response.status);
        if (response.status === 403) {
            window.location.href = '/auth/login';
        }

        return Promise.reject(error);
    },
);

export const Post = async (url, data, config = {}) => {
    return await axiosInstance.post(url, data, { ...config });
};

export const Get = async (url, config = {}) => {
    return await axiosInstance.get(url, { ...config });
};
