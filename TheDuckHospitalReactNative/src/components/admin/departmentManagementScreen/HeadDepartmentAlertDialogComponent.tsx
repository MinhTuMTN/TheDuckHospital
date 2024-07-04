import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AlertDialogComponent from '../../AlertDialogComponent';
import {
  deleteHeadDoctor,
  deleteHeadNurse,
} from '../../../services/departmentServices';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../types';
import {setRefreshList} from '../../../store/refreshListSlice';

interface HeadDepartmentAlertDialogComponentProps {
  isDoctor: boolean;
  showAlertDialog?: boolean;
  staffId: string;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
  setDepartmentDetail: (departmentDetail: any) => void;
}

const HeadDepartmentAlertDialogComponent = (
  props: HeadDepartmentAlertDialogComponentProps,
) => {
  const {
    isDoctor,
    showAlertDialog,
    staffId,
    setDepartmentDetail,
    setShowAlertDialog,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const refreshList = useSelector(
    (state: RootState) => state.refreshList.refreshList,
  );
  const dispatch = useDispatch();

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = async () => {
    setIsLoading(true);
    const response = isDoctor
      ? await deleteHeadDoctor(staffId)
      : await deleteHeadNurse(staffId);
    setIsLoading(false);

    if (response.success) {
      setDepartmentDetail((prevState: any) =>
        isDoctor
          ? {
              ...prevState,
              headDoctor: null,
              headDoctorId: null,
              headDoctorName: null,
            }
          : {
              ...prevState,
              headNurse: null,
              headNurseId: null,
              headNurseName: null,
            },
      );

      dispatch(setRefreshList(!refreshList));
      onClose();
    } else {
      console.log(response);
    }
  };

  return (
    <AlertDialogComponent
      isLoading={isLoading}
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={
        <FontistoIcon
          name={isDoctor ? 'doctor' : 'nurse'}
          size={24}
          color={appColors.white}
        />
      }
      headerLabel={'Xóa chức trưởng khoa'}
      bodyTextSize={18}
      bodyText={`Bạn có chắc chắn muốn xóa chức ${
        isDoctor ? `trưởng khoa của bác sĩ` : `trưởng điều dưỡng của điều dưỡng`
      } này?`}
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

export default HeadDepartmentAlertDialogComponent;
