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
import {FileSpreadsheet, Heart, Info} from 'lucide-react-native';
import ExaminationItemComponent from '../../../components/admin/patientManagementScreen/ExaminationItemComponent';

function TransactionDetailScreen() {
  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết giao dịch'} paddingTop={40} />
      <ScrollView>
        <ContainerComponent style={styles.container}>
          <Info size={32} color={appColors.black} />
          <TextComponent bold fontSize={28} style={styles.listLabel}>
            Thông tin cơ bản
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.detailContainer}>
          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Phương thức:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              VNPay
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Tổng tiền:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              200.000 VNĐ
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Ngày tạo:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              31/01/2000
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Trạng thái:
            </TextComponent>
            <TextComponent
              fontSize={20}
              style={{flex: 0.6}}
              color={appColors.green}>
              Thành công
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
    paddingVertical: 10,
  },
  transactionInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flex: 2,
    paddingTop: 0,
    paddingLeft: 40,
  },
  listExamination: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
  },
});

export default TransactionDetailScreen;
