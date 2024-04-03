import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';
import {updateToken} from '../services/AxiosInstance';
import {checkToken} from '../services/authServices';
import {Realm} from 'realm';

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

// const realmConfig: Realm.Configuration = {
//   schema: [UserSchema],
//   schemaVersion: 1,
//   onMigration: ({objects: oldObjects}, {objects: newObjects}) => {
//     oldObjects('User').forEach((oldObject, index) => {
//       newObjects('User')[index].rememberMe = false;
//     });
//   },
// };

const realmConfig: Realm.Configuration = {
  schema: [UserSchema],
  schemaVersion: 2, // Tăng lên từ 1 lên 2 vì bạn đã thay đổi schema
  onMigration: (oldRealm, newRealm) => {
    // Chỉ áp dụng cho version 1 đến version 2
    if (oldRealm.schemaVersion < 2) {
      const oldObjects = oldRealm.objects('User');
      const newObjects = newRealm.objects('User');

      // Loop through all objects and set the default values for new fields
      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].fullName = oldObjects[i].fullName || ''; // Đặt giá trị mặc định nếu cần
        newObjects[i].role = oldObjects[i].role || ''; // Đặt giá trị mặc định nếu cần
      }
    }
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
      console.log(response);

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

  // const login = async (newToken: string, rememberMe: boolean) => {
  //   try {
  //     realmInstance?.write(() => {
  //       const user = realmInstance.objects('User')[0];
  //       if (user) {
  //         user.token = newToken;
  //         user.rememberMe = rememberMe;
  //       } else {
  //         realmInstance.create('User', {token: newToken, rememberMe});
  //       }
  //     });

  //     setToken(newToken);
  //     updateToken(newToken);

  //     handleCheckToken();
  //   } catch (error) {
  //     console.error('Lỗi xảy ra khi đăng nhập: ', error);
  //   }
  // };

  const login = async (newToken: string, rememberMe: boolean) => {
    try {
      // Đảm bảo rằng realmInstance đã sẵn sàng và không null
      if (realmInstance == null) {
        console.error('Realm instance is not initialized yet.');
        return;
      }

      // Sử dụng realmInstance từ state của component
      realmInstance.write(() => {
        // Kiểm tra sự tồn tại của User
        let user = realmInstance.objects('User')[0];
        if (user) {
          // Cập nhật user hiện tại
          user.token = newToken;
          user.rememberMe = rememberMe;
        } else {
          // Nếu không có user, tạo mới
          realmInstance.create('User', {
            token: newToken,
            rememberMe,
            // Giả sử fullName và role được cung cấp ngay sau khi đăng nhập
            fullName: '', // Cần sửa theo dữ liệu đích thực hoặc lấy sau khi đăng nhập thành công
            role: '', // Tương tự như trên
          });
        }
      });

      setToken(newToken);
      updateToken(newToken);

      // Lưu ý: Handle check token nên cũng cần đảm bảo rằng nó không thao tác trên một realm instance đã đóng.
      // Khả năng cao là bạn cần chuyển realm instance là tham số cho hàm này hoặc sử dụng realmInstance từ state nếu cần truy cập trong thời gian lâu dài.
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

  // useEffect(() => {
  //   const initializeRealm = async () => {
  //     const realmConnection = new Realm(realmConfig);
  //     // const realmConnection = new Realm({ schema: [UserSchema] });
  //     setRealmInstance(realmConnection);
  //     return realmConnection;
  //   };

  //   initializeRealm();

  //   return () => {
  //     if (realmInstance && !realmInstance.isClosed) {
  //       realmInstance.close();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    let isInitializationAborted = false;
  
    const initializeRealm = async () => {
      try {
        const realmConnection = new Realm(realmConfig);
        if (!isInitializationAborted) {
          setRealmInstance(realmConnection);
        }
      } catch (error) {
        // Handle initialization error (có thể thêm loggings ở đây)
        console.error("Error initializing realm: ", error);
      }
    };
  
    initializeRealm();
  
    return () => {
      isInitializationAborted = true;
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
