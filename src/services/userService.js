import apiClient from './apiClient';
import { parseError } from '../utils/errorParser';

const userService = {
  // 👤 GET PROFILE
  async getProfile(userId) {
    try {
      const endpoint = userId
        ? `/api/users/profile?userId=${userId}`
        : '/api/users/profile';

      const res = await apiClient.get(endpoint);
      return res.data.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  // ➕ FOLLOW / UNFOLLOW
  async toggleFollow(targetUserId) {
    try {
      const res = await apiClient.post('/api/users/follow', {
        targetUserId,
      });

      return res.data.data; // { following: true/false }
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  // 🔍 SEARCH USERS (IMPROVED)
  async searchUsers(query) {
    try {
      if (!query || query.trim().length < 2) return [];

      const res = await apiClient.get(
        `/api/users/search?query=${encodeURIComponent(query)}`
      );

      return res.data.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },
};

export default userService;