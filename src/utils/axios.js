import axios from "axios";

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
});

export const Get = async (url, config) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
}

export const Post = async (url, data, config) => {
  const res = await axiosInstance.post(url, data, config);
  return res.data;
}