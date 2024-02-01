import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <View style={[globalStyles.container, globalStyles.center]}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
        }}>
        {'Màn hình chính \n Chưa thiết kế nên chả có gì để xem đâu 🤣🤣🤣'}
      </Text>
    </View>
  );
};
export default HomeScreen;
