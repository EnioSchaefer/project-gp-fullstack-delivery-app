import axios from 'axios';

const PORT = 3001;
const api = axios.create({ baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || PORT}` });

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const loginRequest = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const registerRequest = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const productsRequest = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const checkoutOrder = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getSellers = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const getOrderInfo = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const getOrders = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const updateOrderStatus = async (endpoint, body) => api.patch(endpoint, body);

export const adminRegister = async (endpoint, body) => api.post(endpoint, body);

export default api;
