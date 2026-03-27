import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session on app load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', response.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await registerUser(userData);
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const socialLogin = (provider) => {
    // Mock social login - in real app, this would redirect to OAuth provider
    const mockUser = {
      id: Date.now(),
      email: `${provider}@example.com`,
      name: provider.charAt(0).toUpperCase() + provider.slice(1),
      provider: provider,
      token: `social-token-${provider}-${Date.now()}`
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockUser.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    socialLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};