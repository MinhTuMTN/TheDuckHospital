import {Banknote, Eye, EyeOff, ScanLine} from 'lucide-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
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

const WalletScreen = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();

  const handleNavigateToTopUp = () => {
    navigation.navigate('TopUpScreen');
  };
  return (
    <LoadingComponent styles={{flex: 1}}>
      <LoginRequireComponent>
        <RequestPinCodeComponent>
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
                      ? formatCurrency(auth.userInfo.balance.toString()) +
                        ' VND'
                      : '*******'}
                  </TextComponent>
                  <Space paddingTop={6} />
                  <View style={styles.line}>
                    <View style={styles.infoLine}>
                      <TextComponent
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
                      <TextComponent textAlign="right">Ngày tạo</TextComponent>
                      <TextComponent>12/02/2024</TextComponent>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.funcWrapper}>
              <View style={styles.func}>
                <Pressable
                  onPress={handleNavigateToTopUp}
                  style={styles.funcItem}>
                  <Banknote size={28} color={appColors.white} />
                  <TextComponent
                    fontSize={15}
                    fontWeight="400"
                    color={appColors.white}>
                    Nạp tiền
                  </TextComponent>
                </Pressable>
                <View style={styles.funcItem}>
                  <ScanLine size={22} color={appColors.white} />
                  <TextComponent
                    fontSize={15}
                    fontWeight="400"
                    color={appColors.white}>
                    Quét mã QR
                  </TextComponent>
                </View>
              </View>
            </View>
          </ContainerComponent>
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
  funcWrapper: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#ffffff9a',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  func: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: 8,
  },
  funcItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 8,
    backgroundColor: '#acd0dfa7',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 24,
    flex: 1,
  },
});

export default WalletScreen;
