import {Image, Text} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ContainerComponent} from '../components';
import ButtonComponent from '../components/ButtonComponent';
import {appInfo} from '../constants/appInfo';
import ContentComponent from '../components/ContentComponent';
import {appColors} from '../constants/appColors';

const NotFoundScreen = () => {
  const {t} = useTranslation();
  return (
    <ContainerComponent>
      <ContentComponent
        style={{
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text fontSize={50} fontWeight={500}>
            404
          </Text>
          <Text fontSize={30} fontWeight={500}>
            {t('notFoundScreen.title')}
          </Text>
        </View>
        <View>
          <Image
            source={require('../assets/images/not-found.png')}
            alt="Not found"
            borderRadius={150}
            width={appInfo.size.width}
            height={200}
          />
          <Text
            fontSize={17}
            color={appColors.textDescription}
            paddingTop={10}
            textAlign={'justify'}>
            {t('notFoundScreen.desc')}
          </Text>
        </View>
        <ButtonComponent>{t('notFoundScreen.backToHome')}</ButtonComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};

export default NotFoundScreen;
