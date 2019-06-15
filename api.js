import axios from 'axios';
export const API_URL="https://batech.me/api/";

export default axios.create({
  baseURL: API_URL,
  headers:{
    'Content-Type': 'application/json'
  }
});