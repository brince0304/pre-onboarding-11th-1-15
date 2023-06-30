import axios from 'axios';
import { onRequest, onResponse, onErrorResponse } from './clientInterceptor';

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop/';

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(onRequest);
client.interceptors.response.use(onResponse, onErrorResponse);

export default client;
