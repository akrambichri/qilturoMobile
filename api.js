import axios from 'axios';
export const API_URL="http://192.168.42.177:8000/api";

export default axios.create({
  baseURL: API_URL,
  headers:{
    'Content-Type': 'application/json'
  }
});