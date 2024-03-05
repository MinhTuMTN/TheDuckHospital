import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {updateToken} from '../services/AxiosInstance';

// Interface definition for the context
interface AuthContextProps {
  token: string | null;
  login: (token: string, rememberMe: boolean) => Promise<void>;
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

const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    token: 'string',
    rememberMe: 'bool?',
  },
};

const realmConfig: Realm.Configuration = {
  schema: [UserSchema],
  schemaVersion: 1,
  onMigration: ({objects: oldObjects}, {objects: newObjects}) => {
    oldObjects('User').forEach((oldObject, index) => {
      newObjects('User')[index].rememberMe = false;
    });
  },
};

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [realmInstance, setRealmInstance] = useState<Realm | null>(null);

  const login = async (newToken: string, rememberMe: boolean) => {
    try {
      realmInstance?.write(() => {
        const user = realmInstance.objects('User')[0];
        if (user) {
          user.token = newToken;
          user.rememberMe = rememberMe;
        } else {
          realmInstance.create('User', {token: newToken, rememberMe});
        }
      });

      setToken(newToken);
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng nhập: ', error);
    }
  };

  const logout = async () => {
    try {
      realmInstance?.write(() => {
        const user = realmInstance.objects('User')[0];
        if (user) {
          realmInstance.delete(user);
        }
      });
      setToken(null);
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng xuất');
    }
  };

  useEffect(() => {
    const initializeRealm = async () => {
      const realmConnection = new Realm(realmConfig);
      // const realmConnection = new Realm({ schema: [UserSchema] });
      setRealmInstance(realmConnection);
      return realmConnection;
    };

    initializeRealm();

    return () => {
      if (realmInstance && !realmInstance.isClosed) {
        realmInstance.close();
      }
    };
  }, []);

  useEffect(() => {
    const getToken = () => {
      const user = realmInstance?.objects('User')[0];
      if (user && user.rememberMe) {
        setToken(user.token as string);
        updateToken(user.token as string);
      }
    };

    getToken();
  }, [realmInstance]);

  // The value provided to the context consumers
  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
