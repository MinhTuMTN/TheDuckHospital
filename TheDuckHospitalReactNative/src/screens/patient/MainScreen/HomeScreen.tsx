import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Search, Typing} from '../../../assets/svgs';
import {MoreMenuComponent, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const HomeScreen = () => {
  //useState
  const [index, setIndex] = useState(0);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  //constants
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const {t} = useTranslation();

  //data
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

  //functions
  const handleChooseDoctor = () => {
    navigation.navigate('ChooseDoctorsScreen' as never);
  };

  //render
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

  useEffect(() => {
    navigation.setOptions({
      screenOptions: {
        tabBarStyle: showMoreMenu ? 'none' : 'flex',
      },
    });
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
                Xin chào{' '}
                <TextComponent bold color={appColors.white} fontSize={20}>
                  Hạ Băng,
                </TextComponent>
              </TextComponent>
              <TextComponent color={appColors.white}>
                Mừng bạn quay trở lại.
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
            className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-b-2 border-[#D5CFCF]"
            onPress={handleChooseDoctor}>
            <Image
              source={require('../../../assets/images/appointment.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              Đặt khám theo bác sĩ
            </TextComponent>
          </TouchableOpacity>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-b-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/loupe.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              Tra cứu kết quả khám bệnh
            </TextComponent>
          </View>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-b-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/payment.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              Thanh toán {'\n'} viện phí
            </TextComponent>
          </View>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/chat.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              Hỗ trợ nhanh
            </TextComponent>
          </View>
          <View className="w-1/3 h-1/2 items-center justify-center py-4 border-r-2 border-[#D5CFCF]">
            <Image
              source={require('../../../assets/images/instructions.png')}
              className="w-12 h-12"
            />
            <TextComponent textAlign="center" fontSize={14}>
              Hướng dẫn {'\n'} đặt khám
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
              Xem thêm
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
    </View>
  );
};

export default HomeScreen;
