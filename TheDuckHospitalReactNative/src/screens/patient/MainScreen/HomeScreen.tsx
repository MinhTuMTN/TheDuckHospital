import {Fab} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Headset, Search, Typing} from '../../../assets/svgs';
import {MoreMenuComponent, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const isCarousel = useRef(null);

  const {t} = useTranslation();
  const navigation = useNavigation();
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
    navigation.navigate('ChooseDoctorsScreen' as never);
  };
  const handleNavigateTestScreen = () => {
    navigation.navigate('TestScreen' as never);
  };

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

  return (
    <View className={'flex-1 bg-white'}>
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
              <TextComponent color={appColors.white} fontSize={20}>
                {t('homeScreen.hello')}{' '}
                <TextComponent bold color={appColors.white} fontSize={20}>
                  Hạ Băng,
                </TextComponent>
              </TextComponent>
              <TextComponent color={appColors.white}>
                {t('homeScreen.welcome')}
              </TextComponent>
            </View>
          </View>
          <View className="flex-row flex-auto w-16 justify-between">
            <Search width={30} height={30} className="me-20" />
            <Typing width={30} height={30} />
          </View>
        </View>

        <View
          className="rounded-3xl bg-white w-full h-56 fixed top-4 left-0 right-0 flex-row flex-wrap"
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
            onPress={handleNavigateTestScreen}
            className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-b-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/loupe.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              {t('homeScreen.lookupMedicalResult')}
            </TextComponent>
          </TouchableOpacity>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-b-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/payment.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              {t('homeScreen.payHospitalFee')}
            </TextComponent>
          </View>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/animal.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              {t('homeScreen.medicineReminder')}
            </TextComponent>
          </View>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/chat.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              {t('homeScreen.quickSupport')}
            </TextComponent>
          </View>
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

      <MoreMenuComponent
        show={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
      />

      <Fab
        size="md"
        placement="bottom right"
        style={{
          backgroundColor: appColors.primary,
          display: showMoreMenu ? 'none' : 'flex',
        }}>
        <Headset width={35} height={35} />
      </Fab>
    </View>
  );
};

export default HomeScreen;
