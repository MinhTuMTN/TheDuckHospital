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

          dispatch(
            setUserInfo({
              fullName: response.data.data.fullName,
              role: response.data.data.role,
            }),
          );
        }
      });
    } else {
      dispatch(setToken(null));
      dispatch(
        setUserInfo({
          fullName: '',
          role: '',
        }),
      );
    }
  };

  const login = async (newToken: string, rememberMe: boolean) => {
    try {
      // Đảm bảo rằng realmInstance đã sẵn sàng và không null
      if (realm == null) {
        console.error('Realm instance is not initialized yet.');
        return;
      }
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
          fullName: '',
          role: '',
        }),
      );
    } catch (error) {
      console.error('Lỗi xảy ra khi đăng xuất');
    }
  };
  return {login, logout, handleCheckToken};
};
