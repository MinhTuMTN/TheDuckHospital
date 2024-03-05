import {Avatar, AvatarImage} from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  Bell,
  Headset,
  KeyRound,
  LogOut,
  Share2,
  Star,
} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useAuth} from '../../../auth/AuthProvider';
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

const AccountScreen = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const auth = useAuth();

  const handleBtnLoginClick = () => {
    navigation.navigate('LoginScreen' as never);
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
            <AvatarImage
              alt="avatar"
              source={require('../../../assets/images/avatar-default.png')}
            />
          </Avatar>
          <Space paddingBottom={8} />
          <TextComponent fontSize={20} fontWeight="600">
            Nguyễn Văn A
          </TextComponent>
        </View>

        <SectionComponent
          title="Cài đặt chung"
          tilteStyle={styles.titleSection}>
          <View style={styles.flexGap}>
            <ChangeLanguage />
            <AccountScreenRowComponent
              title="Đổi mật khẩu"
              icon={<KeyRound size={20} color={appColors.black} />}
              onPress={() => console.log('Change password')}
            />
            <AccountScreenRowComponent
              title="Cài đặt thông báo"
              icon={<Bell size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
          </View>
        </SectionComponent>
        <SectionComponent title="Liên hệ" tilteStyle={styles.titleSection}>
          <View style={styles.flexGap}>
            <AccountScreenRowComponent
              title={'Tổng đài 1900 1234'}
              icon={<Headset size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
            <AccountScreenRowComponent
              title={'Đánh giá ứng dụng'}
              icon={<Star size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
            <AccountScreenRowComponent
              title={'Chia sẻ ứng dụng'}
              icon={<Share2 size={20} color={appColors.black} />}
              onPress={() => console.log('Notification settings')}
            />
          </View>
        </SectionComponent>

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
          Đăng xuất
        </ButtonComponent>
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
