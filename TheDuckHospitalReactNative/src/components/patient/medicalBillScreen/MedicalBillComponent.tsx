import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Space, TextComponent} from '../..';
import {CircleDashed} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';

const MedicalBillComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <TextComponent fontWeight="600">The Duck Hospital</TextComponent>
            <TextComponent fontWeight="500" color={appColors.textDescription}>
              Thứ sáu, 16 tháng 2 năm 2024
            </TextComponent>
          </View>
          <View
            style={[
              {
                backgroundColor: appColors.yellow,
              },
              styles.status,
            ]}>
            <CircleDashed size={20} color={appColors.white} />
          </View>
        </View>
        <View style={styles.patientDoctor}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            style={{flex: 2}}>
            Bệnh nhân:
          </TextComponent>
          <TextComponent fontWeight="500" style={{flex: 4}}>
            Nguyễn Văn A
          </TextComponent>
        </View>
        <View style={styles.patientDoctor}>
          <TextComponent
            fontWeight="500"
            color={appColors.textDescription}
            style={{flex: 2}}>
            Bác sĩ
          </TextComponent>
          <TextComponent fontWeight="500" style={{flex: 4}}>
            Nguyễn Văn B
          </TextComponent>
        </View>
        <View style={styles.additionalInfo}>
          <View>
            <TextComponent fontWeight="500" color={appColors.textDescription}>
              Chuyên khoa
            </TextComponent>
            <Space paddingBottom={0} />
            <TextComponent fontWeight="500">Phổi</TextComponent>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextComponent fontWeight="500" color={appColors.textDescription}>
              Số thứ tự
            </TextComponent>
            <Space paddingBottom={0} />
            <TextComponent fontWeight="500">77</TextComponent>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TextComponent fontWeight="500" color={appColors.textDescription}>
              Trạng thái
            </TextComponent>
            <Space paddingBottom={0} />
            <TextComponent fontWeight="500" color={appColors.primary}>
              Chưa khám
            </TextComponent>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    marginRight: 8,
    borderRadius: 20,
    padding: 3,
  },
  content: {
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 5,
    rowGap: 8,
  },
  patientDoctor: {
    flexDirection: 'row',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MedicalBillComponent;
