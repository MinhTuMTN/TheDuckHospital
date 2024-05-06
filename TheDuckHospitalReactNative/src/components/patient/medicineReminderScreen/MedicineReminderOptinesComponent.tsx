import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {useMedicine} from '../../../services/reminderServices';

interface MedicineReminderOptinesComponentProps {
  medicineReminder: any;
  onRefresh?: (isLoading: boolean) => void;
}
const MedicineReminderOptinesComponent = (
  props: MedicineReminderOptinesComponentProps,
) => {
  const {medicineReminder} = props;

  const handleUseMedicine = useCallback(
    async (type: 'used' | 'ignore') => {
      const response = await useMedicine(
        medicineReminder.medicineReminderId,
        medicineReminder.medicineReminderDetailId,
        type,
      );
      console.log(response);

      if (response.success && props.onRefresh) {
        props.onRefresh(false);
      }
    },
    [medicineReminder, props.onRefresh],
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewInfo}>
        <TextComponent
          color={appColors.black}
          fontSize={18}
          fontWeight="600"
          style={{
            elevation: 0.5,
            letterSpacing: 0.5,
          }}>
          {medicineReminder.medicineName}
        </TextComponent>
        <TextComponent
          color={'#6d6d6d'}
          fontSize={14}
          fontWeight="400"
          style={{
            paddingTop: 6,
            letterSpacing: 0.3,
          }}>
          Uống {medicineReminder.amount.toString()} viên lúc{' '}
          {dayjs(medicineReminder.reminderTime).format('HH:mm')}
        </TextComponent>
        <TextComponent
          color={'#FF7A00'}
          fontSize={13}
          fontWeight="500"
          style={{
            paddingTop: 4,
            letterSpacing: 0.3,
          }}>
          {medicineReminder.remainingAmount} viên còn lại
        </TextComponent>

        <View style={styles.patientInfo}>
          <TextComponent
            color={appColors.darkGray}
            fontSize={10}
            fontWeight="500">
            {medicineReminder.fullName}
          </TextComponent>
        </View>
      </View>
      <View style={styles.viewOptines}>
        {!medicineReminder.used && !medicineReminder.ignore && (
          <>
            <TouchableOpacity
              onPress={() => handleUseMedicine('ignore')}
              style={styles.optionsWrapper}>
              <View
                style={[
                  styles.options,
                  {
                    borderColor: appColors.darkRed,
                    marginBottom: 4,
                  },
                ]}>
                <AntDesign name="close" size={18} color={appColors.darkRed} />
              </View>
              <TextComponent
                fontSize={14}
                color={appColors.darkRed}
                fontWeight="500">
                Bỏ qua
              </TextComponent>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUseMedicine('used')}
              style={[
                styles.optionsWrapper,
                {
                  marginLeft: 20,
                },
              ]}>
              <View
                style={[
                  styles.options,
                  {
                    borderColor: appColors.darkerBlue,
                    marginBottom: 4,
                  },
                ]}>
                <Ionicons
                  name="checkmark-sharp"
                  size={18}
                  color={appColors.darkerBlue}
                />
              </View>
              <TextComponent
                fontSize={14}
                color={appColors.darkerBlue}
                fontWeight="500">
                Dùng
              </TextComponent>
            </TouchableOpacity>
          </>
        )}
        {medicineReminder.ignore && (
          <TouchableOpacity
            onPress={() => handleUseMedicine('ignore')}
            style={[
              styles.optionsWrapper,
              {
                paddingRight: 9,
              },
            ]}>
            <View
              style={[
                styles.options,
                {
                  borderColor: appColors.darkRed,
                  backgroundColor: appColors.darkRed,
                  marginBottom: 4,
                },
              ]}>
              <AntDesign name="close" size={18} color={appColors.white} />
            </View>
            <TextComponent
              fontSize={14}
              color={appColors.darkRed}
              fontWeight="500">
              Bỏ qua
            </TextComponent>
          </TouchableOpacity>
        )}
        {medicineReminder.used && (
          <TouchableOpacity
            onPress={() => handleUseMedicine('used')}
            style={[
              styles.optionsWrapper,
              {
                paddingRight: 5,
              },
            ]}>
            <View
              style={[
                styles.options,
                {
                  borderColor: appColors.darkerBlue,
                  backgroundColor: appColors.darkerBlue,
                  marginBottom: 4,
                },
              ]}>
              <Ionicons
                name="checkmark-sharp"
                size={18}
                color={appColors.white}
              />
            </View>
            <TextComponent
              fontSize={14}
              color={appColors.darkerBlue}
              fontWeight="500">
              Đã dùng
            </TextComponent>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MedicineReminderOptinesComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: appColors.grayLine,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
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
    flexDirection: 'row',
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
