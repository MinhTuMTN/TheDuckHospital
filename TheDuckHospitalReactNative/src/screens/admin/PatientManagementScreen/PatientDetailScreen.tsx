import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {ScrollView} from '@gluestack-ui/themed';
import {FileSpreadsheet, Info} from 'lucide-react-native';
import PatientProfileItemComponent from '../../../components/admin/patientManagementScreen/PatientProfileItemComponent';

function PatientDetailScreen() {
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
            BN12345678
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Họ tên:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            Trần Ngũ
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Số điện thoại:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            0123456789
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            CCCD/CMND:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            123456789101
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Giới tính:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            Nam
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.patientInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Ngày sinh:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            01/01/2000
          </TextComponent>
        </FlexComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.container}>
        <FileSpreadsheet size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Hồ sơ bệnh nhân
        </TextComponent>
      </ContainerComponent>
      <ScrollView style={styles.scrollViewContainer}>
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
        <PatientProfileItemComponent />
      </ScrollView>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
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
    flex: 0.55,
    paddingTop: 0,
    paddingLeft: 40,
  },
  scrollViewContainer: {
    flex: 0.1,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
  },
});

export default PatientDetailScreen;
