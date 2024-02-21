import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';

// Interface definition for the context
interface AuthContextProps {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Default values for the context
const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: async () => {},
  logout: async () => {},
});

// Hook for the context
export function useAuth() {
  return useContext(AuthContext);
}

// Props for the provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);

  // Login function
  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
  };

  // Logout function
  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  // Effect for retrieving the token on mount
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    getToken();
  }, []);

  // The value provided to the context consumers
  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
