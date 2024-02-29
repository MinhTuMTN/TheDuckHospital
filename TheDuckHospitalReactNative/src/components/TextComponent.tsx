import {View, Text, StyleProp, TextStyle, ColorValue} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';

interface TextComponentProps {
  children: string | React.ReactNode;
  fontSize?: number;
  uppercase?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  color?: ColorValue | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number | undefined;
  flex?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
}

const TextComponent = (props: TextComponentProps) => {
  const {
    fontSize = 16,
    uppercase = false,
    bold = false,
    italic = false,
    underline = false,
    fontWeight,
    color = appColors.black,
    textAlign,
    style,
    numberOfLines,
    flex,
    flexWrap,
  } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize,
          textTransform: uppercase ? 'uppercase' : 'none',
          fontWeight: bold ? 'bold' : fontWeight,
          fontStyle: italic ? 'italic' : 'normal',
          textDecorationLine: underline ? 'underline' : 'none',
          color,
          textAlign,
          flex,
          flexWrap,
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default TextComponent;
