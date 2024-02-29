import {View, Text} from 'react-native';
import React from 'react';
import {TextComponent} from '../../../components';
import DoctorInfoComponent from '../../../components/patient/chooseDoctorsScreen/DoctorInfoComponent';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';

const ChooseDoctorsScreen = () => {
  return (
    <View style={styles.container}>
      <DoctorInfoComponent />
      <DoctorInfoComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: appColors.backgroundGray,
  },
});

export default ChooseDoctorsScreen;
