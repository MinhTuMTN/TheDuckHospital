import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AlertDialogComponent from '../../AlertDialogComponent';
import {deleteDoctorInDepartment} from '../../../services/departmentServices';

interface DoctorAlertDialogComponentProps {
  showAlertDialog?: boolean;
  departmentId: number;
  refreshList: boolean;
  staffId: string;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const DoctorAlertDialogComponent = (props: DoctorAlertDialogComponentProps) => {
  const {
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
    const response = await deleteDoctorInDepartment(departmentId, staffId);
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
        <FontistoIcon name="doctor" size={24} color={appColors.white} />
      }
      headerLabel={'Xóa bác sĩ khỏi khoa'}
      bodyTextSize={18}
      bodyText={'Bạn có chắc chắn muốn xóa bác sĩ này khỏi khoa?'}
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

export default DoctorAlertDialogComponent;
