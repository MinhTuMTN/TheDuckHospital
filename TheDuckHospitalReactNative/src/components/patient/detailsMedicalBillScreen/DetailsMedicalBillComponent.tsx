import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Space, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const DividerItem = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLeft} />
      <View style={styles.dividerCenter} />
      <View style={styles.dividerRight} />
    </View>
  );
};

const DetailsMedicalBillComponent = () => {
  const [status, setStatus] = React.useState(true);

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
        <TextComponent fontWeight="500">{`(Mã phiếu: A2306152305)`}</TextComponent>
        <TextComponent fontWeight="500">Lầu 1 - Khu B</TextComponent>
        <TextComponent fontWeight="500">Phòng khám: Phòng 77</TextComponent>
        <TextComponent fontWeight="500">
          Chuyên khoa:{' '}
          <TextComponent uppercase fontWeight="500">
            Tổng quát
          </TextComponent>
        </TextComponent>
        <TextComponent
          fontSize={50}
          bold
          color={status ? appColors.disabled : appColors.primary}>
          07
        </TextComponent>
        <TextComponent italic>
          {status ? '(Đã khám)' : `(Chưa khám)`}
        </TextComponent>
        {status && (
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
            24-02-2024 (Buổi sáng)
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
            8:00
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
            Nguyễn Văn Minh A
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
            Nam
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
            24-01-1999
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
            TP. Hồ Chí Minh
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
            150.000 đ
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
            Đang cập nhật
          </TextComponent>
        </View>
        <Barcode
          value="A2306152305"
          text="A2306152305"
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
