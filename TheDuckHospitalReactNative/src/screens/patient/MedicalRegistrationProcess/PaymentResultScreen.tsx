import {View, Text, Linking} from 'react-native';
import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import {ContainerComponent, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const PaymentResultScreen = () => {
  const onPressHandler = () => {
    Linking.openURL(
      'momo://app?action=payWithApp&isScanQR=false&serviceType=app&sid=TU9NT0JLVU4yMDE4MDUyOXwxNzEwMzg0MDc3MTY1OjAxMjM0NTY3Nzg&skipPayLater=false&v=3.0',
    ).catch(e => console.log(e));
  };
  const navigation = useNavigation<navigationProps>();

  return (
    <ContainerComponent>
      <TextComponent>Thanh toán thành công</TextComponent>
      <ButtonComponent
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        Quay vê trang chủ
      </ButtonComponent>
    </ContainerComponent>
  );
};

export default PaymentResultScreen;
