import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://43.200.34.71:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;utf-8',
    },
});

export const Post = async (url, data, config = {}) => {
    return await axiosInstance.post(url, data, { ...config });
};

export const Get = async (url, config = {}) => {
    return await axiosInstance.get(url, { ...config });
};
