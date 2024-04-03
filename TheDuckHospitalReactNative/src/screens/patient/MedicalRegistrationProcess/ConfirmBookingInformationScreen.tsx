import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StethoscopeBlue} from '../../../assets/svgs';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import InfoBookingComponent from '../../../components/patient/confirmBookingScreen/InfoBookingComponent';
import {appColors} from '../../../constants/appColors';
import {navigationProps} from '../../../types';
import {formatCurrency} from '../../../utils/currencyUtils';

const ConfirmBookingInformationScreen = ({route}: {route: any}) => {
  const {timeSlots} = route.params;
  const [timeSlotsState, setTimeSlotsState] = React.useState(timeSlots || []);

  const navigation = useNavigation<navigationProps>();
  const totalAmount = useMemo(() => {
    return timeSlotsState.reduce((total: number, item: any) => {
      return total + item.price;
    }, 0);
  }, [timeSlotsState]);
  const handleNavigate = () => {
    navigation.navigate('ChooseProfileScreen', {
      timeSlots: timeSlotsState,
    });
  };
  const handleNavigateAddDepartment = () => {
    navigation.navigate('ChooseDoctorsScreen', {
      timeSlots: timeSlotsState,
    });
  };

  useEffect(() => {
    if (timeSlotsState.length === 0) handleNavigateAddDepartment();
  }, [timeSlotsState]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Xác nhận thông tin"
          paddingStart={26}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <View style={styles.container}>
          <View style={styles.bodyContainer}>
            <View style={styles.bodyHeader}>
              <TextComponent fontSize={13} fontWeight="500">
                Chuyên khoa đã chọn{' '}
                <TextComponent fontSize={13} fontWeight="700">
                  (3)
                </TextComponent>
              </TextComponent>
              <Pressable
                onPress={() => {
                  setTimeSlotsState([]);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextComponent
                  fontSize={13}
                  fontWeight="500"
                  color={appColors.error}>
                  Xoá hểt
                </TextComponent>
                <AntDesign
                  name="close"
                  size={16}
                  color={appColors.error}
                  style={{paddingLeft: 5}}
                />
              </Pressable>
            </View>
            <View style={styles.bodyMain}>
              {timeSlotsState.map((item: any, index: number) => (
                <InfoBookingComponent
                  key={index}
                  item={item}
                  onDelete={() => {
                    const temp = timeSlotsState.filter(
                      (timeSlot: any) => timeSlot !== item,
                    );
                    setTimeSlotsState(temp);
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextComponent fontSize={17} fontWeight="500">
              Tổng tiền tạm tính:{' '}
            </TextComponent>
            <TextComponent
              fontSize={17}
              fontWeight="700"
              color={appColors.primary}>
              {formatCurrency(totalAmount) + ' đ'}
            </TextComponent>
          </View>
          {timeSlotsState.length < 3 && (
            <ButtonComponent
              onPress={handleNavigateAddDepartment}
              startIcon={<StethoscopeBlue width={20} height={20} />}
              textStyles={{
                fontSize: 17,
                fontWeight: '700',
                color: appColors.primary,
              }}
              containerStyles={[
                styles.button,
                {
                  borderColor: appColors.primary,
                  borderWidth: 1,
                  flexDirection: 'row',
                  backgroundColor: appColors.white,
                },
              ]}>
              Thêm chuyên khoa
            </ButtonComponent>
          )}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: appColors.primary,
              },
            ]}
            onPress={handleNavigate}>
            <TextComponent
              fontSize={17}
              fontWeight="700"
              color={appColors.white}>
              Xác nhận
            </TextComponent>
          </TouchableOpacity>
        </View>
      </ContainerComponent>
    </GestureHandlerRootView>
  );
};

export default ConfirmBookingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appColors.backgroundGray,
  },
  bodyContainer: {
    flexDirection: 'column',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    borderColor: '#000000',
    borderWidth: 1,
  },
  bodyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 10,
    borderBottomColor: appColors.black,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  bodyMain: {
    flexDirection: 'column',
  },

  footer: {
    marginTop: 10,
    flexDirection: 'column',
    paddingHorizontal: 20,
    elevation: 6,
    backgroundColor: appColors.white,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    borderRadius: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});
