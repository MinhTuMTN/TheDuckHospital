import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import RoomDialogComponent from './RoomDialogComponent';
import RoomAlertDialogComponent from './RoomAlertDialogComponent';
import {ArchiveRestore} from 'lucide-react-native';

interface RoomItemComponentProps {
  room: any;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

function RoomItemComponent(props: RoomItemComponentProps) {
  const {room, refreshList, setRefreshList, setIsEditing} = props;
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
    <ContainerComponent style={styles.roomItemContainer}>
      <FlexComponent style={[styles.roomInfoContainer, {flex: 0.5}]}>
        <TextComponent bold fontSize={21}>
          {room.roomName}
        </TextComponent>
        <TextComponent fontSize={16}>{room.departmentName}</TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[styles.roomInfoContainer, {alignItems: 'flex-end', flex: 0.3}]}>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon
            name="dot-single"
            size={20}
            color={room.deleted ? appColors.darkRed : appColors.green}
          />
          <TextComponent
            bold
            fontSize={12}
            color={room.deleted ? appColors.darkRed : appColors.green}>
            {room.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent
        style={[styles.roomInfoContainer, {alignItems: 'flex-end', flex: 0.2}]}>
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
            room.deleted ? (
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

      <RoomDialogComponent
        edit
        room={room}
        setIsEditing={setIsEditing}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <RoomAlertDialogComponent
        deleted={room.deleted}
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
        roomId={room.roomId}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  roomItemContainer: {
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
  roomInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RoomItemComponent;
