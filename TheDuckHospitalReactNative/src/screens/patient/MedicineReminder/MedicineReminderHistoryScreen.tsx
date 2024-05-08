import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LoadingComponent from '../../../components/LoadingComponent';
import {Header, TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';
import TabMyMedicineComponent from '../../../components/patient/medicineReminderScreen/TabMyMedicineComponent';
import ListMedicationsFoAProfileComponent from '../../../components/patient/medicineReminderScreen/ListMedicationsFoAProfileComponent';
import {getReminderHistory} from '../../../services/reminderServices';

const MedicineReminderHistoryScreen = () => {
  const [tabIsUse, setTabIsUse] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);

  useEffect(() => {
    const handleGetReminderHistory = async () => {
      const response = await getReminderHistory();
      if (response.success) setData(response.data.data);
    };

    handleGetReminderHistory();
  }, []);
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
          {tabIsUse ? (
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
  },
});
