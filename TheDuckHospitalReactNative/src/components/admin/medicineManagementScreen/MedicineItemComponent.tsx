import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import MedicineDialogComponent from './MedicineDialogComponent';
import MedicineAlertDialogComponent from './MedicineAlertDialogComponent';
import {ArchiveRestore} from 'lucide-react-native';
import {formatCurrency} from '../../../utils/currencyUtils';

const medicineUnit = [
  {
    value: 'TUBE',
    label: 'Tuýp',
  },
  {
    value: 'BOTTLE',
    label: 'Chai',
  },
  {
    value: 'BOX',
    label: 'Hộp',
  },
  {
    value: 'BAG',
    label: 'Túi',
  },
  {
    value: 'CAPSULE',
    label: 'Viên',
  },
];

interface MedicineItemComponentProps {
  medicine: any;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

function MedicineItemComponent(props: MedicineItemComponentProps) {
  const {medicine, refreshList, setRefreshList, setIsEditing} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(true);
  };

  const toggleAlert = () => {
    setShowAlertDialog(!showAlertDialog);
  };

  return (
    <ContainerComponent style={styles.medicineItemContainer}>
      <FlexComponent style={[styles.medicineInfoContainer, {flex: 0.4}]}>
        <TextComponent bold fontSize={21}>
          {medicine.medicineName}
        </TextComponent>
        <TextComponent fontSize={16}>
          {`x${medicine.quantity} ${
            medicineUnit.find(unit => unit.value === medicine.unit)?.label
          }`}
        </TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.medicineInfoContainer,
          {alignItems: 'flex-end', flex: 0.4},
        ]}>
        <TextComponent bold fontSize={18}>
          {`${formatCurrency(medicine.price)} VNĐ`}
        </TextComponent>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon
            name="dot-single"
            size={20}
            color={medicine.deleted ? appColors.darkRed : appColors.green}
          />
          <TextComponent
            bold
            fontSize={12}
            color={medicine.deleted ? appColors.darkRed : appColors.green}>
            {medicine.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.medicineInfoContainer,
          {alignItems: 'flex-end', flex: 0.2},
        ]}>
        <Pressable onPress={toggleModal}>
          {({pressed}) => (
            <MaterialIconsIcon
              name="edit"
              size={24}
              color={appColors.green}
              style={{marginBottom: 5, opacity: pressed ? 0.5 : 1}}
            />
          )}
        </Pressable>
        <Pressable onPress={toggleAlert}>
          {({pressed}) =>
            medicine.deleted ? (
              <ArchiveRestore
                size={24}
                color={appColors.green}
                style={{opacity: pressed ? 0.5 : 1}}
              />
            ) : (
              <MaterialIconsIcon
                name="delete"
                size={24}
                color={appColors.darkRed}
                style={{opacity: pressed ? 0.5 : 1}}
              />
            )
          }
        </Pressable>
      </FlexComponent>

      <MedicineDialogComponent
        edit
        setIsEditing={setIsEditing}
        medicine={medicine}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <MedicineAlertDialogComponent
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
        deleted={medicine.deleted}
        medicineId={medicine.medicineId}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  medicineItemContainer: {
    flex: 0.6,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.gray,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    shadowColor: globalStyles.shadow.shadowColor,
    shadowOffset: globalStyles.shadow.shadowOffset,
    shadowOpacity: globalStyles.shadow.shadowOpacity,
    elevation: globalStyles.shadow.elevation,
  },
  medicineInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MedicineItemComponent;
