import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {Fingerprint, Phone} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const PatientProfileItemComponent = () => {
  const navigation = useNavigation();

  const handleDetailsClick = () => {
    navigation.navigate('PatientProfileDetailScreen' as never);
  };
  return (
    <Pressable onPress={handleDetailsClick}>
      <ContainerComponent style={styles.scheduleItemContainer}>
        <FlexComponent style={[styles.scheduleInfoContainer]}>
          <TextComponent bold fontSize={21}>
            Hà Bị Bệnh
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={[styles.scheduleInfoContainer]}>
          <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
            <Phone size={18} color={appColors.black} style={{marginRight: 5}} />
            <TextComponent fontSize={16}>0123456789</TextComponent>
          </FlexComponent>
          <FlexComponent style={[styles.flexCenter, {marginBottom: 5}]}>
            <Fingerprint
              size={18}
              color={appColors.black}
              style={{marginRight: 5}}
            />
            <TextComponent fontSize={16}>123456789011</TextComponent>
          </FlexComponent>
        </FlexComponent>
      </ContainerComponent>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scheduleItemContainer: {
    flex: 1,
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
  scheduleInfoContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PatientProfileItemComponent;
