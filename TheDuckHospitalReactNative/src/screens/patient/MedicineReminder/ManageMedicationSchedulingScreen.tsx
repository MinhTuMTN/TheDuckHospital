import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ContainerComponent, Header} from '../../../components';
import LineInfoComponent from '../../../components/LineInfoComponent';
import MedicationInfoReminder from '../../../components/patient/medicineReminderScreen/MedicationInfoReminder';
import TabChooseMedicationShedulingComponent from '../../../components/patient/medicineReminderScreen/TabChooseMedicationShedulingComponent';
import {appColors} from '../../../constants/appColors';
import {getPrescriptionDetail} from '../../../services/reminderServices';

const ManageMedicationSchedulingScreen = ({route}: {route: any}) => {
  const {prescriptionInfo, prescripatientProfileId} = route.params;
  const [tabNotSet, setTabNotSet] = React.useState(true);
  const [medicineHaveNotSet, setMedicineHaveNotSet] = React.useState([]);
  const [medicineHaveSet, setMedicineHaveSet] = React.useState([]);
  const [prescription, setPrescription] = React.useState<any>({});

  useEffect(() => {
    const medicineHaveNotSetDetail = async () => {
      const result = await getPrescriptionDetail(
        prescripatientProfileId,
        prescriptionInfo.prescriptionId,
      );

      if (result.success) {
        setPrescription(result.data.data.prescription);
        setMedicineHaveNotSet(result.data.data.notRemindedPrescriptionItems);
        setMedicineHaveSet(result.data.data.remindedPrescriptionItems);
      }
    };
    medicineHaveNotSetDetail();
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title="Đặt lịch nhắc thuốc"
        noBackground
        backgroundColor={appColors.darkBlue}
        paddingStart={20}
      />
      <View style={styles.container}>
        <TabChooseMedicationShedulingComponent
          numberNotSet={medicineHaveNotSet.length}
          numberSet={medicineHaveSet.length}
          tabNotSet={tabNotSet}
          setTabNotSet={setTabNotSet}
        />
        <View style={styles.mainLayout}>
          <View style={styles.header}>
            <LineInfoComponent
              label="Toa thuốc:"
              value={prescriptionInfo.departmentName || ''}
              valueColor={appColors.darkRed}
              valueUppercase
              valueTextAlign="left"
              labelStyles={{fontSize: 15}}
              valueStyles={{fontSize: 15, fontWeight: '600'}}
              flexLabel={1.75}
              flexValue={3.25}
            />
            <LineInfoComponent
              label="Mã toa thuốc:"
              value={prescription.prescriptionCode || ''}
              valueColor={appColors.black}
              valueUppercase
              valueTextAlign="left"
              labelStyles={{fontSize: 15}}
              valueStyles={{fontSize: 15, fontWeight: '600'}}
              flexLabel={1.75}
              flexValue={3.25}
            />
          </View>

          <View
            style={{
              paddingBottom: 5,
            }}>
            <FlatList
              data={tabNotSet ? medicineHaveNotSet : medicineHaveSet}
              keyExtractor={(item: any) =>
                item.prescriptionItem.prescriptionItemId
              }
              renderItem={({item}) => (
                <View>
                  <MedicationInfoReminder
                    medicationInfo={item}
                    isSet={!tabNotSet}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default ManageMedicationSchedulingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  mainLayout: {
    marginTop: 20,
    borderColor: appColors.grayLight,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
