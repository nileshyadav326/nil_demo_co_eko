import axios from 'axios';

const apiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
};

export default axios.create(apiConfig);