import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import DoctorAlertDialogComponent from './DoctorAlertDialogComponent';

interface DoctorItemComponentProps {
  doctor: any;
}

function DoctorItemComponent(props: DoctorItemComponentProps) {
  const {doctor} = props;
  const [showDoctorAlertDialog, setShowDoctorAlertDialog] = useState(false);

  const toggleAlert = () => {
    setShowDoctorAlertDialog(!showDoctorAlertDialog);
  };

  return (
    <ContainerComponent style={styles.doctorItemContainer}>
      <FlexComponent style={[styles.doctorInfoContainer, {flex: 0.5}]}>
        <TextComponent bold fontSize={21}>
          {doctor.fullName}
        </TextComponent>
        <TextComponent fontSize={16}>{doctor.phoneNumber}</TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.doctorInfoContainer,
          {alignItems: 'flex-end', flex: 0.3},
        ]}>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon name="dot-single" size={20} color={doctor.deleted ? appColors.darkRed : appColors.green} />
          <TextComponent bold fontSize={12} color={doctor.deleted ? appColors.darkRed : appColors.green}>
            {doctor.deleted? "Ngưng hoạt động" : "Còn hoạt động"}
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.doctorInfoContainer,
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

      <DoctorAlertDialogComponent
        setShowAlertDialog={setShowDoctorAlertDialog}
        showAlertDialog={showDoctorAlertDialog}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  doctorItemContainer: {
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
  doctorInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DoctorItemComponent;
