import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextComponent} from '../..';
import {appInfo} from '../../../constants/appInfo';

interface TopDoctorComponentProps {
  doctorInfo: any;
}
const TopDoctorComponent = (props: TopDoctorComponentProps) => {
  const {doctorInfo} = props;

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={{
            uri:
              doctorInfo.doctor?.avatar ||
              'https://i.vietgiaitri.com/2021/6/23/mua-2-moi-chieu-hospital-playlist-da-tinh-den-chuyen-lam-mua-3-nhung-1-nhan-vat-khong-hai-long-e9d-5841612.jpg',
          }}
          height={85}
          width={85}
          style={{borderRadius: 18}}
        />
      </View>
      <View style={styles.aboutInfo}>
        <TextComponent
          style={{marginTop: 8, width: '100%'}}
          numberOfLines={2}
          ellipsizeMode="tail"
          fontWeight="600"
          textAlign="center">
          {doctorInfo.doctor?.fullName}
        </TextComponent>
        <TextComponent
          style={{marginTop: 4, color: 'gray'}}
          fontSize={14}
          numberOfLines={1}>
          {doctorInfo.department?.departmentName}
        </TextComponent>
      </View>
    </View>
  );
};

export default TopDoctorComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 16,
    width: appInfo.size.width * 0.3,
  },
  avatar: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 100,
    width: 100,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutInfo: {
    alignItems: 'center',
    width: '80%',
  },
});
