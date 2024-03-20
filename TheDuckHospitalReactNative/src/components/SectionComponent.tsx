import {FlexAlignType, StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {appColors} from '../constants/appColors';

interface SectionComponentProps {
  children: React.ReactNode;
  title?: string;
  tilteStyle?: StyleProp<TextStyle>;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  startIcon?: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  titleFlex?: number;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: FlexAlignType | undefined;
}

const SectionComponent = (props: SectionComponentProps) => {
  const {
    children,
    title,
    paddingLeft,
    paddingBottom = 10,
    paddingRight,
    paddingTop = 10,
    tilteStyle,
    startIcon,
    titleFlex,
    justifyContent = 'flex-start',
    alignItems = 'center',
  } = props;
  return (
    <View
      style={[
        {
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
        },
      ]}>
        <View
      style={[
        {
          flexDirection: 'row',
          justifyContent,
          alignItems,
          flex: titleFlex,
        },
      ]}>
      {startIcon && startIcon}
      {title && (
        <Text
          style={[
            {
              fontSize: 19,
              fontWeight: '600',
              textTransform: 'capitalize',
              color: appColors.black,
              paddingBottom: 10,
            },
            tilteStyle,
          ]}>
          {title}
        </Text>
      )}
      
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {},
});

export default SectionComponent;
