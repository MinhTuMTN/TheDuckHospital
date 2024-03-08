import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import { ActivitySquare } from 'lucide-react-native';

interface ServiceAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  setDeleted?: (deleted: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const ServiceAlertDialogComponent = (props: ServiceAlertDialogComponentProps) => {
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
        <ActivitySquare size={24} color={appColors.white} />
      }
      headerLabel={deleted ? 'Khôi phục dịch vụ' : 'Khóa dịch vụ'}
      bodyTextSize={18}
      bodyText={
        deleted
          ? 'Bạn có chắc chắn muốn khôi phục dịch vụ này?'
          : 'Bạn có chắc chắn muốn khóa dịch vụ này?'
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

export default ServiceAlertDialogComponent;
