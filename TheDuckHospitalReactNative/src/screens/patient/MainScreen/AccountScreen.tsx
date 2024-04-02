import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  Bell,
  Headset,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  Share2,
  Star,
} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useAuth} from '../../../hooks/AuthProvider';
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
import {navigationProps} from '../../../types';

const AccountScreen = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const auth = useAuth();

  const handleBtnLoginClick = () => {
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    const checkLogin = () => {
      const token = auth.token;
      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    checkLogin();
  }, [auth.token]);
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
              <AvatarFallbackText>{auth.userInfo.fullName}</AvatarFallbackText>
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
              {auth.userInfo.fullName}
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
              Đăng nhập
            </ButtonComponent>
          )}
        </View>

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
        <SectionComponent
          title={t('account.contactSupport')}
          tilteStyle={styles.titleSection}>
          <View style={styles.flexGap}>
            <AccountScreenRowComponent
              title={t('account.hotline')}
              icon={<Headset size={20} color={appColors.black} />}
              onPress={() =>
                navigation.navigate('EnterHospitalPaymentCodeScreen')
              }
            />
            <AccountScreenRowComponent
              title={t('account.ratingApp')}
              icon={<Star size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
            <AccountScreenRowComponent
              title={t('account.shareApp')}
              icon={<Share2 size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
          </View>
        </SectionComponent>

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
