import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../../constants/appColors';
import TextComponent from '../../TextComponent';

import {useNavigation} from '@react-navigation/native';
import {Pencil, RotateCcw} from 'lucide-react-native';
import {navigationProps} from '../../../types';
import {getMedicineUnit} from '../../../utils/medicineUtils';
import dayjs from 'dayjs';

interface MedicineInfoInMyMedicineBoxComponentProps {
  isUse: boolean;
  item: any;
  patientProfileId: string;
}
const MedicineInfoInMyMedicineBoxComponent = (
  props: MedicineInfoInMyMedicineBoxComponentProps,
) => {
  const {isUse, item, patientProfileId} = props;

  const navigation = useNavigation<navigationProps>();
  return (
    <View style={styles.container}>
      <View style={styles.viewInfo}>
        <TextComponent
          color={appColors.black}
          fontSize={18}
          fontWeight="600"
          ellipsizeMode="tail"
          numberOfLines={2}
          style={{
            elevation: 0.5,
            letterSpacing: 0.5,
            textAlign: 'left',
          }}>
          {item.prescriptionItem.medicine.medicineName || 'Tên thuốc'}
        </TextComponent>
        <TextComponent
          color={'#6d6d6d'}
          fontSize={14}
          fontWeight="400"
          style={{
            paddingTop: 6,
            letterSpacing: 0.3,
          }}>
          Số viên còn lại: {`${item.medicineReminder?.remainingAmount || 0} `}
          {getMedicineUnit(item.prescriptionItem.medicine.unit || 'viên')}
        </TextComponent>

        <View style={styles.patientInfo}>
          <TextComponent
            color={appColors.darkGray}
            fontSize={10}
            fontWeight="500">
            Dự kiến kết thúc ngày:{' '}
            {dayjs(item.medicineReminder?.endDate).format('DD/MM/YYYY') ||
              'Chưa có'}
          </TextComponent>
        </View>
      </View>
      <View style={styles.viewOptines}>
        {isUse ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ScheduleMedicationRemindersScreen', {
                isEdit: isUse,
                medicationInfo: item,
                patientProfileId,
              })
            }
            style={styles.optionsWrapper}>
            <View
              style={[
                styles.options,
                {
                  borderColor: appColors.black,
                },
              ]}>
              <Pencil size={18} color={appColors.black} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ScheduleMedicationRemindersScreen', {
                isEdit: isUse,
                medicationInfo: item,
                patientProfileId,
              })
            }
            style={styles.optionsWrapper}>
            <View
              style={[
                styles.options,
                {
                  borderColor: appColors.black,
                },
              ]}>
              <RotateCcw size={18} color={appColors.black} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MedicineInfoInMyMedicineBoxComponent;

const styles = StyleSheet.create({
  container: {
    borderColor: appColors.grayLine,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    marginTop: 12,
  },
  viewInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  patientInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(181, 181, 181, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 20,
    borderRadius: 10,
  },
  viewOptines: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    borderRadius: 20,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
