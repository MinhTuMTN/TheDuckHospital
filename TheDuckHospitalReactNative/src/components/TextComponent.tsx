import {View, Text, StyleProp, TextStyle, ColorValue} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';

interface TextComponentProps {
  children: React.ReactNode;
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
  style?: StyleProp<TextStyle>;
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
    style,
  } = props;
  return (
    <Text
      style={[
        {
          fontSize,
          textTransform: uppercase ? 'uppercase' : 'none',
          fontWeight: bold ? 'bold' : fontWeight,
          fontStyle: italic ? 'italic' : 'normal',
          textDecorationLine: underline ? 'underline' : 'none',
          color,
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default TextComponent;
