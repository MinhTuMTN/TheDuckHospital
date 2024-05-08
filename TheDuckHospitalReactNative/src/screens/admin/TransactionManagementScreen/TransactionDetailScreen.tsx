import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
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
import {useRoute} from '@react-navigation/native';
import {formatCurrency} from '../../../utils/currencyUtils';
import {formatDate} from '../../../utils/dateUtils';

function TransactionDetailScreen() {
  const route = useRoute();
  const {transaction} = route.params as {transaction: any};
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
              {transaction.paymentMethod}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Tổng tiền:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              {`${formatCurrency(transaction.amount)} VNĐ`}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Ngày tạo:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              {formatDate(transaction.createdAt)}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.transactionInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Trạng thái:
            </TextComponent>
            <TextComponent
              fontSize={20}
              style={{flex: 0.6}}
              color={
                transaction.status === 'SUCCESS'
                  ? appColors.green
                  : transaction.status === 'FAILED'
                  ? appColors.darkRed
                  : appColors.yellow
              }>
              {transaction.status === 'SUCCESS'
                ? 'Thành công'
                : transaction.status === 'FAILED'
                ? 'Thất bại'
                : 'Đang chờ'}
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
            {transaction.bookings.map((item: any, index: number) => (
              <ExaminationItemComponent
                key={index}
                value={item.booking.bookingId}
                item={item}
              />
            ))}
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
