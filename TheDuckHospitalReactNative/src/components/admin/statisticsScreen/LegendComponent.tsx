import React from 'react';
import {View} from 'react-native';
import LegendItemComponent from './LegendItemComponent';

interface LegendComponentProps {
  pieData: any;
}

function LegendComponent(props: LegendComponentProps) {
  const {pieData} = props;
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
        }}>
        {pieData?.map((item: any, index: number) => (
          <LegendItemComponent
            key={index}
            color={item.gradientCenterColor}
            paymentMethod={item.label}
            value={item.value}
          />
        ))}
      </View>
    </>
  );
}

export default LegendComponent;
