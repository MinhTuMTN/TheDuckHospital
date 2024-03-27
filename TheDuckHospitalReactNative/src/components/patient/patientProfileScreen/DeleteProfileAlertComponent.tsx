import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import {CircleUserRound} from 'lucide-react-native';
import {deletePatientProfile} from '../../../services/patientProfileServices';
import {useNavigation} from '@react-navigation/native';

interface DeleteProfileAlertComponentProps {
  showAlertDialog?: boolean;
  patientProfileId: string;
  setShowAlertDialog?: (showAlertDialog: boolean) => void;
}

const DeleteProfileAlertComponent = (
  props: DeleteProfileAlertComponentProps,
) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {showAlertDialog, setShowAlertDialog, patientProfileId} = props;
  const navigation = useNavigation();

  const onClose = () => {
    if (setShowAlertDialog) {
      setShowAlertDialog(false);
    }
  };

  const onAccept = async () => {
    setIsLoading(true);
    const response = await deletePatientProfile(patientProfileId);
    if (response.success) {
      if (setShowAlertDialog) {
        setShowAlertDialog(false);
      }
      navigation.navigate('ProfileScreen' as never);
    }
  };

  return (
    <AlertDialogComponent
      showAlertDialog={showAlertDialog}
      headerBackgroundColor={appColors.primary}
      headerIcon={<CircleUserRound size={24} color={appColors.white} />}
      headerLabel={'Xóa hồ sơ bệnh nhân'}
      bodyTextSize={18}
      bodyText={'Bạn có chắc chắn muốn xóa hồ sơ này?'}
      acceptButtonStyles={styles.deleteButton}
      acceptButtonText={'Xóa'}
      acceptButtonTextColor={appColors.white}
      isLoading={isLoading}
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

export default DeleteProfileAlertComponent;
