import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {appColors} from '../../../constants/appColors';
import LineComfirmBookingInfo from '../../../components/patient/confirmBookingScreen/LineComfirmBookingInfo';
import {AlarmClock, Calendar7, Doctor, Hospital} from '../../../assets/svgs';
import {useNavigation} from '@react-navigation/native';

const ConfirmBookingInformationScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('BillingInformationScreen' as never);
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Xác nhận thông tin"
          paddingStart={26}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <View style={styles.container}>
          <LineComfirmBookingInfo
            label="Bác sĩ"
            value="Nguyễn Khánh Ngọc"
            image={<Doctor height={45} width={45} />}
          />
          <LineComfirmBookingInfo
            label="Chuyên khoa"
            value="Tâm thần kinh"
            image={<Hospital height={40} width={40} />}
          />
          <LineComfirmBookingInfo
            label="Ngày khám"
            value="17/03/2024"
            image={<Calendar7 height={40} width={40} />}
          />
          <LineComfirmBookingInfo
            label="Giờ khám"
            value="08:00 - 09:00"
            image={<AlarmClock height={34} width={34} />}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <TextComponent
            color={appColors.white}
            fontWeight="600"
            fontSize={16}
            uppercase>
            Xác nhận
          </TextComponent>
        </TouchableOpacity>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default ConfirmBookingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appColors.white,
  },
  button: {
    backgroundColor: appColors.primary,
    borderRadius: 40,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
});
