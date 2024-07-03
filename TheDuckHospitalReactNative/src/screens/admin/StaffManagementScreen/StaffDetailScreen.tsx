import React, {useState} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Info} from 'lucide-react-native';
import {useRoute} from '@react-navigation/native';
import {formatDate} from '../../../utils/dateUtils';

const nurseTypes = [
  {value: 'CLINICAL_NURSE', label: 'Phòng khám'},
  {value: 'INPATIENT_NURSE', label: 'Nội trú'},
];

function StaffDetailScreen() {
  const route = useRoute();
  const {staff} = route.params as {staff: any};
  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết nhân viên'} paddingTop={40} />
      <ScrollView>
        <ContainerComponent
          style={{width: '100%', alignItems: 'center', paddingTop: 10}}>
          <Space paddingTop={4} />
          <Image
            source={{
              uri: staff.avatar
                ? staff.avatar
                : 'https://icons.iconarchive.com/icons/icons-land/medical/128/People-Doctor-Male-icon.png',
            }}
            height={250}
            width={250}
            style={{
              borderRadius: 125,
              borderWidth: 5,
              borderColor: appColors.lightPrimary,
            }}
          />
          <Space paddingTop={4} />
          <View style={{backgroundColor: appColors.primary, borderRadius: 20}}>
            <TextComponent
              style={{paddingVertical: 8, paddingHorizontal: 10}}
              fontSize={12}
              color={appColors.white}
              bold>{`staff-id: ${staff.staffId}`}</TextComponent>
          </View>
          {staff?.role === 'Bác sĩ' && (
            <>
              <Space paddingTop={4} />
              <AirbnbRating
                isDisabled={true}
                showRating={false}
                defaultRating={staff?.rating}
                count={5}
                size={28}
                starContainerStyle={{
                  width: '50%',
                  justifyContent: 'space-between',
                }}
              />
            </>
          )}
        </ContainerComponent>
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
          {staff.role === 'Bác sĩ' && (
            <>
              <FlexComponent style={styles.staffInfoContainer}>
                <TextComponent bold fontSize={20} style={{flex: 0.4}}>
                  Bằng cấp:
                </TextComponent>
                <TextComponent fontSize={20} style={{flex: 0.6}}>
                  {staff.degree}
                </TextComponent>
              </FlexComponent>
            </>
          )}

          {staff.role === 'Điều dưỡng' && staff.nurseType !== null && (
            <>
              <FlexComponent style={styles.staffInfoContainer}>
                <TextComponent bold fontSize={20} style={{flex: 0.4}}>
                  Loại điều dưỡng:
                </TextComponent>
                <TextComponent fontSize={20} style={{flex: 0.6}}>
                  {
                    nurseTypes.find(type => type.value === staff.nurseType)
                      ?.label
                  }
                </TextComponent>
              </FlexComponent>
            </>
          )}

          {(staff.role === 'Bác sĩ' || staff.role === 'Điều dưỡng') &&
            staff.nurseType !== null && (
              <>
                <FlexComponent style={styles.staffInfoContainer}>
                  <TextComponent bold fontSize={20} style={{flex: 0.4}}>
                    Chuyên khoa:
                  </TextComponent>
                  <TextComponent fontSize={20} style={{flex: 0.6}}>
                    {staff.departmentName
                      ? staff.departmentName
                      : 'Chưa cập nhật'}
                  </TextComponent>
                </FlexComponent>
              </>
            )}

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
              Ngày sinh:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              {formatDate(staff.dateOfBirth)}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.staffInfoContainer}>
            <TextComponent bold fontSize={20} style={{flex: 0.4}}>
              Giới tính:
            </TextComponent>
            <TextComponent fontSize={20} style={{flex: 0.6}}>
              {staff.gender === 0 ? 'Nam' : 'Nữ'}
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
        </ContainerComponent>
      </ScrollView>
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
