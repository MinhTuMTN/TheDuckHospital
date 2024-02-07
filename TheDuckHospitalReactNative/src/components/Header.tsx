import React from 'react';
import {appColors} from '../constants/appColors';
import {ImageBackground, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {FlexComponent, TextComponent} from '.';

interface Props {
  title: string;
  titleSize?: number;
  showBackButton?: boolean;
  icon?: React.ReactNode;
}

const Header = (props: Props) => {
  const {title, titleSize = 19, showBackButton = true, icon} = props;

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/images/background-header.jpg')}>
      <View
        style={{
          paddingTop: 35,
          paddingBottom: 15,
        }}>
        <FlexComponent
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}>
          <View>
            {showBackButton && (
              <Icon
                name="arrow-back"
                size={30}
                color="white"
                onPress={() => navigation.goBack()}
              />
            )}
          </View>
          <TextComponent uppercase bold fontSize={18} color={appColors.white}>
            {title}
          </TextComponent>
          <View>{icon}</View>
        </FlexComponent>
      </View>
    </ImageBackground>
  );
};

export default Header;
