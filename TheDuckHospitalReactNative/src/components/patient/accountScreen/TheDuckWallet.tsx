import {WalletMinimal} from 'lucide-react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {AccountScreenRowComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import PopupComponent from '../../PopupComponent';
import {Image} from 'react-native';
import ButtonComponent from '../../ButtonComponent';
import {Bookmark, Clipboard, Secure} from '../../../assets/svgs';
import {useAuth} from '../../../hooks/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const TheDuckWallet = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const {t, i18n} = useTranslation();
  const {userInfo} = useAuth();
  const navigation = useNavigation<navigationProps>();

  const handleWalletClick = () => {
    if (!userInfo.haveWallet) setModalVisible(true);
    else navigation.navigate('WalletScreen');
  };
  const handleOpenWallet = () => {
    setModalVisible(false);
    navigation.navigate('WalletScreen');
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <AccountScreenRowComponent
        title={'The Duck Wallet'}
        icon={<WalletMinimal size={20} color={appColors.black} />}
        onPress={handleWalletClick}
      />
      <PopupComponent
        title={'Khám phá The Duck Wallet'}
        titleStyle={{
          color: appColors.textDarker,
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        variant="default"
        onClose={handleModalClose}
        visible={modalVisible}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/wallet_intro.jpg')}
            style={styles.image}
          />
          <TextComponent fontSize={15.5} color={appColors.textDescription}>
            Quản lý các khoản thanh toán y tế dễ dàng với Ví Điện Tử của chúng
            tôi:
          </TextComponent>
          <View style={styles.content}>
            <Bookmark
              width={28}
              height={28}
              color={appColors.primary}
              style={styles.icon}
            />
            <TextComponent fontWeight="400" color={appColors.textDarker}>
              Đặt khám và thanh toán viện phí trực tuyến
            </TextComponent>
          </View>
          <View style={styles.content}>
            <Clipboard
              width={28}
              height={28}
              color={appColors.primary}
              style={styles.icon}
            />
            <TextComponent fontWeight="400" color={appColors.textDarker}>
              Theo dõi giao dịch và thống kê chi tiêu
            </TextComponent>
          </View>
          <View style={styles.content}>
            <Secure
              width={28}
              height={28}
              color={appColors.primary}
              style={styles.icon}
            />
            <TextComponent fontWeight="400" color={appColors.textDarker}>
              Bảo mật và an toàn tuyệt đối
            </TextComponent>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={handleModalClose}
              containerStyles={styles.button}
              textColor={appColors.textDescription}
              fontWeight="500"
              fontSize={18}>
              Để sau
            </ButtonComponent>
            <ButtonComponent
              onPress={handleOpenWallet}
              containerStyles={styles.button}
              textColor={appColors.primary}
              fontWeight="500"
              fontSize={18}>
              Sử dụng ngay
            </ButtonComponent>
          </View>
        </View>
      </PopupComponent>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 32,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  button: {
    width: '45%',
    backgroundColor: appColors.white,
  },
});
export default TheDuckWallet;
