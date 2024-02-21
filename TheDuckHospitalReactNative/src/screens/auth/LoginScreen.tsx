import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
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

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = React.useState(['rememberMe']);
  const [isLoading, setIsLoading] = React.useState(true);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleSignUpClick = () => {
    navigation.navigate('RegisterScreen' as never);
  };
  const handlForgotPasswordClick = () => {
    navigation.navigate('ForgotPasswordScreen' as never);
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
          <InputComponent
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
          />
          <Space paddingTop={20} />
          <InputComponent
            size="md"
            placeholder={t('loginScreen.password')}
            startIcon={
              <LockKeyhole color={appColors.textDescription} strokeWidth={2} />
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
            containerStyles={{
              width: '90%',
              backgroundColor: '#00a3e8',
              borderRadius: 20,
            }}
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
