import React, {useEffect} from 'react';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../../components/ButtonComponent';
import {addPatientProfileViaOTP} from '../../../services/patientProfileServices';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const AuthenticatePatientAccountViaOTPScreen = ({route}: {route: any}) => {
  const [number, setNumber] = React.useState('');
  const [time, setTime] = React.useState(300);

  const {patientProfileId} = route.params;
  const navigation = useNavigation<navigationProps>();
  const handleConfirmOTP = async () => {
    const data = {
      patientProfileId: patientProfileId,
      otp: number,
    };

    const response = await addPatientProfileViaOTP(data);
    if (response.success) {
      navigation.navigate('ProfileScreen');
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    // Write count donw function here
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={'Xác thực tài khoản'}
        showBackButton={true}
        paddingTop={30}
        paddingBottom={20}
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              source={require('../../../assets/images/patientAuthOTP.jpg')}
              style={{width: 200, height: 200}}
            />
          </View>
          <TextComponent
            uppercase
            fontSize={20}
            fontWeight="700"
            style={{letterSpacing: 0.5}}>
            Xác nhận số điện thoại
          </TextComponent>
          <TextComponent
            flexWrap="wrap"
            textAlign="center"
            fontWeight="400"
            style={{
              paddingVertical: 8,
              letterSpacing: 0.5,
            }}>
            Nhập mã OTP được gửi về số điện thoại{'\n'}của bạn để xác nhận
          </TextComponent>
          <View style={styles.form}>
            <InputComponent
              value={number}
              onChangeText={text => setNumber(text)}
              placeholder="0 0 0 0 0 0"
              keyboardType="numeric"
              maxLength={6}
              containerStyle={{flex: 1, marginRight: 15}}
              inputContainerStyle={{
                borderColor: appColors.grayLight,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerFocusStyle={{
                borderColor: appColors.primaryDark,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputStyle={{
                textAlign: 'center',
                letterSpacing: 8,
              }}
              inputFocusStyle={{
                textAlign: 'center',
                letterSpacing: 8,
              }}
            />
            <ButtonComponent
              enabled={number.length === 6}
              onPress={handleConfirmOTP}
              containerStyles={{
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              disabledStyles={{
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              fontWeight="500"
              backgroundColor={appColors.primaryDark}>
              Xác nhận
            </ButtonComponent>
          </View>
          <TextComponent
            fontSize={16}
            fontWeight="600"
            style={{
              letterSpacing: 1,
            }}>
            Mã hết hạn sau:
          </TextComponent>
          {time === 0 ? (
            <TextComponent
              color={appColors.darkRed}
              fontWeight="500"
              fontSize={18}
              style={{marginTop: 5}}
              textAlign="center">
              Mã xác nhận đã hết hiệu dụng{'\n'}Vui lòng thử lại sau!
            </TextComponent>
          ) : (
            <TextComponent
              fontSize={30}
              fontWeight="800"
              style={{
                color: appColors.primaryDark,
                letterSpacing: 4,
                marginTop: 5,
              }}>
              {`${Math.floor(time / 60)
                .toString()
                .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}
            </TextComponent>
          )}
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default AuthenticatePatientAccountViaOTPScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  form: {
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
