import React, {useCallback, useMemo} from 'react';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LineInfoComponent from '../../../components/LineInfoComponent';
import RequestPinCodeComponent from '../../../components/patient/walletScreen/RequestPinCodeComponent';
import {appColors} from '../../../constants/appColors';
import {useAuth} from '../../../hooks/AuthProvider';
import {useToast} from '../../../hooks/ToastProvider';
import {formatCurrency} from '../../../utils/currencyUtils';
import LoadingComponent from '../../../components/LoadingComponent';
import {topUpWallet} from '../../../services/walletServices';

const TopUpScreen = () => {
  const [amount, setAmount] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState<
    'MOMO' | 'VNPAY' | ''
  >('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pinCodeVisible, setPinCodeVisible] = React.useState(false);

  const quickButton = useMemo(() => {
    return [100000, 200000, 500000, 1000000, 2000000, 5000000].map(
      (item, index) => {
        return (
          <ButtonComponent
            key={`quick-button-${index}`}
            containerStyles={[
              styles.quickButton,
              amount === item && {borderColor: appColors.primary},
            ]}
            onPress={() => {
              setAmount(item);
            }}>
            <TextComponent
              fontWeight={amount === item ? '400' : '300'}
              fontSize={17}
              color={amount === item ? appColors.primary : appColors.grayText}>
              {formatCurrency(item.toString())}
            </TextComponent>
          </ButtonComponent>
        );
      },
    );
  }, [amount]);

  const toast = useToast();
  const auth = useAuth();

  const handlePayment = async () => {
    if (paymentMethod === '') {
      toast.showToast('Vui lòng chọn phương thức thanh toán');
      return;
    }
    setPinCodeVisible(true);
  };

  const handlePinCodeClosed = useCallback(() => {
    setPinCodeVisible(false);
  }, []);

  const handleOnPinCodeSuccess = useCallback(
    async (pinCode: string) => {
      setPinCodeVisible(false);

      console.log(paymentMethod);

      const response = await topUpWallet({
        pinCode,
        amount,
        paymentMethod,
      });

      if (!response.success) {
        toast.showToast('Nạp tiền thất bại. Vui lòng thử lại sau');
        return;
      }

      const data = response.data.data;
      if (data.deepLink) {
        Linking.openURL(data.deepLink);
        return;
      } else {
        Linking.openURL(data.paymentUrl);
        return;
      }
    },
    [toast, amount, paymentMethod],
  );
  return (
    <LoadingComponent styles={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Nạp tiền vào ví"
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
          backgroundColor={'#f8f8f8'}
        />
        <FlexComponent
          style={{backgroundColor: '#f8f8f8', flex: 1}}
          justifyContent="space-between">
          <View style={{paddingTop: 15, paddingHorizontal: 15}}>
            <View style={styles.container}>
              <FlexComponent
                style={{marginBottom: 16}}
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <TextComponent fontWeight="400" fontSize={18}>
                  Số dư ví
                </TextComponent>
                <TextComponent fontWeight="500" fontSize={24}>
                  {formatCurrency(auth.userInfo.balance.toString())} VNĐ
                </TextComponent>
              </FlexComponent>
              <InputComponent
                placeholder="Nhập số tiền"
                value={
                  !amount || amount === 0
                    ? ''
                    : formatCurrency(amount.toString())
                }
                onChangeText={text => {
                  setAmount(parseInt(text.replace(/\D/g, '')));
                }}
                _inputContainerStyle={{
                  height: 60,
                }}
                _inputStyle={{
                  fontSize: 24,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
                keyboardType="number-pad"
                error={amount === 0 || !amount || amount > 5000000}
                errorMessage={
                  amount > 5000000
                    ? 'Số tiền không được vượt quá 5.000.000 VNĐ'
                    : 'Số tiền không được để trống'
                }
                errorMessageStyles={{fontSize: 14}}
              />
            </View>

            <View style={styles.container}>
              <TextComponent fontWeight="500" fontSize={20}>
                Chọn nhanh số tiền
              </TextComponent>
              <FlexComponent
                direction="row"
                style={{
                  flexWrap: 'wrap',
                  columnGap: 6,
                  rowGap: 6,
                  marginTop: 12,
                }}>
                {quickButton}
              </FlexComponent>
            </View>
          </View>

          <View style={[styles.bill]}>
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
                valueTextAlign="right"
                label="Số tiền nạp"
                value={
                  amount > 0 ? formatCurrency(amount.toString()) + 'đ' : '0đ'
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
                valueTextAlign="right"
                label="Phí giao dịch"
                value={amount > 0 ? formatCurrency('1500') + 'đ' : '0đ'}
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
                valueTextAlign="right"
                label="Tổng tiền"
                value={
                  amount > 0
                    ? formatCurrency((amount + 1500).toString()) + 'đ'
                    : '0đ'
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

              <ButtonComponent
                onPress={handlePayment}
                enabled={amount > 0}
                borderRadius={40}
                textStyles={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
                containerStyles={{
                  marginBottom: 16,
                  marginTop: 12,
                  padding: 15,
                }}>
                Thanh toán
              </ButtonComponent>
            </View>
          </View>
        </FlexComponent>

        <Modal
          onRequestClose={() => setModalVisible(false)}
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
          onClosed={handlePinCodeClosed}
          onSucess={handleOnPinCodeSuccess}
        />
      </ContainerComponent>
    </LoadingComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 32,
  },
  quickButton: {
    borderWidth: 1,
    borderColor: appColors.grayText,
    borderRadius: 10,
    backgroundColor: appColors.white,
    flexBasis: '32%',
    paddingVertical: 16,
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
export default TopUpScreen;
