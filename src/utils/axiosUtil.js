import axios from 'axios';

const axiosInstance = axios.create({
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
