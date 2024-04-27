import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../../components/ButtonComponent';
import {Eye, EyeOff} from 'lucide-react-native';
import {openWallet} from '../../../services/walletServices';
import {useToast} from '../../../hooks/ToastProvider';
import {CommonActions, useNavigation} from '@react-navigation/native';
import { useAuth } from '../../../hooks/AuthHooks';
import LoginRequireComponent from '../../../components/LoginRequireComponent';

const OpenWalletScreen = () => {
  const [info, setInfo] = React.useState({
    password: '',
    passwordShow: false,
    confirmPassword: '',
    confirmPasswordShow: false,
  });
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();
  const navigation = useNavigation();
  const auth = useAuth();

  const handleOpenWallet = async () => {
    setLoading(true);
    const response = await openWallet({
      pinCode: info.password,
      rePinCode: info.confirmPassword,
    });
    setLoading(false);

    if (response.success) {
      toast.showToast('Tạo ví thành công');

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'PatientBottom',
              state: {
                routes: [
                  {
                    name: 'HomeScreen',
                  },
                ],
              },
            },
            {
              name: 'WalletScreen',
            },
          ],
        }),
      );
      auth.handleCheckToken();
    }
  };
  return (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={0}>
        <Header
          title={'Tạo mật khẩu cho ví'}
          showBackButton={true}
          paddingTop={0}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <ContentComponent>
          <View style={styles.infoContainer}>
            <Image
              source={require('../../../assets/images/duck_hi.png')}
              style={styles.image}
            />
            <View style={styles.info}>
              <TextComponent color={appColors.textDarker}>
                Tạo mật khẩu gồm 6 chữ số để bảo vệ ví của bạn
              </TextComponent>
              <View style={styles.triangle} />
            </View>
          </View>
          <Space paddingTop={32} />
          <InputComponent
            value={info.password}
            onChangeText={text => setInfo({...info, password: text})}
            error={info.password.length < 6}
            errorMessage="Mật khẩu phải có 6 chữ số"
            label="Mật khẩu"
            placeholder="******"
            labelStyle={{
              fontWeight: '400',
            }}
            type={info.passwordShow ? 'text' : 'password'}
            maxLength={6}
            keyboardType="number-pad"
            labelContainerStyle={{
              backgroundColor: appColors.white,
              position: 'absolute',
              top: -10,
              left: 16,
              paddingHorizontal: 8,
              zIndex: 1,
            }}
            _inputContainerStyle={{
              borderRadius: 10,
              borderColor: appColors.primary,
              height: 56,
            }}
            _inputStyle={{
              paddingLeft: 16,
              fontSize: 20,
              letterSpacing: 10,
            }}
            endIcon={
              info.passwordShow ? (
                <EyeOff
                  size={24}
                  color={appColors.black}
                  onPress={() => {
                    setInfo(prev => ({
                      ...prev,
                      passwordShow: !prev.passwordShow,
                    }));
                  }}
                />
              ) : (
                <Eye
                  size={24}
                  color={appColors.black}
                  onPress={() => {
                    setInfo(prev => ({
                      ...prev,
                      passwordShow: !prev.passwordShow,
                    }));
                  }}
                />
              )
            }
          />
          <Space paddingTop={24} />
          <InputComponent
            label="Nhập lại mật khẩu"
            placeholder="******"
            value={info.confirmPassword}
            onChangeText={text => setInfo({...info, confirmPassword: text})}
            error={info.password !== info.confirmPassword}
            errorMessage="Mật khẩu không khớp"
            labelStyle={{
              fontWeight: '400',
            }}
            type={info.confirmPasswordShow ? 'text' : 'password'}
            maxLength={6}
            keyboardType="number-pad"
            labelContainerStyle={{
              backgroundColor: appColors.white,
              position: 'absolute',
              top: -10,
              left: 16,
              paddingHorizontal: 8,
              zIndex: 1,
            }}
            _inputContainerStyle={{
              borderRadius: 10,
              borderColor: appColors.primary,
              height: 56,
            }}
            _inputStyle={{
              paddingLeft: 16,
              fontSize: 20,
              letterSpacing: 10,
            }}
            endIcon={
              info.confirmPasswordShow ? (
                <EyeOff
                  size={24}
                  color={appColors.black}
                  onPress={() => {
                    setInfo(prev => ({
                      ...prev,
                      confirmPasswordShow: !prev.confirmPasswordShow,
                    }));
                  }}
                />
              ) : (
                <Eye
                  size={24}
                  color={appColors.black}
                  onPress={() => {
                    setInfo(prev => ({
                      ...prev,
                      confirmPasswordShow: !prev.confirmPasswordShow,
                    }));
                  }}
                />
              )
            }
          />
          <View
            style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 24}}>
            <TextComponent
              color={appColors.textDescription}
              fontSize={15}
              textAlign="center">
              Bằng việc nhấn nút "Tiếp tục" bạn đã đồng ý với các điều khoản và
              điều kiện của chúng tôi
            </TextComponent>
            <Space paddingTop={16} />
            <ButtonComponent
              isLoading={loading}
              onPress={handleOpenWallet}
              borderRadius={10}
              enabled={
                info.password.length === 6 &&
                info.password === info.confirmPassword
              }>
              Tiếp tục
            </ButtonComponent>
          </View>
        </ContentComponent>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    backgroundColor: '#eaeaea',
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#eaeaea',
    bottom: 10,
    left: -5,
    zIndex: -1,
    transform: [{rotate: '45deg'}],
  },
});

export default OpenWalletScreen;
