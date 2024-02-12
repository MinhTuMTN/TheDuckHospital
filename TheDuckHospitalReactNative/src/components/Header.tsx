import React from 'react';
import {appColors} from '../constants/appColors';
import {ColorValue, ImageBackground, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {FlexComponent, TextComponent} from '.';

interface Props {
  title?: string;
  titleSize?: number;
  titleColor?: ColorValue | undefined;
  showBackButton?: boolean;
  icon?: React.ReactNode;
  noBackground?: boolean;
  backButtonColor?: number | ColorValue | undefined;
  paddingTop?: number;
  paddingBottom?: number;
  uppercase?: boolean;
}

const Header = (props: Props) => {
  const {
    title,
    titleSize = 19,
    showBackButton = true,
    icon,
    noBackground,
    backButtonColor,
    paddingTop,
    paddingBottom,
    titleColor,
    uppercase = true,
  } = props;

  const navigation = useNavigation();

  const renderItems = (
    <View
      style={{
        paddingTop: paddingTop || 35,
        paddingBottom: paddingBottom || 15,
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
              color={backButtonColor || 'white'}
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
        {title && (
          <TextComponent
            uppercase={uppercase}
            bold
            fontSize={18}
            color={titleColor || appColors.white}>
            {title}
          </TextComponent>
        )}
        <View>{icon}</View>
      </FlexComponent>
    </View>
  );

  return !noBackground ? (
    <ImageBackground source={require('../assets/images/background-header.jpg')}>
      {renderItems}
    </ImageBackground>
  ) : (
    <View>{renderItems}</View>
  );
};

export default Header;
