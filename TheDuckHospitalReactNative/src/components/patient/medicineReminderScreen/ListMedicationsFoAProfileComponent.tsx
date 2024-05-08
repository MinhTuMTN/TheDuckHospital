import {View, Text, FlatList, Image} from 'react-native';
import React, {useCallback} from 'react';
import ExpandableListItem from '../../ExpandableListItem';
import MedicineInfoInMyMedicineBoxComponent from './MedicineInfoInMyMedicineBoxComponent';
import {globalStyles} from '../../../styles/globalStyles';
import Space from '../../Space';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';

interface Props {
  data: any;
  isUse: boolean;
}

const ContentContainer = (props: {
  data: any;
  isUse: boolean;
  patientProfileId: string;
}) => {
  const {data, isUse, patientProfileId} = props;
  return (
    <View>
      {data.map((item: any, index: number) => (
        <MedicineInfoInMyMedicineBoxComponent
          patientProfileId={patientProfileId}
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
              patientProfileId={item.patientProfileId}
              isUse={isUse}
            />
          ),
        }}
      />
    ),
    [isUse],
  );
  return (
    <View
      style={{
        flex: 1,
      }}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      ) : (
        <View style={globalStyles.center}>
          <Image
            source={require('../../../assets/images/notFound.png')}
            style={{width: 250, height: 250}}
          />
          <TextComponent fontSize={16} fontWeight="600">
            Không có dữ liệu để hiển thị
          </TextComponent>
        </View>
      )}
    </View>
  );
};

export default ListMedicationsFoAProfileComponent;
