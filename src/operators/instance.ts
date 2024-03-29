import router, { ROUTE_AUTH_LOGIN } from '@/router';
import store from '@/store';
import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
});

httpClient.interceptors.request.use((config) => {
  const accessToken = store.getters.accessToken;
  if (!config.headers) {
    config.headers = {};
  }
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch('resetAuth');
      router.push({
        name: ROUTE_AUTH_LOGIN,
        query: {
          redirect: router?.currentRoute?.value?.path
        }
      });
    }
    return Promise.reject(error);
  }
);

export { httpClient };
