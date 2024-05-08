import {View, Text, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import ExpandableListItem from '../../ExpandableListItem';
import MedicineInfoInMyMedicineBoxComponent from './MedicineInfoInMyMedicineBoxComponent';

interface Props {
  data: any;
  isUse: boolean;
}

const ContentContainer = (props: {data: any; isUse: boolean}) => {
  const {data, isUse} = props;
  return (
    <View>
      {data.map((item: any, index: number) => (
        <MedicineInfoInMyMedicineBoxComponent
          item={item}
          key={index}
          isUse={isUse}
        />
      ))}
    </View>
  );
};

const ListMedicationsFoAProfileComponent = (props: Props) => {
  const {data = [], isUse} = props;
  const _keyExtractor = useCallback(
    (item: any, index: number) => `history-${isUse}-${index}`,
    [isUse],
  );
  const _renderItem = useCallback(
    ({item}: {item: any}) => (
      <ExpandableListItem
        item={{
          title:
            item.fullName +
            ` (${
              isUse
                ? item.usingPrescriptionItems.length
                : item.usedPrescriptionItems.length
            })`,
          content: (
            <ContentContainer
              data={
                isUse ? item.usingPrescriptionItems : item.usedPrescriptionItems
              }
              isUse={isUse}
            />
          ),
        }}
      />
    ),
    [isUse],
  );
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default ListMedicationsFoAProfileComponent;
