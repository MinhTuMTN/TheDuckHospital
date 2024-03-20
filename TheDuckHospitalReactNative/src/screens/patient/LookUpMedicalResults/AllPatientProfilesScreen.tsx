import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import {styled} from 'nativewind';
import {Sheet} from 'lucide-react-native';
import InfoProfileItemComponent from '../../../components/patient/lookUpMedicalResults/InfoProfileItemComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import {appInfo} from '../../../constants/appInfo';
import {appColors} from '../../../constants/appColors';
import {useNavigation} from '@react-navigation/native';

const AllPatientProfilesScreen = () => {
  const navigate = useNavigation();

  const handleEnterProfileCode = () => {
    navigate.navigate('EnterProfileCode' as never);
  };
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Tra cứu kết quả\nkhám bệnh`}
        titleSize={20}
        paddingTop={24}
      />
      <View style={styles.container}>
        <InfoProfileItemComponent />
        <InfoProfileItemComponent />
      </View>

      <View style={styles.buttonAddProfile}>
        <ButtonComponent
          onPress={handleEnterProfileCode}
          backgroundColor={appColors.darkerBlue}
          borderRadius={15}
          containerStyles={{paddingVertical: 12}}
          textStyles={{
            textTransform: 'uppercase',
            fontWeight: '700',
            fontSize: 16,
          }}>
          Thêm hồ sơ bệnh nhân mới
        </ButtonComponent>
      </View>
    </ContainerComponent>
  );
};

export default AllPatientProfilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    rowGap: 16,
  },
  buttonAddProfile: {
    position: 'absolute',
    width: appInfo.size.width,
    bottom: 32,
    paddingHorizontal: appInfo.size.width * 0.1,
  },
});
