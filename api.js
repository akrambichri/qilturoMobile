import axios from 'axios';
export const API_URL="http://192.168.8.100:8000/api";

export default axios.create({
  baseURL: API_URL,
  headers:{
    'Content-Type': 'application/json'
  }
});