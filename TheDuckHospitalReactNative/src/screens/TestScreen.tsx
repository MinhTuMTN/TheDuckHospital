import React from 'react';
import {View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {useToast} from '../hooks/ToastProvider';
import {globalStyles} from '../styles/globalStyles';

const TestScreen = () => {
  const toast = useToast();
  const handleShowToast = () => {
    toast.showToast('This is a toast message');
  };
  return (
    <View style={globalStyles.center}>
      <ButtonComponent onPress={handleShowToast}>Show Toast</ButtonComponent>
    </View>
  );
};

export default TestScreen;
