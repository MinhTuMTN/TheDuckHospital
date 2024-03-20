import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';
import Realm, {ObjectSchema} from 'realm';
import {updateToken} from '../services/AxiosInstance';
import {checkToken} from '../services/authServices';

// Interface definition for the context
interface AuthContextProps {
  token: string | null;
  userInfo: {
    fullName: string | null;
    role: string | null;
  };
  login: (token: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

// Default values for the context
const AuthContext = createContext<AuthContextProps>({
  token: null,
  userInfo: {
    fullName: null,
    role: null,
  },
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
    fullName: 'string?',
    role: 'string?',
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
  const [userInfo, setUserInfo] = useState<any>({
    fullName: null,
    role: null,
  });
  const [realmInstance, setRealmInstance] = useState<Realm | null>(null);

  const handleCheckToken = async () => {
    const response = await checkToken();

    if (response.success && response.data?.data?.valid) {
      realmInstance?.write(() => {
        const user = realmInstance.objects('User')[0];
        if (user) {
          user.role = response.data.data.role;
          user.fullName = response.data.data.fullName;

          setUserInfo({
            fullName: response.data.data.fullName,
            role: response.data.data.role,
          });
        }
      });
    } else {
      setToken(null);
      setUserInfo({
        fullName: null,
        role: null,
      });
    }
  };

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
      updateToken(newToken);

      handleCheckToken();
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
      if (user) {
        setToken(user.token as string);
        updateToken(user.token as string);
        handleCheckToken();
      }
    };

    getToken();
  }, [realmInstance]);

  // The value provided to the context consumers
  const value = {
    token,
    userInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
