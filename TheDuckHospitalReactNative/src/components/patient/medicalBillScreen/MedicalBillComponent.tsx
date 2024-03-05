import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {Space, TextComponent} from '../..';
import {Check, CircleDashed} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {getDateObject, getDayOfWeek} from '../../../utils/dateUtils';

interface MedicalBillComponentProps {
  booking: any;
  patientName: string;
}

const MedicalBillComponent = (props: MedicalBillComponentProps) => {
  const {booking, patientName} = props;
  const navigation = useNavigation<navigationProps>();

  const handleClick = () => {
    navigation.navigate('DetailsMedicalBillScreen', {
      bookingId: booking.bookingId,
      bookingCode: (booking.bookingId as string)
        .toString()
        .replace('-', '')
        .slice(0, 12),
    });
  };
  return (
    <Pressable onPress={handleClick}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <TextComponent fontWeight="600">The Duck Hospital</TextComponent>
              <TextComponent fontWeight="500" color={appColors.textDescription}>
                {getDayOfWeek(booking.date)},{' '}
                {getDateObject(booking.date).getDate()} tháng{' '}
                {getDateObject(booking.date).getMonth() + 1} năm{' '}
                {getDateObject(booking.date).getFullYear()}
              </TextComponent>
            </View>
            <View
              style={[
                {
                  backgroundColor: booking.status
                    ? appColors.green
                    : appColors.yellow,
                },
                styles.status,
              ]}>
              {booking.status ? (
                <Check size={20} color={appColors.white} />
              ) : (
                <CircleDashed size={20} color={appColors.white} />
              )}
            </View>
          </View>
          <View style={styles.patientDoctor}>
            <TextComponent
              fontWeight="500"
              color={appColors.textDescription}
              style={{flex: 2}}>
              Bệnh nhân:
            </TextComponent>
            <TextComponent fontWeight="500" style={{flex: 4}}>
              {patientName}
            </TextComponent>
          </View>
          <View style={styles.patientDoctor}>
            <TextComponent
              fontWeight="500"
              color={appColors.textDescription}
              style={{flex: 2}}>
              Bác sĩ
            </TextComponent>
            <TextComponent fontWeight="500" style={{flex: 4}}>
              {booking.doctorName}
            </TextComponent>
          </View>
          <View style={styles.additionalInfo}>
            <View>
              <TextComponent fontWeight="500" color={appColors.textDescription}>
                Chuyên khoa
              </TextComponent>
              <Space paddingBottom={0} />
              <TextComponent fontWeight="500">
                {booking.departmentName}
              </TextComponent>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextComponent fontWeight="500" color={appColors.textDescription}>
                Số thứ tự
              </TextComponent>
              <Space paddingBottom={0} />
              <TextComponent fontWeight="500">
                {booking.queueNumber}
              </TextComponent>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TextComponent fontWeight="500" color={appColors.textDescription}>
                Trạng thái
              </TextComponent>
              <Space paddingBottom={0} />
              <TextComponent
                fontWeight="500"
                color={booking.status ? appColors.green : appColors.primary}>
                {booking.status ? 'Đã khám' : 'Chưa khám'}
              </TextComponent>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    marginRight: 8,
    borderRadius: 20,
    padding: 3,
  },
  content: {
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 5,
    rowGap: 8,
  },
  patientDoctor: {
    flexDirection: 'row',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MedicalBillComponent;
