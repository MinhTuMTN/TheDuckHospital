import {useNavigation} from '@react-navigation/native';
import {Image, Spinner} from 'native-base';
import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfo';
import {globalStyles} from '../styles/globalStyles';

const SlashScreen = () => {
  const {reset} = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      reset({
        index: 0,
        routes: [{name: 'MainPatient' as never}],
      });
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
      <Spinner color={appColors.darkGreen} size={'lg'} />
    </ImageBackground>
  );
};

export default SlashScreen;
