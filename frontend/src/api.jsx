import axios from 'axios';
import Cookies from 'js-cookie';
import config from './Utils/config';
const API_URL = `${config.apiUrl}/api`;


const getAuthToken = () => {
  return Cookies.get('authToken');
};


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data.token;
};

export const registerUser = async (userData) => {
 return await axiosInstance.post('/auth/register', userData);
};
export const getUser = async () => {
  return await axiosInstance.get('/auth');
 };
 export const updateUser = async (userData) => {
  return await axiosInstance.patch('/auth', userData);
 };
export const getProducts = async () => {
  return await axiosInstance.get('/products')
}

export const addCart = async (data) => {
  let response = await axiosInstance.post('/cart', data)
  return response.data
}

export const updateToCart = async (data) => {
  let response = await axiosInstance.patch('/cart', data)
  return response.data
}

export const removeCart = async (productId) => {return await axiosInstance.delete(`/cart/${productId}`)}

export const getCartList = async () => {
  return await axiosInstance.get('/cart')
}
