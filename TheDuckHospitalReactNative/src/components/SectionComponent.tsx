import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
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
  } = props;
  return (
    <View
      style={[
        {
          paddingTop,
          paddingBottom,
        },
      ]}>
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
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {},
});

export default SectionComponent;
