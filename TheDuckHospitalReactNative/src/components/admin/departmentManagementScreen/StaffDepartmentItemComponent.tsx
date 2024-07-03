import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import StaffItemAlertDialogComponent from './StaffItemAlertDialogComponent';

interface StaffDepartmentItemComponentProps {
  isDoctor: boolean;
  staff: any;
  departmentId: number;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
}

function StaffDepartmentItemComponent(props: StaffDepartmentItemComponentProps) {
  const {isDoctor, staff, departmentId, refreshList, setRefreshList} = props;
  const [showStaffAlertDialog, setShowStaffAlertDialog] = useState(false);

  const toggleAlert = () => {
    setShowStaffAlertDialog(!showStaffAlertDialog);
  };

  return (
    <ContainerComponent style={styles.staffItemContainer}>
      <FlexComponent style={[styles.staffInfoContainer, {flex: 0.5}]}>
        <TextComponent bold fontSize={21}>
          {staff.fullName}
        </TextComponent>
        <TextComponent fontSize={16}>{staff.phoneNumber}</TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.staffInfoContainer,
          {alignItems: 'flex-end', flex: 0.3},
        ]}>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon
            name="dot-single"
            size={20}
            color={staff.deleted ? appColors.darkRed : appColors.green}
          />
          <TextComponent
            bold
            fontSize={12}
            color={staff.deleted ? appColors.darkRed : appColors.green}>
            {staff.deleted ? 'Ngưng hoạt động' : 'Còn hoạt động'}
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.staffInfoContainer,
          {alignItems: 'flex-end', flex: 0.2},
        ]}>
        <Pressable onPress={toggleAlert}>
          {({pressed}) => (
            <MaterialIconsIcon
              name="delete"
              size={24}
              color={appColors.darkRed}
              style={{opacity: pressed ? 0.5 : 1}}
            />
          )}
        </Pressable>
      </FlexComponent>

      <StaffItemAlertDialogComponent
      isDoctor={isDoctor}
        staffId={staff.staffId}
        departmentId={departmentId}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        setShowAlertDialog={setShowStaffAlertDialog}
        showAlertDialog={showStaffAlertDialog}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  staffItemContainer: {
    flex: 0.6,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.gray,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    shadowColor: globalStyles.shadow.shadowColor,
    shadowOffset: globalStyles.shadow.shadowOffset,
    shadowOpacity: globalStyles.shadow.shadowOpacity,
    elevation: globalStyles.shadow.elevation,
  },
  staffInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StaffDepartmentItemComponent;
