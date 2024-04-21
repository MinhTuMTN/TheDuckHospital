// import React, {createContext, useContext, useEffect, useState} from 'react';
// import Realm from 'realm';
// import {updateToken} from '../services/AxiosInstance';
// import {checkToken, logoutServer} from '../services/authServices';
// import {useRealm} from '@realm/react';
// import {User} from '../realm/User';
// import {useDispatch, useSelector} from 'react-redux';
// import {setToken, setUserInfo} from '../store/authSlice';

// Interface definition for the context
// interface AuthContextProps {
//   token: string | null;
//   userInfo: {
//     fullName: string | null;
//     role: string | null;
//     balance: number;
//     haveWallet: boolean;
//   };
//   handleCheckToken: () => Promise<void>;
//   login: (token: string, rememberMe: boolean) => Promise<void>;
//   logout: () => Promise<void>;
// }

// Default values for the context
// const AuthContext = createContext<AuthContextProps>({
//   token: null,
//   userInfo: {
//     fullName: null,
//     role: null,
//     balance: 0,
//     haveWallet: false,
//   },
//   handleCheckToken: async () => {},
//   login: async () => {},
//   logout: async () => {},
// });

// Hook for the context
// export function useAuth1() {
//   return useContext(AuthContext);
// }

// Props for the provider component
// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// const UserSchema: Realm.ObjectSchema = {
//   name: 'User',
//   properties: {
//     token: 'string',
//     rememberMe: 'bool?',
//     fullName: 'string?',
//     role: 'string?',
//     balance: 'int?',
//     havaWallet: 'bool?',
//   },
// };

// const realmConfig: Realm.Configuration = {
//   schema: [UserSchema],
//   schemaVersion: 1,
//   onMigration: ({objects: oldObjects}, {objects: newObjects}) => {
//     oldObjects('User').forEach((oldObject, index) => {
//       newObjects('User')[index].rememberMe = false;
//     });
//   },
// };

// const realmConfig: Realm.Configuration = {
//   schema: [UserSchema],
//   schemaVersion: 2, // Tăng lên từ 1 lên 2 vì bạn đã thay đổi schema
//   onMigration: (oldRealm, newRealm) => {
//     // Chỉ áp dụng cho version 1 đến version 2
//     if (oldRealm.schemaVersion < 2) {
//       const oldObjects = oldRealm.objects('User');
//       const newObjects = newRealm.objects('User');

//       // Loop through all objects and set the default values for new fields
//       for (let i = 0; i < oldObjects.length; i++) {
//         newObjects[i].fullName = oldObjects[i].fullName || ''; // Đặt giá trị mặc định nếu cần
//         newObjects[i].role = oldObjects[i].role || ''; // Đặt giá trị mặc định nếu cần
//       }
//     }
//   },
// };

// Provider component
// export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<any>({
//     fullName: null,
//     role: null,
//     balance: 0,
//     haveWallet: false,
//   });
//   const [realmInstance, setRealmInstance] = useState<Realm | null>(null);

//   const handleCheckToken = async () => {
//     const response = await checkToken();

//     if (response.success && response.data?.data?.valid) {
//       realmInstance?.write(() => {
//         const user = realmInstance.objects('User')[0];
//         if (user) {
//           user.role = response.data.data.role;
//           user.fullName = response.data.data.fullName;

//           if (response.data.data.balance !== null) {
//             console.log('Have wallet: ');

//             user.balance = response.data.data.balance;
//             user.havaWallet = true;
//           } else {
//             console.log('Not Have wallet: ');
//             user.havaWallet = false;
//             user.balance = 0;
//           }

//           setUserInfo({
//             fullName: response.data.data.fullName,
//             role: response.data.data.role,
//             balance: response.data.data.balance || 0,
//             haveWallet: response.data.data.balance != null ? true : false,
//           });
//         }
//       });
//     } else {
//       setToken(null);
//       setUserInfo({
//         fullName: null,
//         role: null,
//       });
//     }
//   };

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

  // const login = async (newToken: string, rememberMe: boolean) => {
    // try {
    //   // Đảm bảo rằng realmInstance đã sẵn sàng và không null
    //   if (realmInstance == null) {
    //     console.error('Realm instance is not initialized yet.');
    //     return;
    //   }
    //   // Sử dụng realmInstance từ state của component
    //   realmInstance.write(() => {
    //     // Kiểm tra sự tồn tại của User
    //     let user = realmInstance.objects('User')[0];
    //     if (user) {
    //       // Cập nhật user hiện tại
    //       user.token = newToken;
    //       user.rememberMe = rememberMe;
    //     } else {
    //       // Nếu không có user, tạo mới
    //       realmInstance.create('User', {
    //         token: newToken,
    //         rememberMe,
    //         // Giả sử fullName và role được cung cấp ngay sau khi đăng nhập
    //         fullName: '', // Cần sửa theo dữ liệu đích thực hoặc lấy sau khi đăng nhập thành công
    //         role: '', // Tương tự như trên
    //       });
    //     }
    //   });
    //   setToken(newToken);
    //   updateToken(newToken);
    //   handleCheckToken();
    // } catch (error) {
    //   console.error('Lỗi xảy ra khi đăng nhập: ', error);
    // }
  // };

  // const logout = async () => {
  //   try {
  //     await logoutServer();
  //     realm.write(() => {
  //       const user = realm.objects(User)[0];
  //       if (user) {
  //         realm.delete(user);
  //       }
  //     });
  //     dispatch(setToken(null));
  //     dispatch(
  //       setUserInfo({
  //         fullName: '',
  //         role: '',
  //       }),
  //     );
  //   } catch (error) {
  //     console.error('Lỗi xảy ra khi đăng xuất');
  //   }
  // };

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

  // useEffect(() => {
    // let isInitializationAborted = false;
    // const initializeRealm = async () => {
    //   try {
    //     const realmConnection = new Realm(realmConfig);
    //     if (!isInitializationAborted) {
    //       setRealmInstance(realmConnection);
    //     }
    //   } catch (error) {
    //     // Handle initialization error (có thể thêm loggings ở đây)
    //     console.error("Error initializing realm: ", error);
    //   }
    // };
    // initializeRealm();
    // return () => {
    //   isInitializationAborted = true;
    //   if (realmInstance && !realmInstance.isClosed) {
    //     realmInstance.close();
    //   }
    // };
  // }, []);

  // useEffect(() => {
  //   const getToken = () => {
      // const user = realmInstance?.objects('User')[0];
      // if (user) {
      //   setToken(user.token as string);
      //   updateToken(user.token as string);
      //   handleCheckToken();
      // }
    // };

  //   getToken();
  // }, [realmInstance]);

  // The value provided to the context consumers
  // const value = {
    // token,
    // userInfo,
    // handleCheckToken,
    // login,
    // logout,
  // };

  // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
