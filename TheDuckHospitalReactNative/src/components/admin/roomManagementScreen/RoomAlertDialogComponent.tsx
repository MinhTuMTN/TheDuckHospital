import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertDialogComponent from '../../AlertDialogComponent';
import {deleteRoom, restoreRoom} from '../../../services/roomServices';

interface RoomAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  roomId: number;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const RoomAlertDialogComponent = (props: RoomAlertDialogComponentProps) => {
  const {
    showAlertDialog,
    deleted,
    roomId,
    refreshList,
    setRefreshList,
    setShowAlertDialog,
  } = props;
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(false);

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = async () => {
    if (deleted) {
      setIsLoadingAPI(true);
      const response = await restoreRoom(roomId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
      } else {
        console.log(response);
      }
    } else {
      setIsLoadingAPI(true);
      const response = await deleteRoom(roomId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
      } else {
        console.log(response);
      }
    }
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  return (
    <AlertDialogComponent
      isLoading={isLoadingAPI}
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={
        <Icon name="meeting-room" size={24} color={appColors.white} />
      }
      headerLabel={deleted ? 'Khôi phục phòng' : 'Khóa phòng'}
      bodyTextSize={18}
      bodyText={
        deleted
          ? 'Bạn có chắc chắn muốn khôi phục phòng này?'
          : 'Bạn có chắc chắn muốn khóa phòng này?'
      }
      acceptButtonStyles={deleted ? styles.restoreButton : styles.deleteButton}
      acceptButtonText={deleted ? 'Khôi phục' : 'Khóa'}
      acceptButtonTextColor={appColors.white}
      onClose={onClose}
      onAccept={onAccept}
    />
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: appColors.darkRed,
    borderRadius: 10,
  },
  restoreButton: {
    backgroundColor: appColors.green,
    borderRadius: 10,
  },
});

export default RoomAlertDialogComponent;
