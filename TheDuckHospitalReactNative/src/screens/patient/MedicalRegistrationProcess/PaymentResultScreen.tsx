import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ContainerComponent, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {navigationProps} from '../../../types';

const PaymentResultScreen = () => {
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
