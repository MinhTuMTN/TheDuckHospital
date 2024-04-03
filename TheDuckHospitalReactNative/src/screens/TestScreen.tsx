import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {TextComponent} from '../components';
import {useToast} from '../hooks/ToastProvider';
import {globalStyles} from '../styles/globalStyles';

const TestScreen = () => {
  const toast = useToast();
  const handleShowToast = () => {
    toast.showToast('This is a toast message');
  };
  return (
    <View style={globalStyles.center}>
      <QRCodeScanner
        reactivate
        reactivateTimeout={1500}
        onRead={e => {
          toast.showToast(e.data);
        }}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <TextComponent style={styles.centerText}>
            Go to{' '}
            <TextComponent style={styles.textBold}>
              wikipedia.org/wiki/QR_code
            </TextComponent>{' '}
            on your computer and scan the QR code.
          </TextComponent>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <TextComponent style={styles.buttonText}>OK. Got it!</TextComponent>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default TestScreen;
