import React from 'react';
import {appColors} from '../constants/appColors';
import {ColorValue, ImageBackground, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {FlexComponent, TextComponent} from '.';
import {ChevronLeft} from 'lucide-react-native';

interface Props {
  title?: string;
  titleSize?: number;
  titleColor?: ColorValue | undefined;
  backgroundColor?: ColorValue | undefined;
  showBackButton?: boolean;
  icon?: React.ReactNode;
  noBackground?: boolean;
  backIcon?: React.ReactNode;
  backButtonColor?: ColorValue | undefined;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  uppercase?: boolean;
}

const Header = (props: Props) => {
  const {
    title,
    titleSize = 18,
    showBackButton = true,
    icon,
    noBackground,
    backButtonColor,
    paddingTop,
    paddingBottom,
    titleColor,
    backIcon,
    paddingStart,
    uppercase = true,
    backgroundColor,
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
        <View style={{flex: 1}}>
          {showBackButton &&
            (backIcon ? (
              <Pressable onPress={() => navigation.goBack()}>
                {backIcon}
              </Pressable>
            ) : (
              <ChevronLeft
                size={30}
                color={backButtonColor || 'white'}
                onPress={() => navigation.goBack()}
              />
            ))}
        </View>
        {title && (
          <TextComponent
            style={{
              flex: 4,
              textAlign: 'center',
            }}
            paddingStart={paddingStart}
            uppercase={uppercase}
            bold
            fontSize={titleSize}
            color={titleColor || appColors.white}>
            {title}
          </TextComponent>
        )}
        <View style={{flex: 1, alignItems: 'flex-end'}}>{icon}</View>
      </FlexComponent>
    </View>
  );

  return !noBackground ? (
    <ImageBackground source={require('../assets/images/background-header.jpg')}>
      {renderItems}
    </ImageBackground>
  ) : (
    <View style={{backgroundColor}}>{renderItems}</View>
  );
};

export default Header;
