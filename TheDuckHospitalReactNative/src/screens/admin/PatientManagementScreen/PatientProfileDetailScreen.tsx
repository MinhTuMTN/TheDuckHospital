import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Accordion, ScrollView} from '@gluestack-ui/themed';
import {FileSpreadsheet, Info} from 'lucide-react-native';
import ExaminationItemComponent from '../../../components/admin/patientManagementScreen/ExaminationItemComponent';

function PatientProfileDetailScreen() {
  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết hồ sơ'} paddingTop={40} />
      <ScrollView>
        <ContainerComponent style={styles.container}>
          <Info size={32} color={appColors.black} />
          <TextComponent bold fontSize={28} style={styles.listLabel}>
            Thông tin cơ bản
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.detailContainer}>
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

          <FlexComponent style={styles.patientInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Dân tộc:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              Kinh
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={[styles.patientInfoContainer]}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Địa chỉ:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6, flexWrap: 'wrap'}}>
              Số 1 Võ Văn Ngân, phường Linh Chiểu, thành phố Thủ Đức
            </TextComponent>
          </FlexComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.container}>
          <FileSpreadsheet size={32} color={appColors.black} />
          <TextComponent bold fontSize={28} style={styles.listLabel}>
            Hồ sơ bệnh án
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.listExamination}>
          <Accordion type="single" width={'100%'} shadowColor="transparent">
            <ExaminationItemComponent value="a" />
            <ExaminationItemComponent value="b" />
            <ExaminationItemComponent value="c" />
          </Accordion>
        </ContainerComponent>
      </ScrollView>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
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
    marginBottom: 5,
  },
  detailContainer: {
    flex: 2,
    paddingTop: 0,
    paddingLeft: 40,
  },
  listExamination: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
  },
});

export default PatientProfileDetailScreen;
