import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Space, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {formatDate} from '../../../utils/dateUtils';
import {formatCurrency} from '../../../utils/currencyUtils';
import dayjs from 'dayjs';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';

const DividerItem = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLeft} />
      <View style={styles.dividerCenter} />
      <View style={styles.dividerRight} />
    </View>
  );
};

interface DetailsMedicalBillComponentProps {
  booking: any;
}

const DetailsMedicalBillComponent = (
  props: DetailsMedicalBillComponentProps,
) => {
  const {booking} = props;
  console.log(booking.date);

  const navigation = useNavigation<navigationProps>();

  const handleClickViewDetails = () => {
    navigation.navigate('MedicalExaminationHistoryScreen');
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', rowGap: 8}}>
        <TextComponent fontWeight="500">The Duck Hospital</TextComponent>
        <TextComponent fontWeight="600" uppercase fontSize={20}>
          Phiếu khám bệnh
        </TextComponent>
        <TextComponent fontWeight="500">{`(Mã phiếu: ${booking?.bookingCode})`}</TextComponent>
        <TextComponent fontWeight="500">{booking?.roomArea}</TextComponent>
        <TextComponent fontWeight="500">
          Phòng khám: Phòng {booking?.roomName}
        </TextComponent>
        <TextComponent fontWeight="500">
          Chuyên khoa:{' '}
          <TextComponent uppercase fontWeight="500">
            {booking?.departmentName}
          </TextComponent>
        </TextComponent>
        <TextComponent
          fontSize={50}
          bold
          color={booking.status ? appColors.disabled : appColors.primary}>
          {(booking?.queueNumber as string)?.toString().padStart(2, '0')}
        </TextComponent>
        <TextComponent italic>
          {booking.status ? '(Đã khám)' : `(Chưa khám)`}
        </TextComponent>
        {booking.status && (
          <Pressable onPress={handleClickViewDetails}>
            <TextComponent color={appColors.primary} italic>
              Xem chi tiết tại đây
            </TextComponent>
          </Pressable>
        )}
      </View>
      <Space paddingBottom={16} />
      <View style={{rowGap: 8}}>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Ngày khám:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {dayjs(booking.date).format('DD-MM-YYYY')} (
            {booking?.scheduleType === 'MORNING' ? 'Buổi sáng' : 'Buổi chiều'})
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Giờ khám:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {getTimeSlotById(booking?.timeId)}
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Họ tên:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3} uppercase>
            {booking?.patientName}
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Giới tính:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {booking?.patientGender === 'MALE' ? 'Nam' : 'Nữ'}
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Ngày sinh:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {dayjs(booking?.patientDateOfBirth).format('DD-MM-YYYY')}
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Tỉnh/TP:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {booking?.patientProvince}
          </TextComponent>
        </View>
        <View style={styles.rowItem}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            flex={1}>
            Tiền khám:
          </TextComponent>
          <TextComponent fontWeight="500" flex={3}>
            {formatCurrency(booking?.price)} đ
          </TextComponent>
        </View>
        <TextComponent fontSize={14} color={appColors.textDescription} italic>
          Vui lòng đến thực tiếp phòng khám trước giờ hẹn 15-30 phút để được
          khám bệnh.
        </TextComponent>
      </View>

      <DividerItem />

      <View style={styles.codeInfo}>
        <View>
          <TextComponent fontWeight="500" fontSize={14}>
            Số hồ sơ (Mã bệnh nhân)
          </TextComponent>
          <TextComponent fontWeight="500" fontSize={14}>
            {booking?.patientCode || 'Đang cập nhật'}
          </TextComponent>
        </View>
        <Barcode
          value={booking?.bookingCode || '12345678'}
          text={booking?.bookingCode || '12345678'}
          format="CODE128"
          height={60}
          maxWidth={120}
          textStyle={{
            color: appColors.black,
            fontWeight: '500',
          }}
        />
      </View>

      <Space paddingTop={60} />

      <TextComponent
        fontSize={12.8}
        style={{
          paddingHorizontal: 8,
        }}
        italic
        color={appColors.textDescription}
        fontWeight="600"
        textAlign="center">
        Ghi chú:{' '}
        <TextComponent color={appColors.textDescription} italic fontSize={12.8}>
          Phiếu khám bệnh chỉ có giá trị trong ngày đã đặt khám từ
        </TextComponent>{' '}
        <TextComponent italic fontWeight="600" fontSize={12.8}>
          6h30-16h30 (Thứ 2 đến thứ 6 trong tuần)
        </TextComponent>
      </TextComponent>

      <DividerItem />

      <View>
        <TextComponent textAlign="center" color={appColors.primary} bold>
          THE DUCK HOSPITAL
        </TextComponent>
        <TextComponent
          textAlign="center"
          color={appColors.textDescription}
          fontSize={11}
          fontWeight="500">
          Đặt lịch khám tại bệnh viện - Phòng khám hàng đầu tại Việt Nam
        </TextComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  rowItem: {
    flexDirection: 'row',
  },
  divider: {
    marginVertical: 16,
  },
  dividerCenter: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.textDescription,
    borderStyle: 'dashed',
    borderCurve: 'continuous',
  },
  dividerLeft: {
    width: 23,
    height: 23,
    backgroundColor: appColors.backgroundGray,
    borderRadius: 10,
    position: 'absolute',
    left: -20,
    top: -10,
    zIndex: 1,
  },
  dividerRight: {
    width: 23,
    height: 23,
    backgroundColor: appColors.backgroundGray,
    borderRadius: 10,
    position: 'absolute',
    right: -20,
    top: -10,
    zIndex: 1,
  },
  container: {
    backgroundColor: appColors.white,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginVertical: 16,
  },
});
export default DetailsMedicalBillComponent;
