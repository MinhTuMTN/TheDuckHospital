import {LockKeyhole, Phone, ShieldCheck} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import ButtonComponent from '../../components/ButtonComponent';
import {appColors} from '../../constants/appColors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {changePassword} from '../../services/authServices';
import FormControlComponent from '../../components/FormControlComponent';

const ForgetAndChangePasswordScreen = () => {
  const route = useRoute();
  const [isLoading, setIsLoading] = React.useState(true);
  const {phoneNumber} = route.params as {phoneNumber: string};
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = React.useState(false);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleChangePasswordClick = async () => {
    if (error) return;
    try {
      const response = await changePassword({
        otp: otp,
        phoneNumber: phoneNumber,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      });

      if (response.success) {
        console.info('Đổi mật khẩu thành công');
        navigation.navigate('LoginScreen' as never);
      } else {
        console.error('Thông tin không hợp lệ ' + phoneNumber);
      }
    } catch (error) {
      console.error('Đã có lỗi xảy ra: ', error);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <ContainerComponent
      style={[
        {backgroundColor: '#fafafa'},
        isLoading && {justifyContent: 'center', alignItems: 'center'},
      ]}>
      {isLoading ? (
        <ActivityIndicator size="large" color={appColors.primary} />
      ) : (
        <ContentComponent style={styles.container}>
          <Image
            source={require('../../assets/images/logo-text-small.png')}
            alt="Logo"
            style={{
              width: 175,
              height: 175,
            }}
          />
          <Space paddingTop={20} />
          <TextComponent bold fontSize={23}>
            Đổi mật khẩu
          </TextComponent>
          <Space paddingTop={5} />
          <TextComponent color={appColors.textDescription}>
            Nhập mã OTP để đổi mật khẩu
          </TextComponent>
          <Space paddingTop={20} />
          <FormControlComponent onErrors={error => setError(error)}>
            <InputComponent
              size="md"
              placeholder="Mã OTP"
              startIcon={
                <Phone color={appColors.textDescription} strokeWidth={2} />
              }
              containerStyle={{
                width: '90%',
              }}
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              error={otp.trim() === '' || otp.trim().length !== 6}
              errorMessage={'Mã OTP không hợp lệ'}
              variant="rounded"
              onChangeText={text => setOTP(text)}
            />
            <Space paddingTop={15} />
            <InputComponent
              size="md"
              placeholder={t('registerScreen.password')}
              startIcon={
                <LockKeyhole
                  color={appColors.textDescription}
                  strokeWidth={2}
                />
              }
              containerStyle={{
                width: '90%',
              }}
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              error={newPassword.trim() === ''}
              errorMessage={'Mật khẩu không được để trống'}
              variant="rounded"
              type="password"
              onChangeText={text => setNewPassword(text)}
            />
            <Space paddingTop={15} />
            <InputComponent
              size="md"
              placeholder={t('registerScreen.confirmPassword')}
              startIcon={
                <ShieldCheck
                  color={appColors.textDescription}
                  strokeWidth={2}
                />
              }
              containerStyle={{
                width: '90%',
              }}
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              error={
                confirmNewPassword.trim() === '' ||
                confirmNewPassword.trim() !== newPassword.trim()
              }
              errorMessage={'Xác nhận mật khẩu không hợp lệ'}
              variant="rounded"
              type="password"
              onChangeText={text => setConfirmNewPassword(text)}
            />
          </FormControlComponent>
          <Space paddingTop={30} />
          <ButtonComponent
            enabled={!error}
            onPress={handleChangePasswordClick}
            containerStyles={{
              width: '90%',
              backgroundColor: '#00a3e8',
              borderRadius: 20,
            }}
            bold>
            Đổi mật khẩu
          </ButtonComponent>
        </ContentComponent>
      )}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});

export default ForgetAndChangePasswordScreen;
