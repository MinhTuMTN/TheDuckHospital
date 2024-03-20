import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextComponent} from '../..';
import LineComfirmBookingInfo from './LineComfirmBookingInfo';
import {
  AlarmClock,
  Calendar7,
  Doctor,
  Hospital,
  Trash,
} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';

const InfoBookingComponent = () => {
  return (
    <View style={styles.container}>
      <LineComfirmBookingInfo
        label="Chuyên khoa:"
        value="Thần kinh vận động và parkinson"
        isDepartment
        image={<Hospital />}
      />
      <LineComfirmBookingInfo
        label="Bác sĩ:"
        value="Nguyễn Khánh Linh"
        image={<Doctor />}
      />
      <LineComfirmBookingInfo
        label="Ngày khám:"
        value="17/03/2024"
        image={<Calendar7 />}
      />
      <LineComfirmBookingInfo
        label="Giờ khám:"
        value="08:00 - 09:00"
        image={<AlarmClock />}
      />
      <LineComfirmBookingInfo
        label="Phí khám:"
        value="200.000đ"
        image={<Hospital />}
      />
      <View style={styles.button}>
        <Trash width={20} height={20} />
      </View>
    </View>
  );
};

export default InfoBookingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 4,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.17)',
    borderColor: appColors.error,
    borderWidth: 1,
    bottom: 16,
    right: 5,
  },
});
