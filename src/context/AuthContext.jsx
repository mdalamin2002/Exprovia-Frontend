import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, ...newUserData } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(newUserData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      const { token: newToken, ...updatedUserData } = response.data;
      
      if (newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      }
      setUser(updatedUserData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Update failed' 
      };
    }
  };

  const addFavorite = async (recipeId) => {
    try {
      await authAPI.addFavorite(recipeId);
      // Update user favorites in state
      setUser(prevUser => ({
        ...prevUser,
        favorites: [...(prevUser.favorites || []), recipeId]
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add favorite' 
      };
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      await authAPI.removeFavorite(recipeId);
      // Update user favorites in state
      setUser(prevUser => ({
        ...prevUser,
        favorites: (prevUser.favorites || []).filter(id => id !== recipeId)
      }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove favorite' 
      };
    }
  };

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    addFavorite,
    removeFavorite,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};