import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.BASE_API_URL,
    timeout: 10000, // Timeout de 10 secondes
    headers: {
      'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use((config) => {
    return config;
});

export default httpClient;