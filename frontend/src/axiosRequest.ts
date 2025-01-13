import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getAuthToken = () => {
  const tokens = localStorage.getItem('tokens');

  if (tokens) {
    const allTokens = JSON.parse(tokens);
    const token: string = allTokens[allTokens.length - 1];
    axiosRequest.defaults.headers['Authorization'] = token;
  }
};

export default axiosRequest;
