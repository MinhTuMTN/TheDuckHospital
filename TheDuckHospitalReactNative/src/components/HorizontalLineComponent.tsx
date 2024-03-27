import React from 'react';
import {ColorValue, DimensionValue, View} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  paddingTop?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  lineColor?: ColorValue | undefined;
  borderWidth?: number | undefined;
}

const HorizontalLineComponent = (props: Props) => {
  const {
    paddingTop,
    paddingBottom,
    marginLeft,
    marginRight,
    borderWidth = 1,
    lineColor = '#000000',
  } = props;
  return (
    <View
      style={{
        paddingTop,
        paddingBottom,
        marginLeft,
        marginRight,
        borderBottomWidth: borderWidth,
        borderColor: lineColor,
      }}
    />
  );
};

export default HorizontalLineComponent;
