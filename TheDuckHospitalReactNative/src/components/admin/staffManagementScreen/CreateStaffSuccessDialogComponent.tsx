import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import AlertDialogComponent from '../../AlertDialogComponent';
import {Users} from 'lucide-react-native';

interface CreateStaffSuccessDialogComponentProps {
  staff: any;
  confirmModalVisible: boolean;
  setConfirmModalVisible: (refreshList: boolean) => void;
}

const CreateStaffSuccessDialogComponent = (
  props: CreateStaffSuccessDialogComponentProps,
) => {
  const {staff, confirmModalVisible, setConfirmModalVisible} = props;

  const onClose = () => {
    setConfirmModalVisible(false);
  };

  return (
    <AlertDialogComponent
      showAlertDialog={confirmModalVisible}
      headerBackgroundColor={appColors.primary}
      headerIcon={<Users size={24} color={appColors.white} />}
      headerLabel={'Tạo nhân viên thành công'}
      bodyTextSize={18}
      bodyText={`Mật khẩu của nhân viên ${staff.email} (số điện thoại: ${staff.phoneNumber}) là ${staff.password}`}
      acceptButtonStyles={styles.restoreButton}
      acceptButtonText={'Xác nhận'}
      acceptButtonTextColor={appColors.white}
      onClose={onClose}
      onAccept={onClose}
    />
  );
};

const styles = StyleSheet.create({
  restoreButton: {
    backgroundColor: appColors.green,
    borderRadius: 10,
  },
});

export default CreateStaffSuccessDialogComponent;
