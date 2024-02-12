import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import ButtonComponent from '../../components/ButtonComponent';
import {useTranslation} from 'react-i18next';

const VerifyPhoneScreen = () => {
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);

  const {t} = useTranslation();

  useEffect(() => {
    const id = setInterval(() => {
      if (remainingTime > 0) setRemainingTime(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
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
              (+84) 123 567 890
            </TextComponent>
            . {t(`verifyPhoneScreen.checkAndEnterCode`)}
          </TextComponent>

          <Space paddingTop={30} />
          <View style={styles.otpInputContainer}>
            {otp.map((value, index) => (
              <InputComponent
                keyboardType="number-pad"
                key={`otp-${index}`}
                containerStyle={{
                  aspectRatio: 1,
                }}
                inputContainerStyle={{
                  height: 45,
                  aspectRatio: 1,
                  borderRadius: 30,
                }}
                inputContainerFocusStyle={{
                  height: 45,
                  aspectRatio: 1,
                  borderRadius: 30,
                }}
                inputStyle={{
                  textAlign: 'center',
                  backgroundColor: appColors.primary,
                  color: appColors.white,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
                inputFocusStyle={{
                  textAlign: 'center',
                  backgroundColor: appColors.primary,
                  color: appColors.white,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
                value={value}
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
