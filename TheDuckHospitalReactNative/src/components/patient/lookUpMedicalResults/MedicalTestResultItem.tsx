import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import TextComponent from '../../TextComponent';
import LineInfoComponent from '../../LineInfoComponent';
import {appColors} from '../../../constants/appColors';
import Space from '../../Space';
import SeparatorDashComponent from '../../SeparatorDashComponent';
import {CircleCheck, X} from 'lucide-react-native';

interface MedicalTestResultItemProps {
  medicalTest: any;
}

const MedicalTestResultItem = (props: MedicalTestResultItemProps) => {
  const {medicalTest} = props;
  const haveResult = useMemo(
    () =>
      medicalTest.medicalTest?.resultFileUrl === null ||
      medicalTest.medicalTest?.resultFileUrl === undefined ||
      medicalTest.medicalTest?.resultFileUrl === '',
    [medicalTest],
  );
  return (
    <View style={styles.container}>
      <TextComponent
        color={appColors.textDarker}
        fontWeight="600"
        fontSize={18}>
        {/* Xét nghiệm máu */}
        {medicalTest.medicalService.serviceName}
      </TextComponent>
      <Space paddingTop={4} />
      <LineInfoComponent
        label="Bác sĩ điều trị"
        // value="Nguyễn Văn A"
        value={medicalTest.doctor?.fullName || 'Nguyễn Văn A'}
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
        // value="Nguyễn Văn B"
        value={medicalTest.laboratoryTechnician?.fullName || 'Chưa có'}
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
      <SeparatorDashComponent marginTop={6} marginBottom={2} />
      {haveResult ? (
        <View style={styles.note}>
          <X size={24} color={appColors.darkRed} />
          <TextComponent
            color={appColors.darkRed}
            fontSize={16}
            fontWeight="600">
            Chưa có kết quả
          </TextComponent>
        </View>
      ) : (
        <View style={styles.note}>
          <CircleCheck size={24} color={appColors.primary} />
          <TextComponent
            color={appColors.primary}
            fontSize={16}
            fontWeight="600">
            Đã có kết quả. Nhấn để xem
          </TextComponent>
        </View>
      )}
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
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginVertical: 2,
  },
});
