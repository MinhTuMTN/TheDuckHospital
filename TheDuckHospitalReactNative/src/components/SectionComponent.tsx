import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '@gluestack-ui/themed';

interface SectionComponentProps {
  children: React.ReactNode;
  title?: string;
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
    paddingBottom = 0,
    paddingRight,
    paddingTop = 10,
  } = props;
  return (
    <View
      style={[
        {
          paddingTop,
          paddingBottom,
        },
      ]}>
      {title && <Text>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {},
});

export default SectionComponent;
