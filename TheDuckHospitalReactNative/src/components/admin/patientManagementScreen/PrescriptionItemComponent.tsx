import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {appColors} from '../../../constants/appColors';
import {HeartPulse, Info, Pill} from 'lucide-react-native';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@gluestack-ui/themed';
import {formatDate} from '../../../utils/dateUtils';
import {formatCurrency} from '../../../utils/currencyUtils';

const units = [
  {
    value: 'TUBE',
    label: 'tuýp',
  },
  {
    value: 'BOTTLE',
    label: 'chai',
  },
  {
    value: 'BOX',
    label: 'hộp',
  },
  {
    value: 'BAG',
    label: 'túi',
  },
  {
    value: 'CAPSULE',
    label: 'viên',
  },
];

interface PrescriptionItemComponentProps {
  item: any;
}

const PrescriptionItemComponent = (props: PrescriptionItemComponentProps) => {
  const {item} = props;

  return (
    <FlexComponent style={styles.presciptionInfoContainer}>
      <TextComponent bold fontSize={18}>
        {`${item.medicine.medicineName} (x${item.quantity} ${
          units.find(unit => unit.value === item.medicine.unit)?.label
        })`}
      </TextComponent>
      <TextComponent fontSize={18}>{`${formatCurrency(
        item.total,
      )} VNĐ`}</TextComponent>
    </FlexComponent>
  );
};

const styles = StyleSheet.create({
  presciptionInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
});

export default PrescriptionItemComponent;
