import {View, Text, Linking} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {ContainerComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';

const PaymentResultScreen = () => {
  const onPressHandler = () => {
    Linking.openURL(
      'momo://app?action=payWithApp&isScanQR=false&serviceType=app&sid=TU9NT0JLVU4yMDE4MDUyOXwxNzEwMzg0MDc3MTY1OjAxMjM0NTY3Nzg&skipPayLater=false&v=3.0',
    ).catch(e => console.log(e));
  };
  return (
    <ContainerComponent>
      {/* <WebView
        source={{
          uri: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=13000000&vnp_Command=pay&vnp_CreateDate=20240313145755&vnp_CurrCode=VND&vnp_ExpireDate=20240313151255&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang%3Ab53ae02e-8b5a-4128-a354-e10af16ec8e0&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Ftb7drp6q-8080.asse.devtunnels.ms%2Fapi%2Fbooking%2Fcallback&vnp_TmnCode=7FC8KTQH&vnp_TxnRef=31952397&vnp_Version=2.1.0&vnp_SecureHash=bc8d8bf5a1726f86519f184d039ea287c821356bd90c24ba864629054b4e44e29fc1426b2e08977a2ada091a72b48f0c2011c7ff90d0f4b65948d08e85e5fbef',
        }}
        userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
        style={{flex: 1}}
      /> */}
      <ButtonComponent onPress={onPressHandler}>Thanh toán</ButtonComponent>
    </ContainerComponent>
  );
};

export default PaymentResultScreen;
