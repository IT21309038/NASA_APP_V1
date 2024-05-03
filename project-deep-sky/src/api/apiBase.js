import axios from 'axios';

const BaseURL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: BaseURL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  }
});
