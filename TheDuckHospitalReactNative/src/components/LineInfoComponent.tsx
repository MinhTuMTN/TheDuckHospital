import {
  View,
  TextStyle,
  StyleProp,
  ColorValue,
  StyleSheet,
  FlexAlignType,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TextComponent} from '.';

interface Props {
  startIcon?: any;
  label: string;
  value?: string;
  labelStyles?: StyleProp<TextStyle>;
  valueStyles?: StyleProp<TextStyle>;
  labelColor?: ColorValue;
  valueColor?: ColorValue;
  flexLabel?: number;
  flexValue?: number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: FlexAlignType | undefined;
  labelUppercase?: boolean;
  valueUppercase?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  containerFlex?: number;
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
    labelUppercase = false,
    valueUppercase = false,
    containerFlex,
    containerStyles,
  } = props;
  return (
    <View
      style={[
        {
          ...styles.container,
          justifyContent: justifyContent,
          alignItems,
          flex: containerFlex,
        },
        containerStyles,
      ]}>
      {startIcon && startIcon}
      <TextComponent
        color={labelColor}
        style={labelStyles}
        flex={flexLabel}
        uppercase={labelUppercase}>
        {label}
      </TextComponent>
      {value && (
        <TextComponent
          color={valueColor}
          style={valueStyles}
          flex={flexValue}
          uppercase={valueUppercase}>
          {value}
        </TextComponent>
      )}
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
