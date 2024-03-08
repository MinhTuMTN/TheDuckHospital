import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {globalStyles} from '../../../styles/globalStyles';
import {Cake, Fingerprint, Phone} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

function PatientItemComponent() {
  const navigation = useNavigation();

  const handleDetailsClick = () => {
    navigation.navigate('PatientDetailScreen' as never);
  };

  return (
    <Pressable onPress={handleDetailsClick}>
    <ContainerComponent style={styles.patientItemContainer}>
      <FlexComponent style={[styles.patientInfoContainer, {flex: 0.6}]}>
        <TextComponent bold fontSize={21}>
          Trương Đại
        </TextComponent>
        <FlexComponent style={styles.flexCenter}>
          <EntypoIcon name="dot-single" size={20} color={appColors.green} />
          <TextComponent bold fontSize={12} color={appColors.green}>
            Còn hoạt động
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent style={[styles.patientInfoContainer, {flex: 0.4}]}>
        <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
          <Phone size={16} color={appColors.black} style={{marginRight: 5}} />
          <TextComponent fontSize={16}>0123456789</TextComponent>
        </FlexComponent>
        <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
          <Fingerprint
            size={16}
            color={appColors.black}
            style={{marginRight: 5}}
          />
          <TextComponent fontSize={16}>123456789011</TextComponent>
        </FlexComponent>
        <FlexComponent style={styles.flexCenter}>
          <Cake size={16} color={appColors.black} style={{marginRight: 5}} />
          <TextComponent fontSize={16}>01/01/2000</TextComponent>
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
