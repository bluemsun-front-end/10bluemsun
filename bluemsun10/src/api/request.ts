import axios from 'axios';
 
const request = axios.create({
  baseURL: 'https://localhost:3000',
  timeout: 60000,
});
 
export default request;