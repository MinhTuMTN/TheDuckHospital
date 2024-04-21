import {Image, Spinner} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfo';
import {globalStyles} from '../styles/globalStyles';
import {Space} from '../components';
import {navigationProps} from '../types';
import {checkToken} from '../services/authServices';
import {connect, useDispatch} from 'react-redux';
import {useRealm} from '@realm/react';
import {setToken, setUserInfo} from '../store/authSlice';
import {updateToken} from '../services/AxiosInstance';
import {User} from '../realm/User';
import { useAuth } from '../hooks/AuthHooks';

const SlashScreen = () => {
  const realm = useRealm();
  const auth = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {reset} = useNavigation<navigationProps>();

  useEffect(() => {
    const getToken = () => {
      const user = realm?.objects('User')[0];
      if (user) {
        dispatch(setToken(user.token as string));
        updateToken(user.token as string);
        auth.handleCheckToken();
      }
    };

    getToken();
  }, [realm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      reset({
        index: 0,
        // routes: [{name: 'LoginScreen'}],
        routes: [{name: 'PatientBottom'}],
        // routes: [{name: 'AdminLeftSideDrawer'}],
      });
      // navigation.navigate('LoginScreen' as never);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [reset]);

  return (
    <ImageBackground
      source={require('../assets/images/slash-screen-backgroud.png')}
      style={[globalStyles.container, globalStyles.center]}>
      <Image
        source={require('../assets/images/logo-text-small.png')}
        alt="logo"
        style={{
          width: appInfo.size.width * 0.5,
          height: appInfo.size.width * 0.5,
          resizeMode: 'cover',
        }}
      />
      <Space paddingTop={20} />
      <Spinner color={appColors.darkGreen} size={'large'} />
    </ImageBackground>
  );
};

const mapDispatchToProps = {
  setUserInfo,
  setToken,
};

export default connect()(SlashScreen);
