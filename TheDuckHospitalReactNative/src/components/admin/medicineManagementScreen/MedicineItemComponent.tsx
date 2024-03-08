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

function MedicineItemComponent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleAlert = () => {
    setShowAlertDialog(!showAlertDialog);
  };

  return (
    <ContainerComponent style={styles.medicineItemContainer}>
      <FlexComponent style={[styles.medicineInfoContainer, {flex: 0.5}]}>
        <TextComponent bold fontSize={21}>
          Paracetamol
        </TextComponent>
        <TextComponent fontSize={16}>x1000 viên</TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.medicineInfoContainer,
          {alignItems: 'flex-end', flex: 0.3},
        ]}>
        <TextComponent bold fontSize={18}>
          2.000 VNĐ
        </TextComponent>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon
            name="dot-single"
            size={20}
            color={deleted ? appColors.darkRed : appColors.green}
          />
          <TextComponent
            bold
            fontSize={12}
            color={deleted ? appColors.darkRed : appColors.green}>
            {deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
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
            deleted ? (
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
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <MedicineAlertDialogComponent
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
        deleted={deleted}
        setDeleted={setDeleted}
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
