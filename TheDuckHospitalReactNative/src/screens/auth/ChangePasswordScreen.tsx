import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {ChevronLeft, RectangleEllipsis} from 'lucide-react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Eye, HideEye} from '../../assets/svgs';
import ButtonComponent from '../../components/ButtonComponent';
import {changePasswordWithOldPassword} from '../../services/authServices';
import {changePasswordWithOldPasswordDataProps} from '../../types';
import {useNavigation} from '@react-navigation/native';
import LoginRequireComponent from '../../components/LoginRequireComponent';
import FormControlComponent from '../../components/FormControlComponent';
import {useTranslation} from 'react-i18next';
import {useToast} from '../../hooks/ToastProvider';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const {t} = useTranslation();

  const [password, setPassword] =
    React.useState<changePasswordWithOldPasswordDataProps>({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

  const validatePassword = useCallback((password: string) => {
    // Regex for password validation
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  }, []);
  const toast = useToast();
  const handleChangePassword = async () => {
    if (error) return;
    setIsLoading(true);
    const respone = await changePasswordWithOldPassword(password);
    setIsLoading(false);
    if (respone.success) {
      toast.showToast(t('forgotPasswordScreen.changePasswordSuccess'));
      navigation.goBack();
    } else {
      toast.showToast(t('forgotPasswordScreen.changePasswordFail'));
    }
  };
  return (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={0}>
        <Header
          title={t('forgotPassword.password')}
          titleColor={appColors.black}
          showBackButton
          backIcon={<ChevronLeft size={30} color={appColors.black} />}
          titleSize={20}
          paddingTop={30}
          noBackground
          backgroundColor={'#F7F7F7'}
        />
        <ScrollView style={{flexDirection: 'column', flex: 1}}>
          <View style={styles.image}>
            <Image
              source={require('../../assets/images/changeNewPassword.png')}
              style={{width: 280, height: 280}}
            />
          </View>
          <View style={styles.container}>
            <TextComponent bold fontSize={22} textAlign="center">
              {t('forgotPassword.changePassword')}
            </TextComponent>
            <TextComponent
              color={appColors.textDescription}
              fontSize={14}
              textAlign="center"
              style={{
                paddingTop: 4,
                letterSpacing: 0.4,
              }}>
              {t('forgotPassword.enterCorrectInfo')}
            </TextComponent>

            <FormControlComponent onErrors={error => setError(error)}>
              <InputComponent
                label={t('forgotPassword.oldPassword')}
                labelStyle={{
                  color: appColors.textDescription,
                  fontSize: 14,
                  fontWeight: '500',
                }}
                value={password.oldPassword}
                onChangeText={text =>
                  setPassword({...password, oldPassword: text})
                }
                error={password.oldPassword === ''}
                errorMessage={t('forgotPassword.blankOldPassword')}
                variant="underlined"
                startIcon={
                  <SimpleLineIcons
                    size={25}
                    style={{
                      marginLeft: -12,
                    }}
                    name="lock"
                    color={appColors.primaryDark}
                  />
                }
                endIcon={
                  showOldPassword ? (
                    <HideEye width={30} height={30} />
                  ) : (
                    <Eye width={30} height={30} />
                  )
                }
                containerStyle={{width: '100%'}}
                type={showOldPassword ? 'text' : 'password'}
                placeholder={t('forgotPassword.oldPassword')}
                onEndIconPress={() => {
                  setShowOldPassword(!showOldPassword);
                }}
              />
              <InputComponent
                label={t('forgotPassword.newPassword')}
                labelStyle={{
                  color: appColors.textDescription,
                  fontSize: 14,
                  fontWeight: '500',
                }}
                value={password.newPassword}
                onChangeText={text =>
                  setPassword({...password, newPassword: text})
                }
                error={
                  password.newPassword === '' ||
                  !validatePassword(password.newPassword)
                }
                errorMessage={
                  password.newPassword === ''
                    ? t('forgotPassword.blankNewPassword')
                    : !validatePassword(password.newPassword)
                    ? t('forgotPassword.passwordLengthError')
                    : ''
                }
                variant="underlined"
                startIcon={
                  <SimpleLineIcons
                    size={25}
                    style={{
                      marginLeft: -12,
                    }}
                    name="lock"
                    color={appColors.primaryDark}
                  />
                }
                endIcon={
                  showNewPassword ? (
                    <HideEye width={30} height={30} />
                  ) : (
                    <Eye width={30} height={30} />
                  )
                }
                containerStyle={{width: '100%'}}
                type={showNewPassword ? 'text' : 'password'}
                placeholder={t('forgotPassword.newPassword')}
                onEndIconPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}
              />
              <InputComponent
                label={t('forgotPassword.confirmPassword')}
                labelStyle={{
                  color: appColors.textDescription,
                  fontSize: 14,
                  fontWeight: '500',
                }}
                value={password.confirmNewPassword}
                onChangeText={text =>
                  setPassword({...password, confirmNewPassword: text})
                }
                error={
                  password.confirmNewPassword === '' ||
                  password.newPassword !== password.confirmNewPassword
                }
                errorMessage={
                  password.confirmNewPassword === ''
                    ? t('forgotPassword.blankConfirmPassword')
                    : t('forgotPassword.confirmPasswordNotMatch')
                }
                variant="underlined"
                startIcon={
                  <RectangleEllipsis
                    size={25}
                    style={{
                      marginLeft: -12,
                    }}
                    color={appColors.primaryDark}
                  />
                }
                endIcon={
                  showConfirmPassword ? (
                    <HideEye width={30} height={30} />
                  ) : (
                    <Eye width={30} height={30} />
                  )
                }
                containerStyle={{width: '100%'}}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('forgotPassword.confirmPassword')}
                onEndIconPress={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              />
            </FormControlComponent>
            <View
              style={{
                paddingHorizontal: 12,
                marginTop: 16,
              }}>
              <ButtonComponent
                onPress={handleChangePassword}
                borderRadius={20}
                textStyles={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
                isLoading={isLoading}
                loadingColor={appColors.white}
                backgroundColor={appColors.primaryDark}>
                {t('forgotPassword.change')}
              </ButtonComponent>
            </View>
          </View>
        </ScrollView>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    elevation: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: appColors.white,
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  image: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
