import React from 'react';
import {View} from 'react-native';

interface Props {
  paddingTop?: number;
  paddingBottom?: number;
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
