import {View, Text, StyleSheet, ColorValue, DimensionValue} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import * as Svg from 'react-native-svg';
import {appInfo} from '../constants/appInfo';
import TextComponent from './TextComponent';

interface SeparatorDashComponentProps {
  borderBottomColor?: ColorValue | undefined;
  borderBottomWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  marginTop?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
}
const SeparatorDashComponent = (props: SeparatorDashComponentProps) => {
  const {
    borderBottomColor = appColors.grayLight,
    borderBottomWidth = 1,
    borderStyle = 'dashed',
    marginTop = 0,
    marginBottom = 0,
  } = props;

  return (
    <TextComponent
      ellipsizeMode="clip"
      numberOfLines={1}
      fontSize={32}
      style={{
        letterSpacing: 1,
        lineHeight: 12,
        marginTop: marginTop,
        marginBottom: marginBottom,
        color: borderBottomColor,
      }}>
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - -
    </TextComponent>
  );
};

export default SeparatorDashComponent;
