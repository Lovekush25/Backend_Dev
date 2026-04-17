const TOKEN_KEY = 'social_token';

export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);