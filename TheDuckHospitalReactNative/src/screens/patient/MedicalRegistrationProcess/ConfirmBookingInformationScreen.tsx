import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {appColors} from '../../../constants/appColors';
import LineComfirmBookingInfo from '../../../components/patient/confirmBookingScreen/LineComfirmBookingInfo';
import {
  AlarmClock,
  Calendar7,
  Doctor,
  Hospital,
  StethoscopeBlue,
} from '../../../assets/svgs';
import {useNavigation} from '@react-navigation/native';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import {navigationProps} from '../../../types';
import InfoBookingComponent from '../../../components/patient/confirmBookingScreen/InfoBookingComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          <View style={styles.bodyContainer}>
            <View style={styles.bodyHeader}>
              <TextComponent fontSize={13} fontWeight="500">
                Chuyên khoa đã chọn{' '}
                <TextComponent fontSize={13} fontWeight="700">
                  (3)
                </TextComponent>
              </TextComponent>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextComponent
                  fontSize={13}
                  fontWeight="500"
                  color={appColors.error}>
                  Xoá hểt
                </TextComponent>
                <AntDesign
                  name="close"
                  size={16}
                  color={appColors.error}
                  style={{paddingLeft: 5}}
                />
              </View>
            </View>
            <View style={styles.bodyMain}>
              <InfoBookingComponent />
              <InfoBookingComponent />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextComponent fontSize={17} fontWeight="500">
              Tổng tiền tạm tính:{' '}
            </TextComponent>
            <TextComponent
              fontSize={17}
              fontWeight="700"
              color={appColors.primary}>
              450.000đ
            </TextComponent>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: appColors.primary,
                borderWidth: 1,
                flexDirection: 'row',
              },
            ]}
            onPress={handleNavigate}>
            <StethoscopeBlue width={20} height={20} />
            <TextComponent
              paddingStart={5}
              fontSize={17}
              fontWeight="700"
              color={appColors.primary}>
              Thêm chuyên khoa
            </TextComponent>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: appColors.primary,
              },
            ]}
            onPress={handleNavigate}>
            <TextComponent
              fontSize={17}
              fontWeight="700"
              color={appColors.white}>
              Xác nhận
            </TextComponent>
          </TouchableOpacity>
        </View>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default ConfirmBookingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appColors.backgroundGray,
  },
  bodyContainer: {
    flexDirection: 'column',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    borderColor: '#000000',
    borderWidth: 1,
  },
  bodyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 10,
    borderBottomColor: appColors.black,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  bodyMain: {
    flexDirection: 'column',
  },

  footer: {
    marginTop: 10,
    flexDirection: 'column',
    paddingHorizontal: 20,
    elevation: 6,
    backgroundColor: appColors.white,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    borderRadius: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});
