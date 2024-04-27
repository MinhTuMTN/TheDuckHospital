import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {FileSpreadsheet, Info} from 'lucide-react-native';
import PatientProfileItemComponent from '../../../components/admin/patientManagementScreen/PatientProfileItemComponent';
import {useRoute} from '@react-navigation/native';
import {formatDate} from '../../../utils/dateUtils';

function PatientDetailScreen() {
  const route = useRoute();
  const {patient} = route.params as {patient: any};

  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết bệnh nhân'} paddingTop={40} />
      <ContainerComponent style={styles.container}>
        <Info size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Thông tin cơ bản
        </TextComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.detailContainer}>
        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Mã bệnh nhân:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {patient.patientCode}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Họ tên:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {patient.fullName}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Số điện thoại:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {patient.phoneNumber}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            CCCD/CMND:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {patient.identityNumber}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Giới tính:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {patient.gender === 0 ? 'Nam' : 'Nữ'}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Ngày sinh:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {formatDate(patient.dateOfBirth)}
          </TextComponent>
        </FlexComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.container}>
        <FileSpreadsheet size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Hồ sơ bệnh nhân
        </TextComponent>
      </ContainerComponent>
      {/* <ScrollView style={styles.scrollViewContainer}>
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
      </ScrollView> */}

      <SafeAreaView style={styles.scrollViewContainer}>
        <FlatList
          data={patient.patientProfiles}
          keyExtractor={(item: any, index: number) =>
            `patient-profile-${item.id}-${index}`
          }
          renderItem={({item}) => (
            <PatientProfileItemComponent profile={item} />
          )}
          style={{width: '100%'}}
        />
      </SafeAreaView>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  patientInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flex: 2,
    paddingTop: 0,
    paddingLeft: 40,
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
  },
});

export default PatientDetailScreen;
