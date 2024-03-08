import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import {ArchiveRestore} from 'lucide-react-native';
import ServiceDialogComponent from './ServiceDialogComponent';
import ServiceAlertDialogComponent from './ServiceAlertDialogComponent';

function ServiceItemComponent() {
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
    <ContainerComponent style={styles.serviceItemContainer}>
      <FlexComponent style={[styles.serviceInfoContainer, {flex: 0.6}]}>
        <TextComponent bold fontSize={19}>
          Khám tai mũi họng
        </TextComponent>
        <TextComponent fontSize={16}>Dịch vụ khám</TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.serviceInfoContainer,
          {alignItems: 'flex-end', flex: 0.4},
        ]}>
        <TextComponent bold fontSize={18}>
          20.000 VNĐ
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
          styles.serviceInfoContainer,
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

      <ServiceDialogComponent
        edit
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <ServiceAlertDialogComponent
        deleted={deleted}
        setDeleted={setDeleted}
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  serviceItemContainer: {
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
  serviceInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ServiceItemComponent;
