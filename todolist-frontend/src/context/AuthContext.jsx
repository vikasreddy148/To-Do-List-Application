import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  // If token changes, we could validate it or decode it.
  // For now, we trust presence of token as logged in.
  const isAuthenticated = !!token;

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const jwt = response.data.token;
      if (jwt) {
        localStorage.setItem('token', jwt);
        setToken(jwt);
        return { success: true };
      }
      return { success: false, error: 'No token received' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      const jwt = response.data.token;
      if (jwt) {
        localStorage.setItem('token', jwt);
        setToken(jwt);
        return { success: true };
      }
      return { success: false, error: 'Registration succeeded, but no token returned.' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Best effort backend logout API call
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const value = {
    isAuthenticated,
    token,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
