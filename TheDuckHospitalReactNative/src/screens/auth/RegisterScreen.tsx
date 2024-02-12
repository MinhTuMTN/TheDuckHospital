import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import {
  Check,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react-native';
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

const RegisterScreen = () => {
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleSignInClick = () => {
    navigation.goBack();
  };
  const handleRegisterClick = () => {
    navigation.navigate('VerifyPhoneScreen' as never);
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
            width={200}
            height={200}
          />
          <TextComponent bold fontSize={23}>
            {t('registerScreen.createAccount')}
          </TextComponent>
          <Space paddingTop={5} />
          <TextComponent color={appColors.textDescription}>
            {t('registerScreen.quicklyCreateAccount')}
          </TextComponent>
          <Space paddingTop={20} />
          <InputComponent
            size="md"
            placeholder={t('registerScreen.fullName')}
            startIcon={
              <User color={appColors.textDescription} strokeWidth={2} />
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
            variant="rounded"
          />
          <Space paddingTop={15} />
          <InputComponent
            size="md"
            placeholder={t('registerScreen.phoneNumber')}
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
            variant="rounded"
          />
          <Space paddingTop={15} />
          <InputComponent
            size="md"
            placeholder={t('registerScreen.password')}
            startIcon={
              <LockKeyhole color={appColors.textDescription} strokeWidth={2} />
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
            variant="rounded"
          />
          <Space paddingTop={15} />
          <InputComponent
            size="md"
            placeholder={t('registerScreen.confirmPassword')}
            startIcon={
              <ShieldCheck color={appColors.textDescription} strokeWidth={2} />
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
            variant="rounded"
          />
          <Space paddingTop={30} />
          <ButtonComponent
            onPress={handleRegisterClick}
            containerStyles={{
              width: '90%',
              backgroundColor: '#00a3e8',
              borderRadius: 20,
            }}
            bold>
            {t('registerScreen.register')}
          </ButtonComponent>
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
