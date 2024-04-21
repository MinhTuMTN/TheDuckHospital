import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import {ActivitySquare, Users} from 'lucide-react-native';
import {deleteStaff, restoreStaff} from '../../../services/staffServices';

interface StaffAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  staffId: string;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog: (showAlertDialog: boolean) => void;
}

const StaffAlertDialogComponent = (props: StaffAlertDialogComponentProps) => {
  const {
    showAlertDialog,
    deleted,
    staffId,
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
      const response = await restoreStaff(staffId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
        onClose();
      } else {
        console.log(response);
      }
    } else {
      setIsLoadingAPI(true);
      const response = await deleteStaff(staffId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
        onClose();
      } else {
        console.log(response);
      }
    }
  };

  return (
    <AlertDialogComponent
      isLoading={isLoadingAPI}
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={<Users size={24} color={appColors.white} />}
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
