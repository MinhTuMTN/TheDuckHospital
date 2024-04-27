import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  Bell,
  FolderKanban,
  Headset,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  Share2,
  Star,
  WalletMinimal,
} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  AccountScreenRowComponent,
  ContainerComponent,
  Header,
  SectionComponent,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import ContentComponent from '../../../components/ContentComponent';
import ChangeLanguage from '../../../components/patient/accountScreen/ChangeLanguage';
import {appColors} from '../../../constants/appColors';
import {RootState, navigationProps} from '../../../types';
import {useSelector} from 'react-redux';
import {useAuth} from '../../../hooks/AuthHooks';
import TheDuckWallet from '../../../components/patient/accountScreen/TheDuckWallet';

const AccountScreen = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();
  const tokenRedux = useSelector((state: RootState) => state.auth.token);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const {reset} = useNavigation<navigationProps>();

  const handleBtnLoginClick = () => {
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    const checkLogin = () => {
      const token = tokenRedux;
      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    checkLogin();
  }, [tokenRedux]);
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={''}
        showBackButton={true}
        paddingTop={0}
        noBackground
        backButtonColor={appColors.textDarker}
        backgroundColor={appColors.white}
        paddingBottom={0}
      />

      <ContentComponent style={styles.container} paddingTop={0}>
        <View style={styles.avatarContainer}>
          <Avatar size="lg">
            {isLogged ? (
              <AvatarFallbackText>{userInfo.fullName}</AvatarFallbackText>
            ) : (
              <AvatarImage
                alt="avatar"
                source={require('../../../assets/images/avatar-default.png')}
              />
            )}
          </Avatar>
          <Space paddingBottom={8} />
          {isLogged ? (
            <TextComponent fontSize={20} fontWeight="600">
              {userInfo.fullName}
            </TextComponent>
          ) : (
            <ButtonComponent
              onPress={handleBtnLoginClick}
              containerStyles={{
                backgroundColor: appColors.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              }}>
              {t('account.signIn')}
            </ButtonComponent>
          )}
        </View>

        <SectionComponent
          title={t('account.myWallet')}
          tilteStyle={styles.titleSection}>
          <View style={styles.flexGap}>
            <TheDuckWallet />
          </View>
        </SectionComponent>

        <SectionComponent
          title={t('account.generalSettings')}
          tilteStyle={styles.titleSection}>
          <View style={styles.flexGap}>
            <ChangeLanguage />
            <AccountScreenRowComponent
              title={t('account.changePassword')}
              icon={<KeyRound size={20} color={appColors.black} />}
              onPress={() => navigation.navigate('ChangePasswordScreen')}
            />
            <AccountScreenRowComponent
              title={t('account.deviceManagement')}
              icon={<MonitorSmartphone size={20} color={appColors.black} />}
              onPress={() => navigation.navigate('DeviceManagementScreen')}
            />
            <AccountScreenRowComponent
              title={t('account.notificationSettings')}
              icon={<Bell size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
          </View>
        </SectionComponent>

        {userInfo.role !== 'Admin' && (
          <SectionComponent
            title={t('account.contactSupport')}
            tilteStyle={styles.titleSection}>
            <View style={styles.flexGap}>
              <AccountScreenRowComponent
                title={t('account.hotline')}
                icon={<Headset size={20} color={appColors.black} />}
                onPress={() => navigation.navigate('TestScreen')}
              />
              <AccountScreenRowComponent
                title={t('account.ratingApp')}
                icon={<Star size={20} color={appColors.black} />}
                onPress={() =>
                  navigation.navigate('HospitalFeePaymentInformationScreen')
                }
              />
              <AccountScreenRowComponent
                title={t('account.shareApp')}
                icon={<Share2 size={20} color={appColors.black} />}
                onPress={() => navigation.navigate('SuccessScreen')}
              />
            </View>
          </SectionComponent>
        )}

        {isLogged && (
          <ButtonComponent
            backgroundColor="white"
            borderRadius={20}
            textColor={'#F38181'}
            containerStyles={styles.logoutButton}
            startIcon={<LogOut size={20} color={'#F38181'} />}
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              auth.logout();
            }}>
            {t('account.signOut')}
          </ButtonComponent>
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 96,
  },
  flexGap: {
    rowGap: 8,
  },
  titleSection: {
    fontSize: 15,
    color: appColors.textDescription,
    textTransform: 'none',
  },
  logoutButton: {
    borderColor: '#F38181',
    borderWidth: 1,
    width: '50%',
    marginHorizontal: '25%',
    paddingVertical: 8,
    marginTop: 24,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default AccountScreen;
