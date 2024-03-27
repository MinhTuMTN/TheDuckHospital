import React, {useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, View} from 'react-native';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import InfoProfileItemComponent from '../../../components/patient/lookUpMedicalResults/InfoProfileItemComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const AllPatientProfilesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigation();

  const handleEnterProfileCode = () => {
    navigate.navigate('EnterProfileCode' as never);
  };
  const handleOpenPopup = () => {
    setModalVisible(true);
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
          onPress={handleOpenPopup}
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

      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => Alert.alert('Close modal')}>
        <View style={styles.containerModal}>
          <View style={styles.modalView}>
            <Pressable
              style={{
                position: 'absolute',
                right: 25,
                top: 20,
              }}
              onPress={() => setModalVisible(false)}>
              <AntDesign
                name="closecircle"
                size={24}
                color={appColors.grayLight}
              />
            </Pressable>
            <TextComponent textAlign="center" fontWeight="600" fontSize={16}>
              Thêm hồ sơ để tra cứu kết quả
              {'\n'}khám bệnh cận lâm sàng
            </TextComponent>
            <ButtonComponent
              containerStyles={styles.buttonOption}
              backgroundColor="white"
              onPress={handleEnterProfileCode}>
              <TextComponent
                fontWeight="500"
                fontSize={16}
                color={appColors.textLight}>
                Đã từng khám, nhập mã hồ sơ
              </TextComponent>
            </ButtonComponent>
            <View style={styles.buttonOption}>
              <TextComponent
                fontWeight="500"
                fontSize={16}
                color={appColors.textLight}>
                Tôi quên mã bệnh nhân của mình
              </TextComponent>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: appInfo.size.width * 0.05,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOption: {
    width: '100%',
    alignItems: 'center',
    borderColor: appColors.textLight,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
