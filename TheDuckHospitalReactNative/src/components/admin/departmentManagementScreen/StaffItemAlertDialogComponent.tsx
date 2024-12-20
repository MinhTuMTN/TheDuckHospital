import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AlertDialogComponent from '../../AlertDialogComponent';
import {
  deleteDoctorInDepartment,
  deleteNurseInDepartment,
} from '../../../services/departmentServices';

interface StaffItemAlertDialogComponentProps {
  isDoctor: boolean;
  showAlertDialog?: boolean;
  departmentId: number;
  refreshList: boolean;
  staffId: string;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const StaffItemAlertDialogComponent = (
  props: StaffItemAlertDialogComponentProps,
) => {
  const {
    isDoctor,
    showAlertDialog,
    departmentId,
    staffId,
    refreshList,
    setRefreshList,
    setShowAlertDialog,
  } = props;
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = async () => {
    setLoading(true);
    const response = isDoctor
      ? await deleteDoctorInDepartment(departmentId, staffId)
      : await deleteNurseInDepartment(departmentId, staffId);
    setLoading(false);

    if (response.success) {
      setRefreshList(!refreshList);
      onClose();
    } else {
      console.log(response);
    }
  };

  return (
    <AlertDialogComponent
      isLoading={loading}
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={
        <FontistoIcon
          name={isDoctor ? 'doctor' : 'nurse'}
          size={24}
          color={appColors.white}
        />
      }
      headerLabel={`Xóa ${isDoctor ? `bác sĩ` : `điều dưỡng`} khỏi khoa`}
      bodyTextSize={18}
      bodyText={`Bạn có chắc chắn muốn xóa ${
        isDoctor ? `bác sĩ` : `điều dưỡng`
      } này khỏi khoa?`}
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

export default StaffItemAlertDialogComponent;
