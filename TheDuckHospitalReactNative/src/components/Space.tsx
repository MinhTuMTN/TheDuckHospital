import React from 'react';
import {DimensionValue, View} from 'react-native';

interface Props {
  paddingTop?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
}

const Space = (props: Props) => {
  const {paddingTop = 5, paddingBottom = 5} = props;
  return (
    <View
      style={{
        paddingTop,
        paddingBottom,
      }}
    />
  );
};

export default Space;
