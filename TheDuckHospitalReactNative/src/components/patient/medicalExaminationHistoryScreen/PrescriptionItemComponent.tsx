import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import {FlexComponent, TextComponent} from '../..';

interface PrescriptionItemComponentProps {
  prescriptionItem: any;
}

const PrescriptionItemComponent = (props: PrescriptionItemComponentProps) => {
  const {prescriptionItem} = props;

  return (
    <FlexComponent style={styles.prescriptionItemContainer}>
      <FlexComponent>
        <TextComponent fontWeight="600" fontSize={18}>
          {prescriptionItem?.medicine.medicineName || 'Clinozpam'}
        </TextComponent>
        <TextComponent italic fontSize={16}>
          {prescriptionItem?.dosageInstruction || 'Sáng 1v, trưa 1v, tối 1v'}
        </TextComponent>
      </FlexComponent>
      <TextComponent fontWeight="600" fontSize={16}>
        {`${prescriptionItem?.quantity} ${prescriptionItem?.medicine.unit}` ||
          '90 viên'}
      </TextComponent>
    </FlexComponent>
  );
};

const styles = StyleSheet.create({
  prescriptionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: appColors.gray,
  },
});

export default PrescriptionItemComponent;
