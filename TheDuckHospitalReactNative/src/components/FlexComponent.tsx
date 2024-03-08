import {
  DimensionValue,
  FlexAlignType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface FlexComponentProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  alignItems?: FlexAlignType;
  flex?: number | undefined;
  style?: StyleProp<ViewStyle>;
}

const FlexComponent = (props: FlexComponentProps) => {
  const {
    children,
    direction = 'column',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    flex,
    style,
  } = props;
  return (
    <View
      style={[
        {
          flexDirection: direction,
          justifyContent: justifyContent,
          alignItems: alignItems,
          flex,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default FlexComponent;
