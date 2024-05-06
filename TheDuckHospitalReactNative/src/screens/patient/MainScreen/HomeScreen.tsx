import {Fab} from '@gluestack-ui/themed';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Headset, Search, Typing} from '../../../assets/svgs';
import {MoreMenuComponent, TextComponent} from '../../../components';
import TopDoctorComponent from '../../../components/patient/homeScreen/TopDoctorComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import {useAuth} from '../../../hooks/AuthProvider';
import {useToast} from '../../../hooks/ToastProvider';
import {updateDeviceInformation} from '../../../services/authServices';
import {getAllHeadDoctor} from '../../../services/dotorSevices';
import {AppNotification} from '../../../utils/appNotification';
import {
  NotificationState,
  updateNotificationState,
} from '../../../services/notificationServices';
import {navigationProps} from '../../../types';

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [listDoctor, setListDoctor] = useState([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const isCarousel = useRef(null);

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();
  const auth = useAuth();
  const fullName = useMemo(() => {
    const name = auth.userInfo?.fullName?.split(' ');

    return name ? `${name[name.length - 2]} ${name[name.length - 1]}` : '';
  }, [auth.userInfo?.fullName]);
  const entries: unknown[] = [
    {
      image: require('../../../assets/images/slide_0.jpg'),
    },
    {
      image: require('../../../assets/images/slide_1.jpg'),
    },
    {
      image: require('../../../assets/images/slide_2.jpg'),
    },
  ];
  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            width: appInfo.size.width - 36,
            height: 200,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };

  const handleChooseDoctor = () => {
    navigation.navigate('ChooseDoctorsScreen');
  };
  const handleNavigateEnterCodePaymentScreen = () => {
    navigation.navigate('EnterHospitalPaymentCodeScreen');
  };
  const handleNavigateMidicineReminderScreen = () => {
    navigation.navigate('MedicineRemiderNavigator');
  };
  const handleNavigateMedicalExaminationHistoryScreen = () => {
    navigation.navigate('AllPatientProfilesScreen');
  };

  const handlNavigateQuickSupportScreen = () => {
    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    const handlegetAllHeadDoctor = async () => {
      const respone = await getAllHeadDoctor();

      if (respone.success) {
        setListDoctor(respone.data?.data);
      }
    };
    handlegetAllHeadDoctor();
  }, []);

  useEffect(() => {
    if (showMoreMenu) {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
        },
      });
    }
  }, [showMoreMenu]);

  useEffect(() => {
    const updateDeviceInfo = async () => {
      const fcmToken = await AppNotification.requestPermission();
      if (!fcmToken || !auth.token) {
        console.log("Can't get fcm token or token is null");
        return;
      }
      const deviceId = DeviceInfo.getUniqueIdSync();
      const deviceName = DeviceInfo.getBrand() + ' - ' + DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();

      const response = await updateDeviceInformation({
        deviceId,
        deviceName,
        systemName,
        systemVersion,
        fcmToken,
      });

      console.log(response);
    };

    updateDeviceInfo();
  }, [auth.token]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      AppNotification.displayNotification(remoteMessage);
      const notificationId: string | undefined =
        (remoteMessage.data?.notificationId as string) || undefined;
      if (notificationId) {
        const response = await updateNotificationState(
          notificationId,
          NotificationState.RECEIVED,
        );
        console.log(response);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    notifee.getInitialNotification().then(notification => {
      console.log('Initial notification', notification);

      if (notification) {
        navigation.navigate('NotificationScreen');
      }
    });
  }, []);

  return (
    <>
      <ScrollView className={'flex-1 bg-white'}>
        <View
          style={{backgroundColor: appColors.primary, elevation: 10}}
          className="h-52 rounded-b-3xl px-5 flex-col relative">
          {/* Header */}
          <View className="pt-12 flex-row items-center justify-between">
            <View className="flex-row items-center flex-auto w-72">
              <Image
                source={require('../../../assets/images/avatar-meo.jpg')}
                className="w-14 h-14 rounded-full"
              />
              <View className="pl-2">
                {fullName ? (
                  <>
                    <TextComponent color={appColors.white} fontSize={20}>
                      {t('homeScreen.hello')}{' '}
                      <TextComponent bold color={appColors.white} fontSize={20}>
                        {fullName},
                      </TextComponent>
                    </TextComponent>
                    <TextComponent color={appColors.white}>
                      {t('homeScreen.welcome')}
                    </TextComponent>
                  </>
                ) : (
                  <>
                    <TextComponent
                      fontWeight="500"
                      color={appColors.white}
                      fontSize={16}>
                      {t('homeScreen.noLoginHello')}
                    </TextComponent>
                  </>
                )}
              </View>
            </View>
            <View className="flex-row flex-auto w-16 justify-between">
              <Search width={30} height={30} className="me-20" />
              <Typing width={30} height={30} />
            </View>
          </View>

          <View
            className="rounded-3xl bg-white w-full h-50 fixed top-4 left-0 right-0 flex-row flex-wrap"
            style={{
              elevation: 10,
            }}>
            <TouchableOpacity
              onPress={handleChooseDoctor}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-b-2 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/appointment.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.makeAppointment')}
              </TextComponent>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigateMedicalExaminationHistoryScreen}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-b-2 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/loupe.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.lookupMedicalResult')}
              </TextComponent>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigateEnterCodePaymentScreen}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-b-2 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/payment.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.payHospitalFee')}
              </TextComponent>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigateMidicineReminderScreen}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/animal.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.medicineReminder')}
              </TextComponent>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlNavigateQuickSupportScreen}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/chat.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.quickSupport')}
              </TextComponent>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowMoreMenu(!showMoreMenu)}
              className="w-1/3 h-1/2 items-center justify-center py-4 border-[#D5CFCF]">
              <Image
                source={require('../../../assets/images/more.png')}
                className="w-12 h-12"
              />
              <TextComponent textAlign="center" fontSize={14}>
                {t('homeScreen.viewMore')}
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-40 px-5 overflow-hidden">
          <Carousel
            autoplay
            ref={isCarousel}
            data={entries}
            renderItem={_renderItem}
            sliderWidth={appInfo.size.width - 36}
            itemWidth={appInfo.size.width - 36}
            layout={'stack'}
            vertical={false}
            loop={true}
            onSnapToItem={index => setIndex(index)}
          />
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 8,
              marginHorizontal: 1,
              backgroundColor: appColors.primary,
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: 'black',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={{
              position: 'absolute',
              bottom: -24,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={styles.container}>
          <TextComponent
            fontSize={12}
            bold
            style={{paddingTop: 25, letterSpacing: 0.5}}
            color={appColors.grayLight}>
            {t('homeScreen.ourTeam')}
          </TextComponent>
          <TextComponent
            fontSize={18}
            bold
            style={{
              paddingTop: 2,
              letterSpacing: 0.5,
              textTransform: 'capitalize',
            }}
            color={appColors.black}
            uppercase>
            {t('homeScreen.ourDoctor')}
          </TextComponent>
          <View style={styles.listDoctor}>
            <FlatList
              data={listDoctor}
              renderItem={({item}) => <TopDoctorComponent doctorInfo={item} />}
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
        </View>

        <MoreMenuComponent
          show={showMoreMenu}
          onClose={() => setShowMoreMenu(false)}
        />
      </ScrollView>
      <Fab
        size="md"
        placement="bottom right"
        style={{
          backgroundColor: appColors.primary,
        }}>
        <Headset width={35} height={35} />
      </Fab>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 16,
  },
  listDoctor: {
    width: appInfo.size.width - 36,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
