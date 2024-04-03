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
  endIcon?: any;
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
  paddingStart?: number;
}

const LineInfoComponent = (props: Props) => {
  const {
    startIcon,
    endIcon,
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
    paddingStart,
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
        paddingStart={paddingStart}
        color={labelColor}
        style={labelStyles}
        flex={flexLabel}
        uppercase={labelUppercase}>
        {label}
      </TextComponent>
      {value && (
        <View style={{flexDirection: 'row', flex: flexValue}}>
          <TextComponent
            color={valueColor}
            style={valueStyles}
            flex={endIcon ? 0.85 : 1}
            uppercase={valueUppercase}>
            {value}
          </TextComponent>
          {endIcon && endIcon}
        </View>
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
