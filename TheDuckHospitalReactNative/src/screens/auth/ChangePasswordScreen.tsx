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

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [password, setPassword] =
    React.useState<changePasswordWithOldPasswordDataProps>({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

  const validatePassword = useCallback((password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*d)(?=.*W).{8,}$/;
    return regex.test(password);
  }, []);

  const handleChangePassword = async () => {
    if (error) return;
    const respone = await changePasswordWithOldPassword(password);
    if (respone.success) {
      navigation.goBack();
    } else {
      console.log(respone);
    }
  };
  return (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={0}>
        <Header
          title={`Mật khẩu`}
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
              Đổi Mật Khẩu Mới
            </TextComponent>
            <TextComponent
              color={appColors.textDescription}
              fontSize={14}
              textAlign="center"
              style={{
                paddingTop: 4,
                letterSpacing: 0.4,
              }}>
              Vui lòng nhập chính xác các thông tin bên dưới để đặt mật khẩu mới{' '}
            </TextComponent>

            <FormControlComponent onErrors={error => setError(error)}>
              <InputComponent
                label="Mật khẩu cũ"
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
                errorMessage="Mật khẩu cũ không được để trống"
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
                placeholder="Mật khẩu cũ"
                onEndIconPress={() => {
                  setShowOldPassword(!showOldPassword);
                }}
              />
              <InputComponent
                label="Mật khẩu mới"
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
                    ? 'Mật khẩu mới không được để trống'
                    : 'Mật khẩu mới phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
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
                placeholder="Mật khẩu mới"
                onEndIconPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}
              />
              <InputComponent
                label="Xác nhận lại mật khẩu"
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
                    ? 'Mật khẩu mới không được để trống'
                    : 'Mật khẩu mới không trùng khớp với mật khẩu mới'
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
                placeholder="Xác nhận lại mật khẩu"
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
                backgroundColor={appColors.primaryDark}>
                Đổi mật khẩu
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
