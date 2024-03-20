import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ContainerComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LineInfoComponent from '../../../components/LineInfoComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Done} from '../../../assets/svgs';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import dayjs from 'dayjs';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import {formatCurrency} from '../../../utils/currencyUtils';
import ButtonComponent from '../../../components/ButtonComponent';
import {createBooking} from '../../../services/bookingServices';

const BillingInformationScreen = ({route}: {route: any}) => {
  const {data, profile} = route.params;

  const [paymentLoading, setPaymentLoading] = React.useState(false);

  const navigation = useNavigation<navigationProps>();
  const handleNavigatPaymentScreen = () => {
    navigation.navigate('PaymentScreen');
  };
  const handleBookingPayment = async () => {
    setPaymentLoading(true);
    const response = await createBooking(
      profile?.patientProfileId,
      [data?.timeSlot?.timeSlotId],
      'MOMO',
      true,
    );
    setPaymentLoading(false);

    if (response.success) {
      if (response.data?.data?.deepLink) {
        Linking.openURL(response.data.data.deepLink);
      } else if (response.data?.data?.paymentUrl) {
        Linking.openURL(response.data.data.paymentUrl);
      }
    } else {
      console.log('Payment failed');
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Thông tin thanh toán"
          paddingStart={15}
          paddingTop={40}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <View style={styles.container}>
          <View style={styles.note}>
            <AntDesign name="infocirlceo" size={19} color={appColors.primary} />
            <TextComponent
              paddingStart={6}
              fontSize={14}
              style={{color: appColors.primary}}
              italic
              fontWeight="400">
              Vui lòng kiểm tra lại thông tin trước khi thanh toán
            </TextComponent>
          </View>
          <View style={styles.overlay}>
            <ScrollView>
              <View style={styles.myInfo}>
                <TextComponent
                  color={appColors.primaryLable}
                  fontWeight="600"
                  fontSize={20}>
                  Thông tin bệnh nhân
                </TextComponent>
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <Ionicons
                      name="person-circle-sharp"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={7}
                  label={profile?.fullName}
                  labelUppercase
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <FontAwesome
                      name="birthday-cake"
                      size={22}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={10}
                  label={dayjs(profile?.dateOfBirth).format('DD/MM/YYYY')}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <FontAwesome
                      name="phone"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={12}
                  label={profile?.phoneNumber}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <Ionicons
                      name="location-sharp"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={6}
                  label={`${profile?.streetName}, ${profile?.ward?.wardName}, ${profile?.district?.districtName}, ${profile?.province?.provinceName}`}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'justify',
                  }}
                />
              </View>
              <View style={styles.bookingInfo}>
                <TextComponent
                  color={appColors.primaryLable}
                  fontWeight="600"
                  fontSize={20}>
                  Thông tin đặt khám
                </TextComponent>
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Bác sĩ"
                  value={data?.doctorName}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                  valueStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                  labelColor={appColors.grayText}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Dịch vụ khám"
                  value="Khám dịch vụ"
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                  valueStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                  labelColor={appColors.grayText}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Chuyên khoa"
                  value={data?.departmentName}
                  valueUppercase
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                  valueStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                  labelColor={appColors.grayText}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Ngày khám"
                  value={data?.selectedDay}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                  valueStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                  labelColor={appColors.grayText}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Giờ khám"
                  value={getTimeSlotById(data?.timeSlot?.timeId)}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'left',
                  }}
                  valueStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                  labelColor={appColors.grayText}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.bill}>
            <View style={styles.headerBill}>
              <TextComponent
                color={appColors.primaryLable}
                fontWeight="600"
                fontSize={20}>
                Chọn phương thức thanh toán
              </TextComponent>
              <MaterialIcons
                name="navigate-next"
                size={30}
                color={appColors.primary}
              />
            </View>
            <View style={styles.mainBill}>
              <LineInfoComponent
                label="Tiền khám"
                value={formatCurrency(data?.price) + 'đ'}
                labelStyles={{
                  fontSize: 15,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Phí tiện ích + TGTT"
                value={formatCurrency('15000') + 'đ'}
                labelStyles={{
                  fontSize: 15,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Tổng tiền"
                value={
                  formatCurrency((parseFloat(data?.price) + 15000).toString()) +
                  'đ'
                }
                labelStyles={{
                  fontSize: 16,
                  fontWeight: '500',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 16,
                  fontWeight: '700',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={'red'}
              />
              <View style={styles.rule}>
                <Done height={22} width={22} />
                <TextComponent
                  color={appColors.grayText}
                  fontSize={10}
                  paddingStart={8}
                  flex={1}
                  textAlign="justify"
                  flexWrap="wrap">
                  Tôi đồng ý Phí tiện ý TheDuck Hospital cung cấp để đặt khám,
                  thanh toán viện phí, đây không phải là dịch vụ bắt buộc bởi cơ
                  sở ý tế.
                </TextComponent>
              </View>
              <ButtonComponent
                onPress={handleBookingPayment}
                borderRadius={40}
                isLoading={paymentLoading}
                textStyles={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
                containerStyles={{
                  marginTop: 20,
                  padding: 15,
                }}>
                Thanh toán
              </ButtonComponent>
            </View>
          </View>
        </View>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default BillingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  overlay: {
    flex: 1,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(226, 245, 245, 0.51)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  myInfo: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
  },

  bookingInfo: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bill: {
    width: '100%',
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    backgroundColor: appColors.white,
  },
  headerBill: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
  },
  mainBill: {
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingVertical: 15,
  },
  line: {
    paddingVertical: 5,
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
  rule: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: appColors.primary,
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
