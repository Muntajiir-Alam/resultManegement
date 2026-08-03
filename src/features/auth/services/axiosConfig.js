import api from '../../../shared/api';

const authApi = api;

authApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  return config;
});

export default authApi;