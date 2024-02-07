import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {ContainerComponent} from '../components';
import ButtonComponent from '../components/ButtonComponent';
import {appInfo} from '../constants/appInfo';
import ContentComponent from '../components/ContentComponent';
import {appColors} from '../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {Image, Text} from '@gluestack-ui/themed';

interface NotFoundScreenProps {}

const NotFoundScreen = (props: NotFoundScreenProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <ContainerComponent>
      <ContentComponent
        style={{
          justifyContent: 'space-evenly',
        }}>
        <View>
          <Text size={'6xl'} fontWeight="$medium">
            404
          </Text>
          <Text size={'3xl'} fontWeight="$medium">
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
            size="md"
            color={appColors.textDescription}
            paddingTop={15}
            textAlign={'justify'}>
            {t('notFoundScreen.desc')}
          </Text>
        </View>
        <ButtonComponent
          onPress={() => navigation.navigate('HomeScreen' as never)}>
          {t('notFoundScreen.backToHome')}
        </ButtonComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};

export default NotFoundScreen;
