import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';

const VerifyPhoneScreen = () => {
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<any>([]);

  const {t} = useTranslation();

  useEffect(() => {
    const id = setInterval(() => {
      if (remainingTime > 0) setRemainingTime(prev => prev - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.charAt(text.length - 1);
    setOtp(newOtp);

    if (text !== '' && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    } else if (text === '' && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }

    if (text !== '' && index === otp.length - 1) {
      // verifyPhoneNumber(newOtp.join(''));
    }
  };

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
                ref={ref => (otpInputRefs.current[index] = ref)}
                keyboardType="number-pad"
                key={`otp-${index}`}
                _inputContainerStyle={{
                  height: 45,
                  aspectRatio: 1,
                  borderRadius: 30,
                }}
                _inputStyle={{
                  textAlign: 'center',
                  backgroundColor: appColors.primary,
                  color: appColors.white,
                  fontWeight: 'bold',
                  fontSize: 18,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                value={value}
                // onChangeText={(text: string) => handleOtpChange(text, index)}
                onTextInput={e => handleOtpChange(e.nativeEvent.text, index)}
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
