import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import {ActivitySquare} from 'lucide-react-native';
import {
  deleteService,
  restoreService,
} from '../../../services/medicalServiceServices';

interface ServiceAlertDialogComponentProps {
  showAlertDialog?: boolean;
  deleted?: boolean;
  serviceId: number;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const ServiceAlertDialogComponent = (
  props: ServiceAlertDialogComponentProps,
) => {
  const {
    showAlertDialog,
    deleted,
    serviceId,
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
      const response = await restoreService(serviceId);
      setIsLoadingAPI(false);
      if (response.success) {
        setRefreshList(!refreshList);
      } else {
        console.log(response);
      }
    } else {
      setIsLoadingAPI(true);
      const response = await deleteService(serviceId);
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
      headerIcon={<ActivitySquare size={24} color={appColors.white} />}
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
