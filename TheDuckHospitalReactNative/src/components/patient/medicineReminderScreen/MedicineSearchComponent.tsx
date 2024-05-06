import {CalendarDays, ChevronRight, Stethoscope} from 'lucide-react-native';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../../constants/appColors';
import FlexComponent from '../../FlexComponent';
import LineInfoComponent from '../../LineInfoComponent';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
interface MedicineSearchComponentProps {
  prescriptionInfo: any;
  patientId: string;
}

const MedicineSearchComponent = (props: MedicineSearchComponentProps) => {
  const {prescriptionInfo, patientId} = props;
  const navigation = useNavigation<navigationProps>();
  const handleOnPress = useCallback(() => {
    navigation.navigate('ManageMedicationSchedulingScreen', {
      prescriptionInfo: prescriptionInfo,
      prescripatientProfileId: patientId,
    });
  }, [navigation, patientId, prescriptionInfo]);
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <LineInfoComponent
        startIcon={<Stethoscope size={16} color={appColors.darkerBlue} />}
        label="Chuyên khoa:"
        labelStyles={{
          fontSize: 15,
          fontWeight: '400',
          color: appColors.grayLight,
          marginLeft: 6,
        }}
        value={prescriptionInfo.departmentName}
        valueTextAlign="left"
        valueUppercase
        numberOfValueLines={1}
        ellipsizeMode="tail"
        valueStyles={{
          fontSize: 16,
          fontWeight: '600',
          color: appColors.darkerBlue,
          paddingEnd: 50,
          letterSpacing: 0.5,
        }}
        flexLabel={1}
        flexValue={2}
      />
      <FlexComponent direction="row" style={{marginTop: 10}}>
        <LineInfoComponent
          startIcon={<CalendarDays size={16} color={appColors.darkerBlue} />}
          label="Ngày khám:"
          labelStyles={{
            fontSize: 15,
            fontWeight: '400',
            color: appColors.grayLight,
            marginLeft: 6,
          }}
          value={dayjs(prescriptionInfo.examinationDate).format('DD/MM/YYYY')}
          valueTextAlign="left"
          valueUppercase
          valueStyles={{
            fontSize: 16,
            fontWeight: '600',
            color: appColors.darkerBlue,
          }}
          flexLabel={1}
          flexValue={2}
        />
      </FlexComponent>

      <View style={styles.buttonNext}>
        <ChevronRight size={55} color={appColors.primaryDark} />
      </View>
    </TouchableOpacity>
  );
};

export default MedicineSearchComponent;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: appColors.white,
    borderColor: appColors.frameColor1,
    borderWidth: 1.5,
    borderRadius: 15,
    flexDirection: 'column',
    elevation: 5,
    marginTop: 10,
    marginBottom: 8,
  },
  buttonNext: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
});
