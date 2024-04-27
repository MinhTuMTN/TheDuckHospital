import {Banknote, Eye, EyeOff, ScanLine} from 'lucide-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerComponent,
  Header,
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

const WalletScreen = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();

  const handleNavigateToTopUp = () => {
    navigation.navigate('TopUpScreen');
  };
  return (
    <LoadingComponent styles={{flex: 1}}>
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
                    Nguyễn Ngọc Hạ Băng
                  </TextComponent>
                </View>
              </View>
              <View style={styles.currentBalance}>
                <TextComponent uppercase color={appColors.textDescription}>
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
                  ? formatCurrency(auth.userInfo.balance.toString()) + ' VND'
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
                    0372717437
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
                    12/02/2024
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
                5.434.000 VND
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
              onPress={() => {
                console.log('Nạp tiền');
              }}
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
              onPress={() => {
                console.log('Quét QR');
              }}
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
      </ContainerComponent>
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
