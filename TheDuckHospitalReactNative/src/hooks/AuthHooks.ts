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
        const user = realm.objects('User')[0];
        if (user) {
          user.role = response.data.data.role;
          user.fullName = response.data.data.fullName;

          if (response.data.data.balance !== null) {
            console.log('Have wallet: ');

            user.balance = response.data.data.balance;
            user.havaWallet = true;
          } else {
            console.log('Not Have wallet: ');
            user.havaWallet = false;
            user.balance = 0;
          }

          setUserInfo({
            fullName: response.data.data.fullName,
            role: response.data.data.role,
            balance: response.data.data.balance || 0,
            haveWallet: response.data.data.balance != null ? true : false,
          });
        }
      });
    } else {
      setToken(null);
      setUserInfo({
        fullName: null,
        role: null,
        balance: 0,
        haveWallet: false,
      });
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
          fullName: null,
          role: null,
          balance: 0,
          haveWallet: false,
        }),
      );
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng xuất');
    }
  };
  return {login, logout, handleCheckToken};
};
