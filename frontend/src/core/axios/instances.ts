import axios from 'axios'

export const defaultGateway = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
});

defaultGateway.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});



defaultGateway.interceptors.response.use(function (response) {
    return response;
  });