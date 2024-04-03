import React from 'react';
import {View} from 'react-native';

interface DotComponentProps {
  color: string;
}

function DotComponent(props: DotComponentProps) {
  const {color} = props;
  return (
    <>
      {color && (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
      )}
    </>
  );
}

export default DotComponent;
