import React, {useState} from 'react';
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
import {formatCurrency} from '../../../utils/currencyUtils';
import {globalStyles} from '../../../styles/globalStyles';
import dayjs from 'dayjs';
import {payment} from '../../../services/payment';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {useToast} from '../../../hooks/ToastProvider';

const HospitalFeePaymentInformationScreen = ({route}: {route: any}) => {
  const [paymentLoading, setPaymentLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const {aboutPayment, medicalCodeId} = route.params;

  const navigation = useNavigation<navigationProps>();
  const toast = useToast();
  const handlePayment = async () => {
    if (paymentMethod === '') {
      toast.showToast('Vui lòng chọn phương thức thanh toán');
      return;
    }
    const data = {
      medicalTestCode: medicalCodeId,
      paymentMethod: paymentMethod,
    };

    setPaymentLoading(true);
    const response = await payment(data);
    setPaymentLoading(false);
    console.log('Response: ', response);

    if (response.success) {
      console.log('Deeplink: ', response.data.data.deepLink);
      console.log('URL: ', response.data.data.paymentUrl);

      if (paymentMethod === 'MOMO')
        Linking.openURL(response.data.data.deepLink);
      else {
        navigation.navigate('HomeScreen');
        Linking.openURL(response.data.data.paymentUrl);
      }
    } else {
      console.log(response.error);

      toast.showToast(response.error);
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
                  label={aboutPayment.patientProfile?.fullName}
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
                  label={dayjs(aboutPayment.patientProfile?.dateOfBirth).format(
                    'DD/MM/YYYY',
                  )}
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
                  label={aboutPayment.patientProfile?.phoneNumber}
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
                  label={aboutPayment.patientProfile?.address}
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

                <View
                  style={{
                    marginBottom: 16,
                  }}>
                  <LineInfoComponent
                    label="Bác sĩ chỉ định"
                    value={aboutPayment.medicalTest?.doctorName}
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
                    label="Chuyên khoa"
                    value={aboutPayment.medicalTest?.departmentName}
                    valueTextAlign="right"
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
                    label="Dịch vụ khám"
                    value={aboutPayment.medicalTest?.serviceName}
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
                    label="Loại dịch vụ"
                    value="Khám dịch vụ"
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
                </View>
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
                    Chọn phương thức thanh toán
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
                    Ví điện tử Momo
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
                    Ví điện tử VNPay
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
                label="Tiền khám"
                value={formatCurrency(aboutPayment.medicalTest?.price) + ' đ'}
                valueTextAlign="right"
                labelStyles={{
                  fontSize: 15,
                  fontWeight: '400',
                }}
                valueStyles={{
                  fontSize: 15,
                  fontWeight: '500',
                }}
                labelColor={appColors.grayText}
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Phí TGTT"
                value={formatCurrency('1500') + ' đ'}
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
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Tổng tiền"
                value={
                  formatCurrency(aboutPayment.medicalTest?.price + 1500) + ' đ'
                }
                valueTextAlign="right"
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
                onPress={handlePayment}
                backgroundColor={appColors.primaryDark}
                borderRadius={30}
                isLoading={paymentLoading}
                textStyles={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
                containerStyles={{
                  marginTop: 15,
                  paddingVertical: 10,
                }}>
                Thanh toán
              </ButtonComponent>
            </View>
          </View>
        </View>
        <Modal
          statusBarTranslucent
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={globalStyles.containerModal}>
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
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default HospitalFeePaymentInformationScreen;

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
    paddingVertical: 20,
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
    marginTop: 15,
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
