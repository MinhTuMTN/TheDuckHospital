import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: React.ReactNode;
  paddingTop?: number;
}

const Container = (props: Props) => {
  const {paddingTop = 35} = props;
  return (
    <View
      style={[
        globalStyles.container,
        {
          paddingTop,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default Container;
