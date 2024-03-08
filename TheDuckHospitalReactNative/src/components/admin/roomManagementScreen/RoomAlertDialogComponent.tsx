import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertDialogComponent from '../../AlertDialogComponent';

interface RoomAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  setDeleted?: (deleted: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const RoomAlertDialogComponent = (props: RoomAlertDialogComponentProps) => {
  const {showAlertDialog, deleted, setDeleted, setShowAlertDialog} = props;

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = () => {
    if (setDeleted) {
      setDeleted(!deleted);
    }
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  return (
    <AlertDialogComponent
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
