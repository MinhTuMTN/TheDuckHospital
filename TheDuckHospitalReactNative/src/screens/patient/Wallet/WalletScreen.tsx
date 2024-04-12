import {Banknote, Eye, EyeOff, ScanLine} from 'lucide-react-native';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {ContainerComponent, Space, TextComponent} from '../../../components';
import LoginRequireComponent from '../../../components/LoginRequireComponent';
import RequestPinCodeComponent from '../../../components/patient/walletScreen/RequestPinCodeComponent';
import {appColors} from '../../../constants/appColors';
import {formatCurrency} from '../../../utils/currencyUtils';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const WalletScreen = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const navigation = useNavigation<navigationProps>();

  const handleNavigateToTopUp = () => {
    navigation.navigate('TopUpScreen');
  };
  return (
    <LoginRequireComponent>
      <RequestPinCodeComponent>
        <ContainerComponent>
          <View style={styles.card}>
            <View style={styles.headerCard}>
              <Image
                source={require('../../../assets/images/avatar-meo.jpg')}
                style={styles.image}
              />
              <View>
                <TextComponent style={styles.title} color={appColors.white}>
                  Xin chào
                </TextComponent>
                <TextComponent color={appColors.white} fontWeight="500">
                  Nguyễn Hạ Băng
                </TextComponent>
              </View>
            </View>
            <View style={styles.currentBalance}>
              <TextComponent color={appColors.white}>
                Số dư hiện tại
              </TextComponent>
              {showBalance ? (
                <EyeOff
                  size={18}
                  fontWeight={400}
                  color={appColors.white}
                  onPress={() => setShowBalance(false)}
                />
              ) : (
                <Eye
                  size={18}
                  fontWeight={400}
                  color={appColors.white}
                  onPress={() => setShowBalance(true)}
                />
              )}
            </View>
            <TextComponent
              style={[
                styles.balance,
                {
                  letterSpacing: showBalance ? 0 : 4,
                },
              ]}>
              {showBalance ? formatCurrency('777777') + ' VND' : '*******'}
            </TextComponent>
            <Space paddingTop={8} />
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
          </View>
        </ContainerComponent>
      </RequestPinCodeComponent>
    </LoginRequireComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: appColors.primary,
    margin: 16,
    borderRadius: 36,
    elevation: 4,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  },
  currentBalance: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: appColors.white,
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
