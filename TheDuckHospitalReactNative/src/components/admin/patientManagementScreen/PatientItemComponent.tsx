import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {globalStyles} from '../../../styles/globalStyles';
import {Cake, Fingerprint, Phone} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../../utils/dateUtils';
import {navigationProps} from '../../../types';

interface PatientItemComponentProps {
  patient: any;
}

function PatientItemComponent(props: PatientItemComponentProps) {
  const {patient} = props;
  const navigation = useNavigation<navigationProps>();

  const handleDetailsClick = () => {
    navigation.navigate('PatientDetailScreen', {patient});
  };

  return (
    <Pressable onPress={handleDetailsClick}>
      <ContainerComponent style={styles.patientItemContainer}>
        <FlexComponent style={[styles.patientInfoContainer, {flex: 0.6}]}>
          <TextComponent bold fontSize={21}>
            {patient.fullName}
          </TextComponent>
          <FlexComponent style={styles.flexCenter}>
            <EntypoIcon
              name="dot-single"
              size={20}
              color={patient.deleted ? appColors.darkRed : appColors.green}
            />
            <TextComponent
              bold
              fontSize={12}
              color={patient.deleted ? appColors.darkRed : appColors.green}>
              {patient.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
            </TextComponent>
          </FlexComponent>
        </FlexComponent>

        <FlexComponent style={[styles.patientInfoContainer, {flex: 0.4}]}>
          <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
            <Phone size={16} color={appColors.black} style={{marginRight: 5}} />
            <TextComponent fontSize={16}>{patient.phoneNumber}</TextComponent>
          </FlexComponent>
          <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
            <Fingerprint
              size={16}
              color={appColors.black}
              style={{marginRight: 5}}
            />
            <TextComponent fontSize={16}>
              {patient.identityNumber ? patient.identityNumber : 'Chưa cập nhật'}
            </TextComponent>
          </FlexComponent>
          <FlexComponent style={styles.flexCenter}>
            <Cake size={16} color={appColors.black} style={{marginRight: 5}} />
            <TextComponent fontSize={16}>
              {formatDate(patient.dateOfBirth)}
            </TextComponent>
          </FlexComponent>
        </FlexComponent>
      </ContainerComponent>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  patientItemContainer: {
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
  patientInfoContainer: {
    justifyContent: 'center',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PatientItemComponent;
