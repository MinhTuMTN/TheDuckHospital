import {Banknote, Eye, EyeOff, ScanLine} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  NotFoundComponent,
  Space,
  TextComponent,
} from '../../../components';
import LoginRequireComponent from '../../../components/LoginRequireComponent';
import RequestPinCodeComponent from '../../../components/patient/walletScreen/RequestPinCodeComponent';
import {appColors} from '../../../constants/appColors';
import {formatCurrency} from '../../../utils/currencyUtils';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import LoadingComponent from '../../../components/LoadingComponent';
import {useAuth} from '../../../hooks/AuthProvider';
import ButtonComponent from '../../../components/ButtonComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getWalletInfo} from '../../../services/walletServices';
import dayjs from 'dayjs';
import {set} from '@gluestack-style/react';
import NotFoundTransaction from '../../../components/patient/walletScreen/NotFoundTransaction';
import TransactionInfoComponent from '../../../components/patient/walletScreen/TransactionInfoComponent';
import {TimeMachine} from '../../../assets/svgs';

const WalletScreen = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const [walletInfo, setWalletInfo] = React.useState({
    balance: 0,
    fullName: '',
    phoneNumber: '',
    walletCreatedAt: '',
    totalThisMonth: 0,
    lastTransactions: [],
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [pinCodeVisible, setPinCodeVisible] = React.useState(true);
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();

  const handleNavigateToTopUp = () => {
    navigation.navigate('TopUpScreen');
  };
  const handleNavigateToPayment = () => {
    navigation.navigate('EnterHospitalPaymentCodeScreen');
  };
  const handleGetWalletInfo = async () => {
    const response = await getWalletInfo();
    setPinCodeVisible(false);

    if (response.success) {
      const data = response.data.data;
      console.log(data);

      setWalletInfo({
        balance: data.balance,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        walletCreatedAt: data.walletCreatedAt,
        totalThisMonth: data.totalThisMonth,
        lastTransactions: data.transactions,
      });
      setIsLoading(false);
    }
  };
  return (
    <LoadingComponent styles={{flex: 1}}>
      <LoginRequireComponent>
        <RequestPinCodeComponent
          onSucess={handleGetWalletInfo}
          visible={pinCodeVisible}>
          <ScrollView>
            <ContainerComponent paddingTop={0}>
              <Header
                title="The Duck Wallet"
                noBackground
                paddingTop={24}
                backgroundColor={appColors.darkBlue}
              />
              <View style={styles.card}>
                <ImageBackground
                  source={require('../../../assets/images/wallet.png')}
                  borderRadius={16}>
                  <View style={styles.paddingCard}>
                    <View style={styles.headerCard}>
                      <View>
                        <TextComponent
                          style={styles.title}
                          color={appColors.textDescription}>
                          Chủ tài khoản
                        </TextComponent>
                        <TextComponent
                          color={appColors.black}
                          fontWeight="500"
                          fontSize={18}>
                          {auth.userInfo.fullName}
                        </TextComponent>
                      </View>
                    </View>
                    <View style={styles.currentBalance}>
                      <TextComponent
                        uppercase
                        color={appColors.textDescription}>
                        Số dư khả dụng
                      </TextComponent>
                      {showBalance ? (
                        <EyeOff
                          size={18}
                          fontWeight={400}
                          color={appColors.textDescription}
                          onPress={() => setShowBalance(false)}
                        />
                      ) : (
                        <Eye
                          size={18}
                          fontWeight={400}
                          color={appColors.textDescription}
                          onPress={() => setShowBalance(true)}
                        />
                      )}
                    </View>
                    <TextComponent
                      style={[
                        styles.balance,
                        {
                          letterSpacing: showBalance ? 0.5 : 6,
                        },
                      ]}>
                      {showBalance
                        ? formatCurrency(auth.userInfo.balance.toString()) +
                          ' VND'
                        : '*******'}
                    </TextComponent>
                    <Space paddingTop={6} />
                    <View style={styles.line}>
                      <View style={styles.infoLine}>
                        <TextComponent
                          fontSize={14}
                          color={appColors.darkGray}
                          fontWeight="500"
                          style={{letterSpacing: 1}}>
                          Số điện thoại
                        </TextComponent>
                        <TextComponent
                          fontWeight="700"
                          fontSize={17}
                          style={{letterSpacing: 1}}>
                          {isLoading ? 'Đang tải...' : walletInfo.phoneNumber}
                        </TextComponent>
                      </View>
                      <View style={[styles.infoLine]}>
                        <TextComponent
                          fontSize={14}
                          textAlign="right"
                          color={appColors.darkGray}
                          fontWeight="500"
                          style={{letterSpacing: 1}}>
                          Ngày tạo
                        </TextComponent>
                        <TextComponent
                          fontWeight="700"
                          fontSize={17}
                          style={{letterSpacing: 1}}>
                          {isLoading
                            ? ''
                            : dayjs(walletInfo.walletCreatedAt).format(
                                'DD/MM/YYYY',
                              )}
                        </TextComponent>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.wrapper}>
                <View style={styles.titleInfo}>
                  <Image
                    source={require('../../../assets/images/walletTitle.png')}
                    style={{
                      width: 35,
                      height: 35,
                      marginRight: 10,
                    }}
                  />
                  <TextComponent
                    fontSize={22}
                    fontWeight="500"
                    color={appColors.black}>
                    Ví của tôi
                  </TextComponent>
                </View>

                <View style={styles.transaction}>
                  <View style={styles.numberOfTransaction}>
                    <TextComponent
                      fontSize={24}
                      fontWeight="700"
                      style={{letterSpacing: 1}}>
                      {formatCurrency(walletInfo.totalThisMonth.toString())} VND
                    </TextComponent>
                    <TextComponent
                      fontSize={14}
                      fontWeight="400"
                      color={appColors.textDescription}>
                      Giao dịch trong tháng này
                    </TextComponent>
                  </View>

                  <ButtonComponent
                    borderRadius={24}
                    backgroundColor="#00C2FF"
                    fontWeight="500"
                    fontSize={16}
                    textAlignment="center"
                    textStyles={
                      {
                        //backgroundColor: '#ff6200',
                      }
                    }
                    containerStyles={{
                      elevation: 10,
                      shadowColor: appColors.primary,
                      flexDirection: 'row',
                      paddingHorizontal: 16,
                    }}
                    endIcon={
                      <MaterialIcons
                        name="navigate-next"
                        color={appColors.white}
                        size={24}
                        style={{
                          marginRight: -8,
                        }}
                      />
                    }>
                    Thống kê
                  </ButtonComponent>
                </View>

                <View style={styles.functWrapper}>
                  <TouchableOpacity
                    onPress={handleNavigateToTopUp}
                    style={styles.funct}>
                    <Image
                      source={require('../../../assets/images/deposit.png')}
                      style={{
                        width: 45,
                        height: 45,
                        marginRight: 8,
                      }}
                    />
                    <TextComponent fontWeight="500">Nạp tiền</TextComponent>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNavigateToPayment}
                    style={styles.funct}>
                    <Image
                      source={require('../../../assets/images/qrCode.png')}
                      style={{
                        width: 45,
                        height: 45,
                        marginRight: 8,
                      }}
                    />
                    <TextComponent fontWeight="500">Quét QR</TextComponent>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.wrapper, {marginTop: 24}]}>
                <FlexComponent
                  style={styles.titleInfo}
                  justifyContent="space-between">
                  <FlexComponent direction="row">
                    <TimeMachine
                      width={35}
                      height={35}
                      style={{marginRight: 10}}
                    />
                    <TextComponent
                      fontSize={22}
                      fontWeight="500"
                      color={appColors.black}>
                      Giao dịch gần đây
                    </TextComponent>
                  </FlexComponent>
                  <Pressable>
                    <TextComponent
                      fontSize={18}
                      fontWeight="600"
                      color={appColors.textDarker}>
                      Xem tất cả
                    </TextComponent>
                  </Pressable>
                </FlexComponent>
                {walletInfo.lastTransactions?.length > 0 ? (
                  walletInfo.lastTransactions?.map((transaction, index) => (
                    <TransactionInfoComponent
                      key={index}
                      transaction={transaction}
                    />
                  ))
                ) : (
                  <NotFoundTransaction />
                )}
              </View>
            </ContainerComponent>
          </ScrollView>
        </RequestPinCodeComponent>
      </LoginRequireComponent>
    </LoadingComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 12,
    shadowColor: appColors.black,
    borderRadius: 16,
    borderBlockColor: appColors.primaryDark,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paddingCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  currentBalance: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: appColors.black,
  },

  line: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLine: {
    flexDirection: 'column',
  },
  wrapper: {
    paddingTop: 8,
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    marginTop: 8,
    borderRadius: 20,
    elevation: 10,
    shadowColor: appColors.black,
  },
  numberOfTransaction: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  functWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  funct: {
    width: '47%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    elevation: 10,
    shadowColor: appColors.black,
    alignItems: 'center',
  },
});

export default WalletScreen;
