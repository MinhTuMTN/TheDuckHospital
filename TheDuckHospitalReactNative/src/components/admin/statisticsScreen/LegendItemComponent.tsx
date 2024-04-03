import React from 'react';
import {View} from 'react-native';
import DotComponent from './DotComponent';
import TextComponent from '../../TextComponent';

interface LegendItemComponentProps {
  color: string;
  paymentMethod: string;
  value: string;
}

function LegendItemComponent(props: LegendItemComponentProps) {
  const {color, paymentMethod, value} = props;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <DotComponent color={color} />
        <TextComponent>{`${paymentMethod}: ${value}`}</TextComponent>
      </View>
    </>
  );
}

export default LegendItemComponent;
