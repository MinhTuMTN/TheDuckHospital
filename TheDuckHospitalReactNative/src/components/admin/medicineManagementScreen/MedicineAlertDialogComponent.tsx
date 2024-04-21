import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import AlertDialogComponent from '../../AlertDialogComponent';
import {
  deleteMedicine,
  restoreMedicine,
} from '../../../services/medicineServices';

interface MedicineAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  medicineId: number;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const MedicineAlertDialogComponent = (
  props: MedicineAlertDialogComponentProps,
) => {
  const {
    showAlertDialog,
    deleted,
    medicineId,
    refreshList,
    setShowAlertDialog,
    setRefreshList,
  } = props;
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = async () => {
    if (deleted) {
      setIsLoadingAPI(true);
      const response = await restoreMedicine(medicineId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
      } else {
        console.log(response);
      }
    } else {
      setIsLoadingAPI(true);
      const response = await deleteMedicine(medicineId);
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
