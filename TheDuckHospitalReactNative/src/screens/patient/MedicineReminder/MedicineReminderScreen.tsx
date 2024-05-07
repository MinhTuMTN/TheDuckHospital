import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {ArrowLeft} from 'lucide-react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContainerComponent,
  Header,
  MedicineReminderChooseDate,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import MedicineReminderOptinesComponent from '../../../components/patient/medicineReminderScreen/MedicineReminderOptinesComponent';
import {appColors} from '../../../constants/appColors';
import {remindersDetail} from '../../../services/reminderServices';
import LoadingComponent from '../../../components/LoadingComponent';
import {globalStyles} from '../../../styles/globalStyles';
import {LoginManager} from 'react-native-fbsdk-next';
import LoginRequireComponent from '../../../components/LoginRequireComponent';

const data = [];

const classifyMedicinesByTimeOfDay = (medicines: any) => {
  const morningMeds: any = [];
  const noonMeds: any = [];
  const afternoonMeds: any = [];
  const eveningMeds: any = [];

  const noonStart = 11;
  const afternoonStart = 13;
  const eveningStart = 18;

  medicines.forEach((medicine: any) => {
    const hour = dayjs(medicine.reminderTime).get('hour');
    if (hour < noonStart) {
      morningMeds.push(medicine);
    } else if (hour < afternoonStart) {
      noonMeds.push(medicine);
    } else if (hour < eveningStart) {
      afternoonMeds.push(medicine);
    } else {
      eveningMeds.push(medicine);
    }
  });

  return {morningMeds, noonMeds, afternoonMeds, eveningMeds};
};

const MedicineReminderScreen = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const navigation = useNavigation();
  const [listReminder, setListReminder] = useState([]);

  const {morningMeds, noonMeds, afternoonMeds, eveningMeds} = useMemo(() => {
    const {morningMeds, noonMeds, afternoonMeds, eveningMeds} =
      classifyMedicinesByTimeOfDay(listReminder);

    return {morningMeds, noonMeds, afternoonMeds, eveningMeds};
  }, [listReminder]);

  const getListReminder = useCallback(
    async (isLoading: boolean = true) => {
      if (isLoading) setIsLoading(true);
      const response = await remindersDetail(selectedDate.format('YYYY-MM-DD'));
      if (isLoading) setIsLoading(false);

      if (response.success) {
        setListReminder(response.data.data);
      }
    },
    [selectedDate],
  );

  useEffect(() => {
    getListReminder(true);
  }, [getListReminder]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setFirstRender(false);
    }, 100);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return firstRender ? (
    <View style={globalStyles.center}>
      <ActivityIndicator size={'large'} color={appColors.primary} />
    </View>
  ) : (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Nhắc nhở uống thuốc"
          uppercase={false}
          titleSize={22}
          noBackground
          backIcon={
            <View
              style={{
                backgroundColor: 'rgba(230, 230, 230, 0.26)',
                width: 27,
                height: 27,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <ArrowLeft size={25} color={appColors.white} />
            </View>
          }
          backgroundColor={appColors.darkBlue}
        />
        <MedicineReminderChooseDate
          selectedDate={selectedDate}
          onChangeSelectedDate={date => setSelectedDate(date)}
        />

        <View style={styles.main}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={appColors.primary} />
            </View>
          ) : listReminder.length === 0 ? (
            <View style={styles.noMedicationReminder}>
              <Image
                source={require('../../../assets/images/noMedicationReminder.jpg')}
                style={{width: '80%', height: 200, marginBottom: 10}}
              />
              <TextComponent
                fontWeight="700"
                style={{
                  marginBottom: 8,
                }}>
                Bạn chưa có lịch hẹn uống thuốc nào
              </TextComponent>

              <TextComponent
                textAlign="center"
                style={{letterSpacing: 0.5, lineHeight: 22}}>
                Hãy thêm toa thuốc của bác sĩ {'\n'}
                để đặt nhắc nhở uống thuốc nhé
              </TextComponent>
              <ButtonComponent
                onPress={() =>
                  navigation.navigate(
                    'ChooseProfileForMedicineReminderScreen' as never,
                  )
                }
                borderRadius={20}
                backgroundColor={appColors.darkBlue}
                containerStyles={{
                  marginTop: 20,
                  paddingHorizontal: 30,
                  paddingVertical: 12,
                }}
                textStyles={{
                  fontWeight: '500',
                  fontSize: 16,
                }}
                startIcon={
                  <MaterialCommunityIcons
                    name="pill"
                    size={20}
                    color={appColors.white}
                  />
                }>
                Quản lý toa thuốc
              </ButtonComponent>
            </View>
          ) : (
            <ScrollView style={styles.medicationReminder}>
              {morningMeds.length > 0 && (
                <>
                  <View style={styles.timeOfDay}>
                    <Image
                      source={require('../../../assets/images/sun.png')}
                      style={{width: 35, height: 35, marginRight: 10}}
                    />
                    <TextComponent
                      fontWeight="700"
                      fontSize={20}
                      color={appColors.grayText}>
                      Buổi sáng
                    </TextComponent>
                  </View>
                  {morningMeds.map((medicine: any) => (
                    <MedicineReminderOptinesComponent
                      onRefresh={getListReminder}
                      key={medicine.medicineReminderDetailId}
                      medicineReminder={medicine}
                    />
                  ))}
                </>
              )}

              {noonMeds.length > 0 && (
                <>
                  <View style={styles.timeOfDay}>
                    <Image
                      source={require('../../../assets/images/noon.png')}
                      style={{width: 35, height: 35, marginRight: 10}}
                    />
                    <TextComponent
                      fontWeight="700"
                      fontSize={20}
                      color={appColors.grayText}>
                      Buổi trưa
                    </TextComponent>
                  </View>
                  {noonMeds.map((medicine: any) => (
                    <MedicineReminderOptinesComponent
                      onRefresh={getListReminder}
                      key={medicine.medicineReminderDetailId}
                      medicineReminder={medicine}
                    />
                  ))}
                </>
              )}

              {afternoonMeds.length > 0 && (
                <>
                  <View style={styles.timeOfDay}>
                    <Image
                      source={require('../../../assets/images/sunsets.png')}
                      style={{width: 35, height: 35, marginRight: 10}}
                    />
                    <TextComponent
                      fontWeight="700"
                      fontSize={20}
                      color={appColors.grayText}>
                      Buổi chiều
                    </TextComponent>
                  </View>
                  {afternoonMeds.map((medicine: any) => (
                    <MedicineReminderOptinesComponent
                      onRefresh={getListReminder}
                      key={medicine.medicineReminderDetailId}
                      medicineReminder={medicine}
                    />
                  ))}
                </>
              )}

              {eveningMeds.length > 0 && (
                <>
                  <View style={styles.timeOfDay}>
                    <Image
                      source={require('../../../assets/images/night.png')}
                      style={{width: 35, height: 35, marginRight: 10}}
                    />
                    <TextComponent
                      fontWeight="700"
                      fontSize={20}
                      color={appColors.grayText}>
                      Buổi tối
                    </TextComponent>
                  </View>
                  {eveningMeds.map((medicine: any) => (
                    <MedicineReminderOptinesComponent
                      onRefresh={getListReminder}
                      key={medicine.medicineReminderDetailId}
                      medicineReminder={medicine}
                    />
                  ))}
                </>
              )}
            </ScrollView>
          )}
        </View>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: appColors.darkBlue,
  },
  main: {
    backgroundColor: appColors.white,
    flex: 1,
    marginTop: -16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  noMedicationReminder: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  medicationReminder: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  timeOfDay: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
  },
  footer: {
    backgroundColor: appColors.white,
    elevation: 10,
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '46%',
    paddingHorizontal: 16,
  },
  buttonAddMore: {
    position: 'absolute',
    backgroundColor: appColors.darkBlue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    bottom: 30,
    right: 167,
  },
});

export default MedicineReminderScreen;
