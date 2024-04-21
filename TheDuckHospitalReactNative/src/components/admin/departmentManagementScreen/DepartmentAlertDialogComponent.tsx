import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertDialogComponent from '../../AlertDialogComponent';
import {
  deleteDepartment,
  restoreDepartment,
} from '../../../services/departmentServices';

interface DepartmentAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  departmentId: number;
  refreshList: boolean;
  setShowAlertDialog: (showAlertDialog: boolean) => void;
  setRefreshList: (refreshList: boolean) => void;
}

const DepartmentAlertDialogComponent = (
  props: DepartmentAlertDialogComponentProps,
) => {
  const {
    showAlertDialog,
    deleted,
    departmentId,
    refreshList,
    setShowAlertDialog,
    setRefreshList,
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
      const response = await restoreDepartment(departmentId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
      } else {
        console.log(response);
      }
    } else {
      setIsLoadingAPI(true);
      const response = await deleteDepartment(departmentId);
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
        <Icon name="google-classroom" size={24} color={appColors.white} />
      }
      headerLabel={deleted ? 'Khôi phục khoa' : 'Khóa khoa'}
      bodyTextSize={18}
      bodyText={
        deleted
          ? 'Bạn có chắc chắn muốn khôi phục khoa này?'
          : 'Bạn có chắc chắn muốn khóa khoa này?'
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

export default DepartmentAlertDialogComponent;
