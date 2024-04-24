import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponent from '../../TextComponent';
import LineInfoComponent from '../../LineInfoComponent';
import {appColors} from '../../../constants/appColors';
import Space from '../../Space';

const MedicalTestResultItem = () => {
  return (
    <View style={styles.container}>
      <TextComponent
        color={appColors.textDarker}
        fontWeight="600"
        fontSize={18}>
        Xét nghiệm máu
      </TextComponent>
      <Space paddingTop={4} />
      <LineInfoComponent
        label="Bác sĩ điều trị"
        value="Nguyễn Văn A"
        labelStyles={{
          fontSize: 15,
          color: appColors.primaryLight,
          fontWeight: '500',
        }}
        valueStyles={{
          fontSize: 15,
          color: appColors.darkGray,
        }}
      />
      <LineInfoComponent
        label="Bác sĩ xét nghiệm"
        value="Nguyễn Văn B"
        labelStyles={{
          fontSize: 15,
          color: appColors.primaryLight,
          fontWeight: '500',
        }}
        valueStyles={{
          fontSize: 15,
          color: appColors.darkGray,
        }}
      />
    </View>
  );
};

export default MedicalTestResultItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 4,
  },
});
