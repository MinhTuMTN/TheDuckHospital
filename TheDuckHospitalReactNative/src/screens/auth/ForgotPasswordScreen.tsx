import React, {useState} from 'react';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Mail} from 'lucide-react-native';
import {appColors} from '../../constants/appColors';
import {useTranslation} from 'react-i18next';
import ButtonComponent from '../../components/ButtonComponent';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {forgetPassword} from '../../services/authServices';
import {navigationProps} from '../../types';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const navigation = useNavigation<navigationProps>();

  const handleResetPassword = async () => {
    try {
      const response = await forgetPassword({phoneNumber: emailOrPhoneNumber});

      if (response.success) {
        navigation.navigate('ForgetAndChangePasswordScreen', {
          phoneNumber: emailOrPhoneNumber,
        });
      } else {
        console.error('Số điện thoại không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi xảy ra: ', error);
    }
  };

  return (
    <ContainerComponent style={[{backgroundColor: '#fafafa'}]}>
      <Header
        showBackButton
        noBackground
        backButtonColor={appColors.black}
        paddingTop={25}
      />
      <ContentComponent
        style={[
          {alignItems: 'center', paddingTop: '45%'},
          {backgroundColor: '#fafafa'},
        ]}>
        <TextComponent bold fontSize={23}>
          {t('forgotPasswordScreen.forgotPassword')}
        </TextComponent>
        <Space paddingTop={20} />
        <TextComponent
          textAlign="center"
          style={{width: '90%'}}
          color={appColors.textDescription}>
          {t('forgotPasswordScreen.enterPhone')}
        </TextComponent>
        <Space paddingTop={20} />
        <InputComponent
          size="md"
          placeholder={t('forgotPasswordScreen.email')}
          startIcon={<Mail color={appColors.textDescription} strokeWidth={2} />}
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
          onChangeText={text => setEmailOrPhoneNumber(text)}
        />
        <Space paddingTop={20} />
        <ButtonComponent
          containerStyles={{
            width: '90%',
            backgroundColor: '#00a3e8',
            borderRadius: 20,
          }}
          bold
          onPress={handleResetPassword}>
          {t('forgotPasswordScreen.resetPassword')}
        </ButtonComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
