import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Done} from '../../../assets/svgs';
import {
  ContainerComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LineInfoComponent from '../../../components/LineInfoComponent';
import {appColors} from '../../../constants/appColors';
import {formatCurrency} from '../../../utils/currencyUtils';

const HospitalFeePaymentInformationScreen = () => {
  const [paymentLoading, setPaymentLoading] = React.useState(false);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Thông tin thanh toán"
          paddingStart={15}
          paddingTop={40}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <View style={styles.container}>
          <View style={styles.note}>
            <AntDesign name="infocirlceo" size={19} color={appColors.primary} />
            <TextComponent
              paddingStart={6}
              fontSize={14}
              style={{color: appColors.primary}}
              italic
              fontWeight="400">
              Vui lòng kiểm tra lại thông tin trước khi thanh toán
            </TextComponent>
          </View>
          <View style={styles.overlay}>
            <ScrollView>
              <View style={styles.myInfo}>
                <TextComponent
                  color={appColors.primaryLable}
                  fontWeight="600"
                  fontSize={20}>
                  Thông tin bệnh nhân
                </TextComponent>
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <Ionicons
                      name="person-circle-sharp"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={7}
                  label={'Nguyễn Thị Ánh Nguyệt'}
                  labelUppercase
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <FontAwesome
                      name="birthday-cake"
                      size={22}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={10}
                  label={'20/10/1999'}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <FontAwesome
                      name="phone"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={12}
                  label={'0987654321'}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'left',
                  }}
                />
                <Space paddingTop={5} />
                <LineInfoComponent
                  startIcon={
                    <Ionicons
                      name="location-sharp"
                      size={25}
                      color={appColors.primary}
                    />
                  }
                  paddingStart={6}
                  label={'Thành phố Bảo Lộc - Tỉnh Lâm Đồng'}
                  labelStyles={{
                    fontSize: 15,
                    fontWeight: '500',
                    textAlign: 'justify',
                  }}
                />
              </View>
              <View style={styles.bookingInfo}>
                <TextComponent
                  color={appColors.primaryLable}
                  fontWeight="600"
                  fontSize={20}>
                  Thông tin đặt khám
                </TextComponent>
                <Space paddingTop={5} />

                <View
                  style={{
                    marginBottom: 16,
                  }}>
                  <LineInfoComponent
                    label="Bác sĩ chỉ định"
                    value={'Nguyễn Thị Như Nguyệt'}
                    labelStyles={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'left',
                    }}
                    valueStyles={{
                      fontSize: 15,
                      fontWeight: '500',
                      textAlign: 'right',
                    }}
                    labelColor={appColors.grayText}
                  />
                  <Space paddingTop={5} />
                  <LineInfoComponent
                    label="Chuyên khoa"
                    value={'Cơ - Xương - Khớp'}
                    valueUppercase
                    labelStyles={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'left',
                    }}
                    valueStyles={{
                      fontSize: 15,
                      fontWeight: '500',
                      textAlign: 'right',
                    }}
                    labelColor={appColors.grayText}
                  />
                  <Space paddingTop={5} />
                  <LineInfoComponent
                    label="Dịch vụ khám"
                    value={'Chụp X-Quang'}
                    labelStyles={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'left',
                    }}
                    valueStyles={{
                      fontSize: 15,
                      fontWeight: '500',
                      textAlign: 'right',
                    }}
                    labelColor={appColors.grayText}
                  />
                  <Space paddingTop={5} />
                  <LineInfoComponent
                    label="Loại dịch vụ"
                    value="Khám dịch vụ"
                    labelStyles={{
                      fontSize: 15,
                      fontWeight: '400',
                      textAlign: 'left',
                    }}
                    valueStyles={{
                      fontSize: 15,
                      fontWeight: '500',
                      textAlign: 'right',
                    }}
                    labelColor={appColors.grayText}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.bill}>
            <View style={styles.headerBill}>
              <TextComponent
                color={appColors.primaryLable}
                fontWeight="600"
                fontSize={20}>
                Chọn phương thức thanh toán
              </TextComponent>
              <MaterialIcons
                name="navigate-next"
                size={30}
                color={appColors.primary}
              />
            </View>
            <View style={styles.mainBill}>
              <LineInfoComponent
                label="Tiền khám"
                value={'150.000 đ'}
                labelStyles={{
                  fontSize: 15,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Phí TGTT"
                value={formatCurrency('1500') + ' đ'}
                labelStyles={{
                  fontSize: 15,
                  fontWeight: '400',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={appColors.grayText}
              />
              <View style={styles.line}></View>
              <Space paddingTop={5} />
              <LineInfoComponent
                label="Tổng tiền"
                value={'165.000đ'}
                labelStyles={{
                  fontSize: 16,
                  fontWeight: '500',
                  textAlign: 'left',
                }}
                valueStyles={{
                  fontSize: 16,
                  fontWeight: '700',
                  textAlign: 'right',
                }}
                labelColor={appColors.grayText}
                valueColor={'red'}
              />
              <View style={styles.rule}>
                <Done height={22} width={22} />
                <TextComponent
                  color={appColors.grayText}
                  fontSize={10}
                  paddingStart={8}
                  flex={1}
                  textAlign="justify"
                  flexWrap="wrap">
                  Tôi đồng ý Phí tiện ý TheDuck Hospital cung cấp để đặt khám,
                  thanh toán viện phí, đây không phải là dịch vụ bắt buộc bởi cơ
                  sở ý tế.
                </TextComponent>
              </View>
              <ButtonComponent
                onPress={() => {
                  console.log('Thanh toán');
                }}
                borderRadius={40}
                isLoading={paymentLoading}
                textStyles={{
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
                containerStyles={{
                  marginTop: 20,
                  padding: 15,
                }}>
                Thanh toán
              </ButtonComponent>
            </View>
          </View>
        </View>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default HospitalFeePaymentInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  overlay: {
    flex: 1,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(226, 245, 245, 0.51)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  myInfo: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
  },

  bookingInfo: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bill: {
    width: '100%',
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    backgroundColor: appColors.white,
  },
  headerBill: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
  },
  mainBill: {
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  line: {
    paddingVertical: 5,
    borderBottomColor: appColors.grayLine,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
  rule: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: appColors.primary,
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});
