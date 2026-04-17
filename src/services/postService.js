import apiClient from './apiClient';
import { parseError } from '../utils/errorParser';

const postService = {
  async getPosts(page = 1, limit = 10) {
    try {
      const res = await apiClient.get('/api/posts', {
        params: { page, limit },
      });

      return res.data?.data || [];
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async createPost({ content, imageFile }) {
    try {
      const form = new FormData();
      form.append('content', content);

      if (imageFile) {
        form.append('image', imageFile);
      }

      const res = await apiClient.post('/api/posts', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data?.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async updatePost(postId, { content, imageFile }) {
    try {
      const form = new FormData();

      if (content !== undefined) form.append('content', content);
      if (imageFile) form.append('image', imageFile);

      const res = await apiClient.put(`/api/posts/${postId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data?.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async deletePost(postId) {
    try {
      const res = await apiClient.delete(`/api/posts/${postId}`);
      return res.data?.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async toggleLike(postId) {
    try {
      const res = await apiClient.put('/api/posts/like', { postId });

      return res.data?.data; 
      // expected: { liked: true/false }
    } catch (error) {
      throw new Error(parseError(error));
    }
  },

  async addComment(postId, text) {
    try {
      const res = await apiClient.post('/api/posts/comment', {
        postId,
        text,
      });

      return res.data?.data;
    } catch (error) {
      throw new Error(parseError(error));
    }
  },
};

export default postService;