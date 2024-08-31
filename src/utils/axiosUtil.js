import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;utf-8',
        Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
    },
});

// 요청 axios
axiosInstance.interceptors.request.use(
    (config) => {
        const tokenType = localStorage.getItem('tokenType');
        const accessToken = localStorage.getItem('accessToken');

        if (tokenType && accessToken) {
            config.headers.Authorization = `${tokenType} ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 응답 axios
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
