import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AlarmClock,
  Calendar7,
  Doctor,
  Hospital,
  Trash,
} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';
import {formatCurrency} from '../../../utils/currencyUtils';
import {formatDate} from '../../../utils/dateUtils';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import LineComfirmBookingInfo from './LineComfirmBookingInfo';
import {useTranslation} from 'react-i18next';

interface InfoBookingComponentProps {
  item: any;
  onDelete?: () => void;
}

const InfoBookingComponent = (props: InfoBookingComponentProps) => {
  const {item, onDelete} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <LineComfirmBookingInfo
        label={t('confirmBookingInformationInBooking.department')}
        value={item?.departmentName}
        isDepartment
        image={<Hospital />}
      />
      <LineComfirmBookingInfo
        label={t('confirmBookingInformationInBooking.doctor')}
        value={item?.doctorName}
        image={<Doctor />}
      />
      <LineComfirmBookingInfo
        label={t('confirmBookingInformationInBooking.date')}
        value={formatDate(item?.timeSlot?.date)}
        image={<Calendar7 />}
      />
      <LineComfirmBookingInfo
        label={t('confirmBookingInformationInBooking.time')}
        value={getTimeSlotById(item?.timeSlot?.timeId)}
        image={<AlarmClock />}
      />
      <LineComfirmBookingInfo
        label={t('confirmBookingInformationInBooking.fee')}
        value={formatCurrency(item?.price) + 'đ'}
        image={<Hospital />}
      />
      <View style={styles.button}>
        <Trash width={20} height={20} onPress={onDelete && onDelete} />
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
