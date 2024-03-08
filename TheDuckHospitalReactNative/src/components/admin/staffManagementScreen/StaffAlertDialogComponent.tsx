import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import { ActivitySquare, Users } from 'lucide-react-native';

interface StaffAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  setDeleted?: (deleted: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const StaffAlertDialogComponent = (props: StaffAlertDialogComponentProps) => {
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
        <Users size={24} color={appColors.white} />
      }
      headerLabel={deleted ? 'Khôi phục nhân viên' : 'Khóa nhân viên'}
      bodyTextSize={18}
      bodyText={
        deleted
          ? 'Bạn có chắc chắn muốn khôi phục nhân viên này?'
          : 'Bạn có chắc chắn muốn khóa nhân viên này?'
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

export default StaffAlertDialogComponent;
