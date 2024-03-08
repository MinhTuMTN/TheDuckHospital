import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import AlertDialogComponent from '../../AlertDialogComponent';

interface MedicineAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
  setDeleted?: (deleted: boolean) => void;
}

const MedicineAlertDialogComponent = (props: MedicineAlertDialogComponentProps) => {
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
      headerIcon={<Icon name="medicinebox" size={24} color={appColors.white} />}
      headerLabel={deleted ? 'Khôi phục thuốc' : 'Khóa thuốc'}
      bodyTextSize={18}
      bodyText={
        deleted
          ? 'Bạn có chắc chắn muốn khôi phục thuốc này?'
          : 'Bạn có chắc chắn muốn khóa thuốc này?'
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

export default MedicineAlertDialogComponent;
