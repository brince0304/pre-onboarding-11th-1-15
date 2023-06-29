import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
  }

  return Promise.reject(error);
};

export { onRequest, onResponse, onErrorResponse };
