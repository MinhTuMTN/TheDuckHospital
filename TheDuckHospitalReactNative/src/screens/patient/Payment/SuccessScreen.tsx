import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LineInfoComponent from '../../../components/LineInfoComponent';
import {appColors} from '../../../constants/appColors';

const SuccessScreen = () => {
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title="Trạng thái thanh toán"
        titleSize={20}
        paddingTop={30}
        paddingBottom={15}
      />
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/Success.png')}
          style={{width: 250, height: 250}}
        />
        <TextComponent
          color={appColors.black}
          fontSize={24}
          fontWeight="bold"
          textAlign="center"
          style={{marginTop: 0}}>
          Thanh toán thành công
        </TextComponent>
        <TextComponent
          color={appColors.black}
          fontSize={16}
          fontWeight="500"
          textAlign="center"
          style={{marginTop: 4, marginBottom: 40}}>
          Cảm ơn bạn đã sử dụng dịch vụ
        </TextComponent>
        <View style={styles.aboutPayment}>
          <LineInfoComponent
            label="Phương thức thanh toán:"
            value="Ví điện tử MOMO"
            justifyContent="space-between"
            valueTextAlign="right"
            containerStyles={{
              width: '100%',
              paddingVertical: 8,
            }}
            labelStyles={{
              color: appColors.textGray,
              fontSize: 14,
              fontWeight: '400',
            }}
            valueStyles={{
              color: appColors.black,
              fontSize: 14,
              fontWeight: '600',
            }}
          />
          <LineInfoComponent
            label="Ngày thanh toán:"
            value="20/10/2021"
            justifyContent="space-between"
            valueTextAlign="right"
            containerStyles={{
              width: '100%',
              paddingVertical: 8,
            }}
            labelStyles={{
              color: appColors.textGray,
              fontSize: 14,
              fontWeight: '400',
            }}
            valueStyles={{
              color: appColors.black,
              fontSize: 14,
              fontWeight: '600',
            }}
          />
          <LineInfoComponent
            label="Tiền khám:"
            value="150.000 đ"
            justifyContent="space-between"
            valueTextAlign="right"
            containerStyles={{
              width: '100%',
              paddingVertical: 8,
            }}
            labelStyles={{
              color: appColors.textGray,
              fontSize: 14,
              fontWeight: '400',
            }}
            valueStyles={{
              color: appColors.black,
              fontSize: 14,
              fontWeight: '600',
            }}
          />
          <View style={styles.line}></View>
          <LineInfoComponent
            label="Tổng tiền:"
            value="150.000 đ"
            justifyContent="space-between"
            valueTextAlign="right"
            containerStyles={{
              width: '100%',
              paddingVertical: 8,
            }}
            labelStyles={{
              color: appColors.textGray,
              fontSize: 18,
              fontWeight: '500',
            }}
            valueStyles={{
              color: appColors.darkRed,
              fontSize: 18,
              fontWeight: '600',
            }}
          />
        </View>
        <ButtonComponent
          fontSize={16}
          fontWeight="600"
          borderRadius={15}
          containerStyles={{width: '90%', marginTop: 40}}>
          Quay lại trang chủ
        </ButtonComponent>
      </View>
    </ContainerComponent>
  );
};

export default SuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  aboutPayment: {
    width: '100%',
    rowGap: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  line: {
    paddingVertical: 5,
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
});
