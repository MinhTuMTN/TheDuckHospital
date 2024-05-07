import {View, Text} from 'react-native';
import React from 'react';
import ExpandableListItem from '../../ExpandableListItem';
import MedicineInfoInMyMedicineBoxComponent from './MedicineInfoInMyMedicineBoxComponent';

const ListMedicationsFoAProfileComponent = () => {
  return (
    <View>
      <ExpandableListItem
        item={{
          title: 'Nguyễn Thị Uyển Nhi (2)',
          content: <MedicineInfoInMyMedicineBoxComponent isUse />,
        }}
      />
      <ExpandableListItem
        item={{
          title: 'Đinh Minh Hoàng (2)',
          content: <MedicineInfoInMyMedicineBoxComponent isUse={false} />,
        }}
      />
    </View>
  );
};

export default ListMedicationsFoAProfileComponent;
