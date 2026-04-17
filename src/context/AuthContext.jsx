import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';
import { clearToken, getToken, setToken } from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  const refreshProfile = useCallback(async () => {
    const data = await userService.getProfile();
    setUser({
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      avatarUrl: data.avatarUrl,
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) {
        setBootstrapping(false);
        return;
      }
      try {
        await refreshProfile();
      } catch (_err) {
        clearToken();
        setUser(null);
      } finally {
        setBootstrapping(false);
      }
    };
    init();
  }, [refreshProfile]);

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      setToken(data.token);
      setUser({
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
      });
      return true;
    } catch (_err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.login(payload);
      setToken(data.token);
      setUser({
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
      });
      return true;
    } catch (_err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      bootstrapping,
      isAuthenticated,
      register,
      login,
      logout,
      refreshProfile,
    }),
    [user, loading, bootstrapping, isAuthenticated, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}