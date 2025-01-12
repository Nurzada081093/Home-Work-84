import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:8000',
});

export default axiosRequest;