import {useNavigation} from '@react-navigation/native';
import {LockKeyhole, Phone, ShieldCheck, User} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Image, Pressable, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import ButtonComponent from '../../components/ButtonComponent';
import FormControlComponent from '../../components/FormControlComponent';
import {appColors} from '../../constants/appColors';
import {checkPhoneOrEmail} from '../../services/authServices';
import {navigationProps} from '../../types';
import {Toast, ToastDescription, VStack, useToast} from '@gluestack-ui/themed';
import {ToastTitle} from '@gluestack-ui/themed';

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [info, setInfo] = React.useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();

  const handleSignInClick = () => {
    navigation.goBack();
  };
  const validatePassword = (password: string) => {
    const regex = new RegExp('(?=.*\\d)(?=.*[a-zA-Z]).{8,}');
    return regex.test(password);
  };
  const handleRegisterClick = async (phoneNumber: string) => {
    setIsLoadingAPI(true);
    const response = await checkPhoneOrEmail({emailOrPhoneNumber: phoneNumber});

    setIsLoadingAPI(false);

    if (response.success) {
      // If phone number isn't exist
      console.log('Data', response.data.data);

      if (!response.data.data) {
        navigation.navigate('VerifyPhoneScreen', {
          phoneNumber,
          fullName: info.fullName,
          password: info.password,
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
                    Số điện thoại đã tồn tại. Vui lòng kiểm tra và thử lại sau.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    } else {
      console.log('Error', response.error);
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
            {t('registerScreen.createAccount')}
          </TextComponent>
          <Space paddingTop={5} />
          <TextComponent color={appColors.textDescription}>
            {t('registerScreen.quicklyCreateAccount')}
          </TextComponent>
          <Space paddingTop={20} />
          <FormControlComponent onErrors={error => setError(error)}>
            <InputComponent
              value={info.fullName}
              error={info.fullName === ''}
              errorMessage={t('registerScreen.fullNameError')}
              onChangeText={text => setInfo({...info, fullName: text})}
              size="md"
              placeholder={t('registerScreen.fullName')}
              startIcon={
                <User color={appColors.textDescription} strokeWidth={2} />
              }
              containerStyle={{
                width: '90%',
              }}
              _inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              autoCapitalize="words"
              variant="rounded"
            />
            <Space paddingTop={15} />
            <InputComponent
              value={info.phoneNumber}
              onChangeText={text => setInfo({...info, phoneNumber: text})}
              error={info.phoneNumber === '' || info.phoneNumber.length < 10}
              errorMessage={
                info.phoneNumber === ''
                  ? t('registerScreen.phoneNumberError')
                  : t('registerScreen.phoneNumberLengthError')
              }
              size="md"
              placeholder={t('registerScreen.phoneNumber')}
              startIcon={
                <Phone color={appColors.textDescription} strokeWidth={2} />
              }
              containerStyle={{
                width: '90%',
              }}
              keyboardType="phone-pad"
              returnKeyType="next"
              _inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              variant="rounded"
              maxLength={10}
            />
            <Space paddingTop={15} />
            <InputComponent
              value={info.password}
              onChangeText={text => setInfo({...info, password: text})}
              error={info.password === '' || !validatePassword(info.password)}
              errorMessage={
                info.password === ''
                  ? t('registerScreen.passwordError')
                  : t('registerScreen.passwordLengthError')
              }
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
              _inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              variant="rounded"
              type="password"
              autoCapitalize="none"
            />
            <Space paddingTop={15} />
            <InputComponent
              value={info.confirmPassword}
              onChangeText={text => setInfo({...info, confirmPassword: text})}
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
              _inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              variant="rounded"
              type="password"
              error={
                info.confirmPassword === '' ||
                info.password !== info.confirmPassword
              }
              errorMessage={
                info.confirmPassword === ''
                  ? t('registerScreen.confirmPasswordError')
                  : t('registerScreen.confirmPasswordMatchError')
              }
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={() => handleRegisterClick(info.phoneNumber)}
            />
            <Space paddingTop={30} />
            <ButtonComponent
              isLoading={isLoadingAPI}
              enabled={!error}
              onPress={() => handleRegisterClick(info.phoneNumber)}
              containerStyles={{
                width: '90%',
                backgroundColor: '#00a3e8',
                borderRadius: 20,
              }}
              bold>
              {t('registerScreen.register')}
            </ButtonComponent>
          </FormControlComponent>
          <Space paddingTop={10} />
          <FlexComponent direction="row" justifyContent="center">
            <TextComponent>
              {t('registerScreen.alreadyHaveAccount')}
            </TextComponent>
            <Pressable onPress={handleSignInClick}>
              <TextComponent bold underline>
                {t('registerScreen.signIn')}
              </TextComponent>
            </Pressable>
          </FlexComponent>
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

export default RegisterScreen;
