import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AlertDialogComponent from '../../AlertDialogComponent';

interface HeadDoctorAlertDialogComponentProps {
  showAlertDialog?: boolean;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const HeadDoctorAlertDialogComponent = (props: HeadDoctorAlertDialogComponentProps) => {
  const {showAlertDialog, setShowAlertDialog} = props;

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  return (
    <AlertDialogComponent
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={
        <FontistoIcon name="doctor" size={24} color={appColors.white} />
      }
      headerLabel={'Xóa chức trưởng khoa'}
      bodyTextSize={18}
      bodyText={'Bạn có chắc chắn muốn xóa chức trưởng khoa của bác sĩ này?'
      }
      acceptButtonStyles={styles.deleteButton}
      acceptButtonText={'Xóa'}
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
});

export default HeadDoctorAlertDialogComponent;
