import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  set,
} from '@gluestack-ui/themed';
import {Check, LockKeyhole, Mail} from 'lucide-react-native';
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
import {appColors} from '../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {loginDataProps, navigationProps} from '../../types';
import FormControlComponent from '../../components/FormControlComponent';
import {loginWithPassword} from '../../services/authServices';
import {useAuth} from '../../auth/AuthProvider';

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = React.useState(['rememberMe']);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [info, setInfo] = React.useState<loginDataProps>({
    emailOrPhoneNumber: '',
    passwordOrOTP: '',
  });

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();

  const handleSignUpClick = () => {
    navigation.navigate('RegisterScreen');
  };
  const handlForgotPasswordClick = () => {
    navigation.navigate('ForgotPasswordScreen');
  };
  const handleLogin = async () => {
    setIsLoadingAPI(true);
    const response = await loginWithPassword(info);
    setIsLoadingAPI(false);

    if (response.success) {
      const token = response.data.data;
      await auth.login(token);

      navigation.navigate('HomeScreen');
    } else {
      setIsLoadingAPI(false);
      console.log('Error', response);
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
        {backgroundColor: 'fafafa'},
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
            {t('loginScreen.welcome')}
          </TextComponent>
          <Space paddingTop={5} />
          <TextComponent color={appColors.textDescription}>
            {t('loginScreen.signInYourAccount')}
          </TextComponent>
          <Space paddingTop={20} />
          <FormControlComponent onErrors={error => setError(error)}>
            <InputComponent
              value={info.emailOrPhoneNumber}
              onChangeText={text =>
                setInfo({...info, emailOrPhoneNumber: text})
              }
              error={
                !info.emailOrPhoneNumber.includes('@') &&
                (info.emailOrPhoneNumber.length != 10 ||
                  !info.emailOrPhoneNumber.startsWith('0'))
              }
              errorMessage={t('loginScreen.phoneNumberError')}
              size="md"
              placeholder={t('loginScreen.email')}
              startIcon={
                <Mail color={appColors.textDescription} strokeWidth={2} />
              }
              containerStyle={{
                width: '90%',
              }}
              _inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.white,
              }}
              autoCapitalize="none"
              variant="rounded"
              maxLength={info.emailOrPhoneNumber.startsWith('0') ? 10 : 100}
            />
            <Space paddingTop={20} />
            <InputComponent
              value={info.passwordOrOTP}
              onChangeText={text => setInfo({...info, passwordOrOTP: text})}
              error={info.passwordOrOTP === ''}
              errorMessage={t('loginScreen.passwordError')}
              size="md"
              placeholder={t('loginScreen.password')}
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
              autoCapitalize="none"
              type="password"
              variant="rounded"
            />
          </FormControlComponent>
          <Space paddingTop={10} />
          <FlexComponent
            direction="row"
            justifyContent="space-between"
            style={{width: '90%'}}>
            <CheckboxGroup value={rememberMe}>
              <Checkbox
                value="rememberMe"
                size="md"
                aria-label="Remember me"
                onChange={isSelected => {
                  setRememberMe(isSelected ? ['rememberMe'] : []);
                }}>
                <CheckboxIndicator mr="$2" style={{borderRadius: 10}}>
                  <CheckboxIcon as={Check} />
                </CheckboxIndicator>
                <CheckboxLabel>
                  <TextComponent
                    fontWeight="500"
                    color={appColors.textDescription}>
                    {t('loginScreen.rememberMe')}
                  </TextComponent>
                </CheckboxLabel>
              </Checkbox>
            </CheckboxGroup>
            <Pressable onPress={handlForgotPasswordClick}>
              <TextComponent bold underline>
                {t('loginScreen.forgotPassword')}
              </TextComponent>
            </Pressable>
          </FlexComponent>
          <Space paddingTop={40} />
          <ButtonComponent
            isLoading={isLoadingAPI}
            enabled={!error}
            containerStyles={{
              width: '90%',
              backgroundColor: '#00a3e8',
              borderRadius: 20,
            }}
            onPress={handleLogin}
            bold>
            {t('loginScreen.signIn')}
          </ButtonComponent>
          <Space paddingTop={10} />
          <FlexComponent direction="row" justifyContent="center">
            <TextComponent>{t('loginScreen.dontHaveAccount')}</TextComponent>
            <Pressable onPress={handleSignUpClick}>
              <TextComponent bold underline>
                {t('loginScreen.signUp')}
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

export default LoginScreen;
