import axios from 'axios';

const DataService = axios.create({
  baseURL: 'http://127.0.0.1:8000', // L'URL de base de votre API
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Ajouter l'intercepteur pour l'autorisation
DataService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default DataService;