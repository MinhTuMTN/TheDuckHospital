import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: React.ReactNode;
  paddingTop?: number;
  style?: StyleProp<ViewStyle>;
}

const ContainerComponent = (props: Props) => {
  const {paddingTop = 35} = props;
  return (
    <View
      style={[
        globalStyles.container,
        {
          paddingTop,
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export default ContainerComponent;
