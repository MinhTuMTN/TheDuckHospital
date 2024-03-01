import {
  View,
  Text,
  TextStyle,
  StyleProp,
  ColorValue,
  StyleSheet,
  FlexAlignType,
} from 'react-native';
import React from 'react';
import {TextComponent} from '.';

interface Props {
  startIcon?: any;
  label: string;
  value: string;
  labelStyles?: StyleProp<TextStyle>;
  valueStyles?: StyleProp<TextStyle>;
  labelColor?: ColorValue;
  valueColor?: ColorValue;
  flexLabel?: number;
  flexValue?: number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: FlexAlignType | undefined;
}

const LineInfoComponent = (props: Props) => {
  const {
    startIcon,
    label,
    value,
    labelStyles = {
      fontSize: 13,
      fontWeight: '400',
      textAlign: 'left',
    },
    valueStyles = {
      fontSize: 13,
      fontWeight: '400',
      textAlign: 'left',
    },
    labelColor = '#000000',
    valueColor = '#000000',
    flexLabel = 1,
    flexValue = 1,
    justifyContent = 'flex-start',
    alignItems = 'center',
  } = props;
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: justifyContent,
        alignItems,
      }}>
      {startIcon && startIcon}
      <TextComponent color={labelColor} style={labelStyles} flex={flexLabel}>
        {label}
      </TextComponent>
      <TextComponent color={valueColor} style={valueStyles} flex={flexValue}>
        {value}
      </TextComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 'auto',
  },
});
export default LineInfoComponent;
