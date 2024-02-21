import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {register} from '../../services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../types';
import {useAuth} from '../../auth/AuthProvider';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';

const VerifyPhoneScreen = ({route}: {route: any}) => {
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<any>([]);

  const {t} = useTranslation();
  const info = route.params;
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();
  const toast = useToast();

  useEffect(() => {
    const id = setInterval(() => {
      if (remainingTime > 0) setRemainingTime(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.charAt(text.length - 1);
    setOtp(newOtp);

    if (text !== '' && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    } else if (text === '' && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }

    if (text !== '' && index === otp.length - 1) {
      handleRegister(newOtp.join(''));
    }
  };
  const handleRegister = async (otp: string) => {
    const response = await register({
      fullName: info.fullName,
      phoneNumber: info.phoneNumber,
      password: info.password,
      otp,
    });

    console.log(response);
    if (response.success) {
      console.log('Data', response.data);

      const token = response.data.data;

      if (token) {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast
                nativeID={toastId}
                variant="accent"
                action="success"
                style={{
                  marginTop: 40,
                }}>
                <VStack space="xs">
                  <ToastTitle>Thành công!</ToastTitle>
                  <ToastDescription>Đăng ký thành công.</ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });

        await auth.login(token);

        navigation.navigate('HomeScreen');
      }
    } else {
      if (response.statusCode === 400) {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast
                nativeID={toastId}
                variant="accent"
                action="error"
                style={{
                  marginTop: 40,
                }}>
                <VStack space="xs">
                  <ToastTitle>Lỗi!</ToastTitle>
                  <ToastDescription>
                    Mã OTP không chính xác. Vui lòng kiểm tra và thử lại sau.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      } else {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast
                nativeID={toastId}
                variant="accent"
                action="error"
                style={{
                  marginTop: 40,
                }}>
                <VStack space="xs">
                  <ToastTitle>Lỗi!</ToastTitle>
                  <ToastDescription>
                    Đã xảy ra lỗi. Vui lòng kiểm tra lại kết nối và thử lại sau.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    }
  };

  return (
    <ContainerComponent
      paddingTop={0}
      style={[
        {
          backgroundColor: '#fafafa',
        },
      ]}>
      <Header
        showBackButton
        noBackground
        title={t(`verifyPhoneScreen.title`)}
        titleColor={appColors.black}
        backButtonColor={appColors.black}
        paddingTop={0}
      />
      <ContentComponent
        style={{
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', flex: 4, justifyContent: 'center'}}>
          <TextComponent
            textAlign="center"
            bold
            fontSize={20}
            style={{width: '90%'}}>
            {t(`verifyPhoneScreen.verifyPhone`)}
          </TextComponent>
          <Space paddingTop={10} />
          <TextComponent
            color={appColors.textDescription}
            style={{width: '90%'}}
            textAlign="center">
            {t(`verifyPhoneScreen.alreadySend`)}{' '}
            <TextComponent color={appColors.primary} bold>
              (+84) {info.phoneNumber.slice(1, 4)}{' '}
              {info.phoneNumber.slice(4, 7)} {info.phoneNumber.slice(7, 10)}
            </TextComponent>
            . {t(`verifyPhoneScreen.checkAndEnterCode`)}
          </TextComponent>

          <Space paddingTop={30} />
          <View style={styles.otpInputContainer}>
            {otp.map((value, index) => (
              <InputComponent
                ref={ref => (otpInputRefs.current[index] = ref)}
                autoFocus={index === 0}
                keyboardType="number-pad"
                key={`otp-${index}`}
                _inputContainerStyle={{
                  height: 45,
                  aspectRatio: 1,
                  borderRadius: 30,
                }}
                _inputStyle={{
                  textAlign: 'center',
                  backgroundColor: appColors.primary,
                  color: appColors.white,
                  fontWeight: 'bold',
                  fontSize: 18,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                value={value}
                // onChangeText={(text: string) => handleOtpChange(text, index)}
                onTextInput={e => handleOtpChange(e.nativeEvent.text, index)}
              />
            ))}
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextComponent>{t(`verifyPhoneScreen.notReceive`)}</TextComponent>
          <TextComponent color={appColors.primary} bold>
            {remainingTime > 0
              ? `${String(Math.floor(remainingTime / 60)).padStart(
                  2,
                  '0',
                )} : ${String(remainingTime % 60).padStart(2, '0')}`
              : t(`verifyPhoneScreen.resendCode`)}
          </TextComponent>
        </View>
      </ContentComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

export default VerifyPhoneScreen;
