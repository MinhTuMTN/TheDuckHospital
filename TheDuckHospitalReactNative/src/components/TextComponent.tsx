import React from 'react';
import {ColorValue, StyleProp, Text, TextStyle} from 'react-native';
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
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  paddingStart?: number;
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
    ellipsizeMode,
    paddingStart,
  } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
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
          paddingStart,
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default TextComponent;
