import dayjs from 'dayjs';
import {ArrowLeft} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  Header,
  MedicineReminderChooseDate,
} from '../../../components';
import {appColors} from '../../../constants/appColors';

const MedicineReminderScreen = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setIsLoading(false);
    }, 50);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);
  return (
    <ContainerComponent paddingTop={0}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={appColors.primary} />
        </View>
      ) : (
        <>
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
          <View style={styles.main}></View>
        </>
      )}
    </ContainerComponent>
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
  },
});

export default MedicineReminderScreen;
