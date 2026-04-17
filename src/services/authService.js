import apiClient from './apiClient';
import { parseError } from '../utils/errorParser';

const authService = {
  async register(payload) {
    try {
      const res = await apiClient.post('/api/auth/register', payload);
      return res.data.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async login(payload) {
    try {
      const res = await apiClient.post('/api/auth/login', payload);
      return res.data.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },
};

export default authService;