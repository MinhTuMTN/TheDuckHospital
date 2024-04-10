import React, {createContext, useContext, useEffect, useState} from 'react';
import Realm from 'realm';
import {updateToken} from '../services/AxiosInstance';
import {checkToken, logoutServer} from '../services/authServices';

// Interface definition for the context
interface AuthContextProps {
  token: string | null;
  userInfo: {
    fullName: string | null;
    role: string | null;
    balance: number;
    haveWallet: boolean;
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
    balance: 0,
    haveWallet: false,
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
    balance: 'int?',
    havaWallet: 'bool?',
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
    balance: 0,
    haveWallet: false,
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

          if (response.data.data.balance) {
            user.balance = response.data.data.balance;
            user.havaWallet = true;
          } else {
            user.havaWallet = false;
            user.balance = 0;
          }

          setUserInfo({
            fullName: response.data.data.fullName,
            role: response.data.data.role,
            balance: response.data.data.balance || 0,
            haveWallet: response.data.data.balance ? true : false,
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
      await logoutServer();
      realmInstance?.write(() => {
        const user = realmInstance.objects('User')[0];
        if (user) {
          realmInstance.delete(user);
        }
      });
      setToken(null);
      setUserInfo({
        fullName: null,
        role: null,
      });
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
