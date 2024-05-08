import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import LoadingComponent from '../../../components/LoadingComponent';
import {Header, Space, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';
import TabMyMedicineComponent from '../../../components/patient/medicineReminderScreen/TabMyMedicineComponent';
import ListMedicationsFoAProfileComponent from '../../../components/patient/medicineReminderScreen/ListMedicationsFoAProfileComponent';
import {getReminderHistory} from '../../../services/reminderServices';
import {useIsFocused} from '@react-navigation/native';

const MedicineReminderHistoryScreen = () => {
  const [tabIsUse, setTabIsUse] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const handleGetReminderHistory = async () => {
      setIsLoading(true);
      const response = await getReminderHistory();
      setIsLoading(false);
      if (response.success) setData(response.data.data);
    };

    if (isFocused) handleGetReminderHistory();
  }, [isFocused]);
  return (
    <LoadingComponent styles={{flex: 1}}>
      <View style={styles.container}>
        <Header
          title="Thuốc của tôi"
          noBackground
          backgroundColor={appColors.darkBlue}
          paddingStart={10}
        />
        <View style={styles.wrapper}>
          <TabMyMedicineComponent
            tabIsUse={tabIsUse}
            setTabIsUse={setTabIsUse}
          />
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={appColors.primary} />
              <Space paddingTop={16} />
              <TextComponent fontSize={16} fontWeight="600">
                Đang tải dữ liệu...
              </TextComponent>
            </View>
          ) : tabIsUse ? (
            <View style={styles.layout}>
              <ListMedicationsFoAProfileComponent
                isUse={true}
                data={data.filter(
                  item =>
                    item.usingPrescriptionItems &&
                    item.usingPrescriptionItems.length > 0,
                )}
              />
            </View>
          ) : (
            <View style={styles.layout}>
              <ListMedicationsFoAProfileComponent
                isUse={false}
                data={data.filter(
                  item =>
                    item.usedPrescriptionItems &&
                    item.usedPrescriptionItems.length > 0,
                )}
              />
            </View>
          )}
        </View>
      </View>
    </LoadingComponent>
  );
};

export default MedicineReminderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.darkBlue,
  },
  wrapper: {
    flex: 1,
    backgroundColor: appColors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 35,
    paddingHorizontal: 20,
  },
  layout: {
    flexDirection: 'column',
    paddingTop: 50,
    flex: 1,
  },
});
