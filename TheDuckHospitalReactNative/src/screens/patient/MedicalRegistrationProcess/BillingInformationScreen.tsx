import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ContainerComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LineInfoComponent from '../../../components/LineInfoComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Done} from '../../../assets/svgs';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

const BillingInformationScreen = () => {
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
                  label="Nguyễn Ngọc Ánh Tuyết"
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
                  label="20/07/1997"
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
                  label="0372849294"
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
                  label="484 Lê Văn Việt, phường Tăng Nhơn Phú A, Quận 9, TP.HCM"
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
                <LineInfoComponent
                  label="Bác sĩ"
                  value="Đinh Huỳnh Tố Hương"
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
                <Space paddingTop={5} />
                <LineInfoComponent
                  label="Chuyên khoa"
                  value="Thần kinh"
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
                  label="Ngày khám"
                  value="22/02/2024"
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
                  label="Giờ khám"
                  value="07:00-08:00"
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
                value="150.000đ"
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
                label="Phí tiện ích + TGTT"
                value="11.670đ"
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
                value="161.670đ"
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
                  textAlign="auto"
                  flexWrap="wrap">
                  Tôi đồng ý Phí tiện ý TheDuck Hospital cung cấp để đặt khám,
                  thanh toán viện phí, đây không phải là dịch vụ bắt buộc bởi cơ
                  sở ý tế.
                </TextComponent>
              </View>
              <TouchableOpacity style={styles.button}>
                <TextComponent
                  color={appColors.white}
                  fontWeight="600"
                  fontSize={15}
                  uppercase>
                  Thanh toán
                </TextComponent>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default BillingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appColors.white,
  },
  overlay: {
    flex: 6,
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
    flex: 5.5,
    width: '100%',
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 3,
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
    paddingVertical: 15,
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
    marginTop: 20,
  },
});
