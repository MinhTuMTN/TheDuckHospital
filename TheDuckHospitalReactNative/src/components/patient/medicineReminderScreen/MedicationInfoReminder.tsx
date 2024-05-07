import React, {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TextComponent from '../../TextComponent';
import SeparatorDashComponent from '../../SeparatorDashComponent';
import LineInfoComponent from '../../LineInfoComponent';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../ButtonComponent';
import {AlarmClockCheck, AlarmClockOff} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {howToUse} from '../../../utils/medicineUtils';
import {navigationProps} from '../../../types';

const buoiUong = [
  {
    key: 'morning',
    value: 'Sáng',
  },
  {
    key: 'noon',
    value: 'Trưa',
  },
  {
    key: 'afternoon',
    value: 'Chiều',
  },
  {
    key: 'evening',
    value: 'Tối',
  },
];
interface MedicationInfoReminderProps {
  medicationInfo: any;
  isSet?: boolean;
}
const MedicationInfoReminder = (props: MedicationInfoReminderProps) => {
  const {medicationInfo, isSet} = props;
  const navigation = useNavigation<navigationProps>();
  const quantityPerTime =
    medicationInfo.prescriptionItem.quantityPerTime.toString() === '0'
      ? medicationInfo.prescriptionItem.dosageInstruction
      : medicationInfo.prescriptionItem.quantityPerTime.toString();
  const buoiUongValue = useMemo(() => {
    console.log(medicationInfo);
    let buoiUongValue = '';
    return buoiUongValue;
  }, [medicationInfo]);

  return (
    <View>
      <SeparatorDashComponent marginTop={10} />
      <View style={styles.container}>
        <View style={styles.imageLayout}>
          <Image
            source={require('../../../assets/images/medicinesInfo.png')}
            style={{width: 32, height: 32}}
          />
        </View>
        <View style={styles.infoLayOut}>
          <TextComponent
            fontWeight="600"
            fontSize={19}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              paddingTop: 3,
              paddingBottom: 6,
            }}>
            {medicationInfo.prescriptionItem.medicine.medicineName}
          </TextComponent>
          <LineInfoComponent
            containerStyles={{
              marginTop: 5,
            }}
            label="Cách dùng:"
            labelStyles={{
              fontWeight: '500',
              fontSize: 16,
              letterSpacing: 0.7,
              color: appColors.grayLight,
            }}
            value={howToUse(medicationInfo.prescriptionItem.medicine.unit)}
            valueStyles={{
              fontWeight: '700',
              letterSpacing: 0.7,
            }}
            valueTextAlign="left"
            flexLabel={2.5}
            flexValue={3.5}
          />
          <LineInfoComponent
            containerStyles={{
              marginTop: 5,
            }}
            label="Lần/ngày:"
            labelStyles={{
              fontWeight: '500',
              fontSize: 16,
              letterSpacing: 0.7,
              color: appColors.grayLight,
            }}
            value={medicationInfo.prescriptionItem.timesPerDay}
            valueStyles={{
              fontWeight: '700',
              letterSpacing: 0.7,
            }}
            valueTextAlign="left"
            flexLabel={2.5}
            flexValue={3.5}
          />
          <LineInfoComponent
            containerStyles={{
              marginTop: 5,
            }}
            label="Số lượng/lần:"
            labelStyles={{
              fontWeight: '500',
              fontSize: 16,
              letterSpacing: 0.7,
              color: appColors.grayLight,
            }}
            value={quantityPerTime}
            valueStyles={{
              fontWeight: '700',
              letterSpacing: 0.7,
            }}
            valueTextAlign="left"
            flexLabel={2.5}
            flexValue={3.5}
          />
          <LineInfoComponent
            containerStyles={{
              marginTop: 5,
            }}
            label="Buổi uống:"
            labelStyles={{
              fontWeight: '500',
              fontSize: 16,
              letterSpacing: 0.7,
              color: appColors.grayLight,
            }}
            value=""
            valueStyles={{
              fontWeight: '700',
              letterSpacing: 0.7,
            }}
            valueTextAlign="left"
            flexLabel={2.5}
            flexValue={3.5}
          />
          {isSet ? (
            <ButtonComponent
              borderRadius={10}
              backgroundColor="rgba(122, 208, 99, 0.19)"
              textColor="#279818"
              fontWeight="600"
              textStyles={{
                letterSpacing: 0.7,
              }}
              containerStyles={{
                marginTop: 16,
                borderColor: '#1a9b09',
                borderWidth: 1,
                paddingHorizontal: 16,
              }}
              startIcon={<AlarmClockCheck size={18} color={'#279818'} />}>
              Đã đặt lịch uống thuốc
            </ButtonComponent>
          ) : (
            <ButtonComponent
              borderRadius={10}
              backgroundColor="rgba(253, 198, 114, 0.19)"
              textColor="#F07300"
              fontWeight="600"
              textStyles={{
                letterSpacing: 0.7,
              }}
              containerStyles={{
                marginTop: 16,
                borderColor: '#ec9718',
                borderWidth: 1,
                paddingHorizontal: 16,
              }}
              startIcon={<AlarmClockOff size={18} color={'#fd7b02'} />}
              onPress={() =>
                navigation.navigate('ScheduleMedicationRemindersScreen', {
                  isEdit: false,
                })
              }>
              Đặt lịch uống thuốc
            </ButtonComponent>
          )}
        </View>
      </View>
    </View>
  );
};

export default MedicationInfoReminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageLayout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoLayOut: {
    flex: 7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
