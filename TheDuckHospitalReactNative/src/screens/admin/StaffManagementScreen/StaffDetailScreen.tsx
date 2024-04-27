import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {ScrollView} from '@gluestack-ui/themed';
import {Calendar, Info} from 'lucide-react-native';
import ScheduleItemComponent from '../../../components/admin/staffManagementScreen/ScheduleItemComponent';
import { useRoute } from '@react-navigation/native';

function StaffDetailScreen() {
  const route = useRoute();
  const {staff} = route.params as {staff: any};
  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết nhân viên'} paddingTop={40} />
      <ContainerComponent style={styles.container}>
        <Info size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Thông tin cơ bản
        </TextComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.detailContainer}>
        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Họ tên:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.fullName}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Chức vụ:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.role}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Số điện thoại:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.phoneNumber}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Bằng cấp:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.degree}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            CCCD/CMND:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.identityNumber}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={[styles.staffInfoContainer]}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Email:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6, flexWrap: 'wrap'}}>
            {staff.email}
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.staffInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Giới tính:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            {staff.gender === 0 ? "Nam" : "Nữ"}
          </TextComponent>
        </FlexComponent>
      </ContainerComponent>

      {/* <ContainerComponent style={styles.container}>
        <Calendar size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Lịch trực
        </TextComponent>
      </ContainerComponent>
      <ScrollView style={styles.scrollViewContainer}>
        <ScheduleItemComponent morning />
        <ScheduleItemComponent />
      </ScrollView> */}
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  staffInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flex: 0.8,
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

export default StaffDetailScreen;
