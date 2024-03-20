import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {appColors} from '../../../constants/appColors';
import LineComfirmBookingInfo from '../../../components/patient/confirmBookingScreen/LineComfirmBookingInfo';
import {AlarmClock, Calendar7, Doctor, Hospital} from '../../../assets/svgs';
import {useNavigation} from '@react-navigation/native';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import {navigationProps} from '../../../types';

const ConfirmBookingInformationScreen = ({route}: {route: any}) => {
  const {data} = route.params;

  const navigation = useNavigation<navigationProps>();
  const handleNavigate = () => {
    navigation.navigate('ChooseProfileScreen', {
      data: data,
    });
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
            value={data?.doctorName}
            image={<Doctor height={45} width={45} />}
          />
          <LineComfirmBookingInfo
            label="Chuyên khoa"
            value={data?.departmentName}
            image={<Hospital height={40} width={40} />}
          />
          <LineComfirmBookingInfo
            label="Ngày khám"
            value={data?.selectedDay}
            image={<Calendar7 height={40} width={40} />}
          />
          <LineComfirmBookingInfo
            label="Giờ khám"
            value={getTimeSlotById(data?.timeSlot?.timeId)}
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
