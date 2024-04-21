import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';
import MedicalTestResultItem from './MedicalTestResultItem';
import Space from '../../Space';

const GroupMedicalTestResult = () => {
  return (
    <View style={styles.container}>
      <TextComponent bold color={appColors.textDarker} fontSize={18}>
        Kết quả ngày 20/04/2024
      </TextComponent>
      <Space paddingTop={8} />
      <View style={styles.resultContainer}>
        <MedicalTestResultItem />
        <MedicalTestResultItem />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  resultContainer: {
    rowGap: 8,
  },
});

export default GroupMedicalTestResult;
