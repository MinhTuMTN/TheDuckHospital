import {View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {Text} from '@gluestack-ui/themed';

interface ButtonComponentProps {
  children: React.ReactNode | string;
  backgroundColor?: string;
  borderRadius?: number;
  textColor?: string;
  textAlignment?: 'center' | 'left' | 'right';
  fontSize?: number;
  fontWeight?:
    | '$black'
    | (string & {})
    | '$normal'
    | '$bold'
    | '$light'
    | '$hairline'
    | '$thin'
    | '$medium'
    | '$semibold'
    | '$extrabold'
    | '$extraBlack'
    | undefined;
  bold?: boolean;
  italic?: boolean;
  padding?: number;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    children,
    backgroundColor = appColors.primary,
    borderRadius = 5,
    textColor = 'white',
    textAlignment = 'center',
    fontSize = 15,
    fontWeight = '$normal',
    bold = false,
    italic = false,
    padding = 10,
    containerStyles,
    textStyles,
    onPress,
  } = props;
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius,
          padding,
        },
        containerStyles,
      ]}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={textStyles}
          color={textColor}
          textAlign={textAlignment}
          bold={bold}
          italic={italic}
          fontSize={fontSize}
          fontWeight={fontWeight}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
