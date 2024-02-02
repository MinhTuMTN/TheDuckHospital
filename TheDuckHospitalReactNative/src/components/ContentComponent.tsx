import React from 'react';
import {View, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  paddingTop?: number;
  paddingHorizontal?: number;
  style?: ViewStyle;
}

const ContentComponent = (props: Props) => {
  const {paddingTop = 15, paddingHorizontal = 15, style} = props;
  return (
    <View
      style={{
        paddingTop: paddingTop,
        paddingHorizontal: paddingHorizontal,
        flex: 1,
        ...style,
      }}>
      {props.children}
    </View>
  );
};

export default ContentComponent;
