import axios from 'axios';
import i18next from 'i18next';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setLanguage = (lang: string) => {
  apiClient.defaults.headers.common['Accept-Language'] = lang || 'en';
};

i18next.on('languageChanged', (lang) => {
  setLanguage(lang);
});

export default apiClient;
