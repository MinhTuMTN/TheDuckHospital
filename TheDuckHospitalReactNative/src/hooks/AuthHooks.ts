import {useRealm} from '@realm/react';
import {checkToken, logoutServer} from '../services/authServices';
import {User} from '../realm/User';
import {useDispatch} from 'react-redux';
import {setToken, setUserInfo} from '../store/authSlice';
import {updateToken} from '../services/AxiosInstance';

export const useAuth = () => {
  const realm = useRealm();
  const dispatch = useDispatch();

  const handleCheckToken = async () => {
    const response = await checkToken();

    if (response.success && response.data?.data?.valid) {
      realm?.write(() => {
        const user = realm.objects(User)[0];
        if (user) {
          user.role = response.data.data.role;
          user.fullName = response.data.data.fullName;

          if (response.data.data.balance !== null) {
            user.balance = response.data.data.balance;
            user.haveWallet = true;

            dispatch(
              setUserInfo({
                phoneNumber: response.data.data.phoneNumber,
                fullName: response.data.data.fullName,
                role: response.data.data.role,
                balance: response.data.data.balance,
                haveWallet: true,
                createdAt: response.data.data.createdAt,
                numberOfProfile: response.data.data.numberOfProfile,
                avatar: response.data.data.avatar,
              }),
            );
          } else {
            user.haveWallet = false;
            user.balance = 0;
            dispatch(
              setUserInfo({
                phoneNumber: response.data.data.phoneNumber,
                fullName: response.data.data.fullName,
                role: response.data.data.role,
                haveWallet: false,
                balance: 0,
                createdAt: response.data.data.createdAt,
                numberOfProfile: response.data.data.numberOfProfile,
                avatar: response.data.data.avatar,
              }),
            );
          }

          dispatch(
            setUserInfo({
              phoneNumber: response.data.data.phoneNumber,
              fullName: response.data.data.fullName,
              role: response.data.data.role,
              balance: response.data.data.balance || 0,
              haveWallet: response.data.data.balance != null ? true : false,
              createdAt: response.data.data.createdAt,
              numberOfProfile: response.data.data.numberOfProfile,
              avatar: response.data.data.avatar,
            }),
          );
        }
      });
    } else {
      dispatch(setToken(null));
      dispatch(
        setUserInfo({
          phoneNumber: '',
          fullName: null,
          role: null,
          balance: 0,
          haveWallet: false,
          createdAt: '',
          numberOfProfile: 0,
          avatar: '',
        }),
      );
    }
  };

  const login = async (newToken: string, rememberMe: boolean) => {
    try {
      realm.write(() => {
        // Kiểm tra sự tồn tại của User
        let user = realm.objects(User)[0];
        if (user) {
          // Cập nhật user hiện tại
          user.token = newToken;
          user.rememberMe = rememberMe;
        } else {
          realm.create(User, {
            token: newToken,
            rememberMe: rememberMe,
            fullName: '',
            role: '',
          });
        }
      });

      dispatch(setToken(newToken));
      updateToken(newToken);

      handleCheckToken();
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng nhập: ', error);
    }
  };

  const logout = async () => {
    try {
      await logoutServer();
      realm.write(() => {
        const user = realm.objects(User)[0];
        if (user) {
          realm.delete(user);
        }
      });
      dispatch(setToken(null));
      dispatch(
        setUserInfo({
          phoneNumber: '',
          fullName: null,
          role: null,
          balance: 0,
          haveWallet: false,
          createdAt: '',
          numberOfProfile: 0,
          avatar: '',
        }),
      );
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng xuất');
    }
  };
  return {login, logout, handleCheckToken};
};
