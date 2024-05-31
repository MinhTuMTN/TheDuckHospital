import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Done} from '../../../assets/svgs';
import {
  ContainerComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LineInfoComponent from '../../../components/LineInfoComponent';
import {appColors} from '../../../constants/appColors';
import {createBooking} from '../../../services/bookingServices';
import {RootState, navigationProps} from '../../../types';
import {formatCurrency} from '../../../utils/currencyUtils';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import {useTranslation} from 'react-i18next';
import {useToast} from '../../../hooks/ToastProvider';
import {useSelector} from 'react-redux';
import RequestPinCodeComponent from '../../../components/patient/walletScreen/RequestPinCodeComponent';

const BillingInformationScreen = ({route}: {route: any}) => {
  const {timeSlots, profile} = route.params;

  const [paymentLoading, setPaymentLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pinCodeVisible, setPinCodeVisible] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<
    'MOMO' | 'VNPAY' | 'WALLET' | ''
  >('MOMO');

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const totalAmount = React.useMemo(() => {
    return timeSlots?.reduce((total: number, item: any) => {
      return total + item.price;
    }, 0);
  }, [timeSlots]);

  const handlePaymentWithWallet = async () => {
    if (userInfo.balance && userInfo?.balance < totalAmount) {
      toast?.showToast(t('billingInformation.notEnoughMoney'));
      return;
    }
    setPinCodeVisible(true);
  };

  const handleBookingPayment = async (pinCode: string = '') => {
    setPaymentLoading(true);
    const response = await createBooking(
      profile?.patientProfileId,
      timeSlots.map((item: any) => item?.timeSlot?.timeSlotId),
      paymentMethod,
      true,
      pinCode,
    );
    setPaymentLoading(false);

    console.log(response.data);

    if (response.success) {
      if (paymentMethod === 'WALLET') {
        const walletSuccess = response.data?.data?.walletSuccess;
        if (walletSuccess) {
          toast?.showToast(t('billingInformation.success'));
          navigation.navigate('HomeScreen');
          return;
        } else {
          toast?.showToast(t('billingInformation.fail'));
          return;
        }
      }
      if (response.data?.data?.deepLink) {
        Linking.openURL(response.data.data.deepLink);
      } else if (response.data?.data?.paymentUrl) {
        // navigation.navigate('HomeScreen');
        // Linking.openURL(response.data.data.paymentUrl);

        navigation.navigate('WebViewScreen', {
          url: response.data.data.paymentUrl,
        });
      }
    } else {
      const errorCode = response.statusCode;
      if (errorCode === 10030)
        toast?.showToast(t('billingInformation.notEnoughMoney'));
      else toast?.showToast(t('billingInformation.fail'));
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title={t('billingInformation.title')}
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
              {t('billingInformation.note')}
            </TextComponent>
          </View>
          <View style={styles.overlay}>
            <ScrollView>
              <View style={styles.myInfo}>
                <TextComponent
                  color={appColors.primaryLable}
                  fontWeight="600"
                  fontSize={20}>
                  {t('billingInformation.patientInformation')}
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
                  {t('billingInformation.bookingInformation')}
                </TextComponent>
                <Space paddingTop={5} />
                {timeSlots?.map((data: any, index: number) => (
                  <View
                    key={`time-slot-${index}`}
                    style={{
                      marginBottom: 16,
                    }}>
                    <LineInfoComponent
                      label={t('billingInformation.doctor')}
                      valueTextAlign="right"
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
                      label={t('billingInformation.typeOfService')}
                      value={t('billingInformation.serviceExamination')}
                      valueTextAlign="right"
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
                      label={t('billingInformation.department')}
                      valueTextAlign="right"
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
                      label={t('billingInformation.date')}
                      valueTextAlign="right"
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
                      label={t('billingInformation.time')}
                      valueTextAlign="right"
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
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.bill}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.headerBill}>
              {paymentMethod === '' ? (
                <>
                  <TextComponent
                    color={appColors.primaryLable}
                    fontWeight="600"
                    fontSize={20}>
                    {t('billingInformation.choosePaymentMethod')}
                  </TextComponent>
                </>
              ) : paymentMethod === 'MOMO' ? (
                <View style={styles.isChoose}>
                  <Image
                    source={require('../../../assets/images/MoMo_Logo.png')}
                    style={{width: 30, height: 30}}
                  />
                  <TextComponent
                    fontWeight="500"
                    fontSize={17}
                    color={appColors.black}
                    style={{marginLeft: 10, letterSpacing: 0.2}}>
                    {t('billingInformation.momoE-wallet')}
                  </TextComponent>
                </View>
              ) : paymentMethod === 'WALLET' ? (
                <View style={styles.isChoose}>
                  <Image
                    source={require('../../../assets/images/logo-text-small.png')}
                    style={{width: 30, height: 30}}
                  />
                  <TextComponent
                    fontWeight="500"
                    fontSize={17}
                    color={appColors.black}
                    style={{marginLeft: 10, letterSpacing: 0.2}}>
                    The Duck Wallet
                  </TextComponent>
                </View>
              ) : (
                <View style={styles.isChoose}>
                  <Image
                    source={require('../../../assets/images/VNPay.png')}
                    style={{width: 30, height: 30}}
                  />
                  <TextComponent
                    fontWeight="500"
                    fontSize={17}
                    color={appColors.black}
                    style={{marginLeft: 10, letterSpacing: 0.2}}>
                    {t('billingInformation.vnpayE-wallet')}
                  </TextComponent>
                </View>
              )}
              <MaterialIcons
                name="navigate-next"
                size={30}
                color={appColors.primary}
              />
            </TouchableOpacity>
            <View style={styles.mainBill}>
              <LineInfoComponent
                label={t('billingInformation.fee')}
                valueTextAlign="right"
                value={formatCurrency(totalAmount) + 'đ'}
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
                label={t('billingInformation.otherFee')}
                valueTextAlign="right"
                value={
                  paymentMethod === 'WALLET'
                    ? '0đ'
                    : formatCurrency('15000') + 'đ'
                }
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
                label={t('billingInformation.total')}
                valueTextAlign="right"
                value={
                  formatCurrency(
                    (
                      parseFloat(totalAmount) +
                      (paymentMethod === 'WALLET' ? 0 : 15000)
                    ).toString(),
                  ) + 'đ'
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
                  {t('billingInformation.confirmNote')}
                </TextComponent>
              </View>
              <ButtonComponent
                onPress={
                  paymentMethod === 'WALLET'
                    ? handlePaymentWithWallet
                    : handleBookingPayment
                }
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
                {t('billingInformation.payment')}
              </ButtonComponent>
            </View>
          </View>
        </View>
        <Modal
          statusBarTranslucent
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.containerModal}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderBottomColor: appColors.grayLine,
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <TextComponent
                  color={appColors.black}
                  fontWeight="600"
                  fontSize={18}>
                  Chọn Phương Thức Thanh Toán
                </TextComponent>
                <Pressable onPress={() => setModalVisible(false)}>
                  <AntDesign
                    name="close"
                    size={22}
                    color={appColors.grayLight}
                  />
                </Pressable>
              </View>
              {userInfo.balance && (
                <Pressable
                  style={[
                    styles.option,
                    {
                      borderBottomColor: appColors.grayLine,
                      borderBottomWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setPaymentMethod('WALLET');
                    setModalVisible(false);
                  }}>
                  <Image
                    source={require('../../../assets/images/logo-text-small.png')}
                    style={{width: 30, height: 30}}
                  />
                  <TextComponent
                    fontWeight="400"
                    fontSize={16}
                    color={appColors.black}
                    style={{marginLeft: 10, letterSpacing: 0.2}}>
                    The Duck Wallet
                  </TextComponent>
                </Pressable>
              )}
              <Pressable
                style={[
                  styles.option,
                  {
                    borderBottomColor: appColors.grayLine,
                    borderBottomWidth: 1,
                  },
                ]}
                onPress={() => {
                  setPaymentMethod('MOMO');
                  setModalVisible(false);
                }}>
                <Image
                  source={require('../../../assets/images/MoMo_Logo.png')}
                  style={{width: 30, height: 30}}
                />
                <TextComponent
                  fontWeight="400"
                  fontSize={16}
                  color={appColors.black}
                  style={{marginLeft: 10, letterSpacing: 0.2}}>
                  Ví điện tử Momo
                </TextComponent>
              </Pressable>
              <Pressable
                style={styles.option}
                onPress={() => {
                  setPaymentMethod('VNPAY');
                  setModalVisible(false);
                }}>
                <Image
                  source={require('../../../assets/images/VNPay.png')}
                  style={{width: 30, height: 30}}
                />
                <TextComponent
                  fontWeight="400"
                  fontSize={16}
                  color={appColors.black}
                  style={{marginLeft: 10, letterSpacing: 0.2}}>
                  Ví điện tử VNPay
                </TextComponent>
              </Pressable>
            </View>
          </View>
        </Modal>
        <RequestPinCodeComponent
          visible={pinCodeVisible}
          onClosed={() => {
            setPinCodeVisible(false);
          }}
          onSucess={async (pinCode: string) => {
            setPinCodeVisible(false);
            handleBookingPayment(pinCode);
          }}
        />
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
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
  },
  isChoose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});
