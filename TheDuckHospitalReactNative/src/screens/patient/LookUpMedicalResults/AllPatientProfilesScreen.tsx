import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import InfoProfileItemComponent from '../../../components/patient/lookUpMedicalResults/InfoProfileItemComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import LoginRequireComponent from '../../../components/LoginRequireComponent';

const AllPatientProfilesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation<navigationProps>();

  const handleEnterProfileCode = () => {
    setModalVisible(false);
    navigate.navigate('EnterProfileCode');
  };
  const handleFindProfileCodeScreen = () => {
    setModalVisible(false);
    navigate.navigate('FindProfileCodeScreen');
  };
  const handleOpenPopup = () => {
    setModalVisible(true);
  };

  // FlatList props
  const handleOnPress = useCallback((item: any) => {
    navigate.navigate('MedicalTestResultScreen', {
      profile: item,
    });
  }, []);
  const _keyExtractor = useCallback((item: any) => item.patientProfileId, []);
  const _renderItem = useCallback(
    ({item}: any) => (
      <InfoProfileItemComponent
        profile={item}
        onPress={() => handleOnPress(item)}
      />
    ),
    [],
  );
  const _footerComponent = useCallback(() => {
    if (loading) {
      return (
        <View
          style={{
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      );
    }
    return null;
  }, [loading]);

  useEffect(() => {
    const handleGetAllPatientProfile = async () => {
      setLoading(true);
      const response = await getAllPatientProfile();
      setLoading(false);
      if (response.success)
        setProfiles(response.data.data.filter((item: any) => item.patientCode));
    };
    handleGetAllPatientProfile();
  }, []);
  return (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={4}>
        <Header
          title={`Tra cứu kết quả\nkhám bệnh`}
          titleSize={20}
          paddingTop={32}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />
        <View style={styles.container}>
          <FlatList
            data={profiles}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={_footerComponent}
          />
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
                  color={appColors.primaryDark}>
                  Đã từng khám, nhập mã hồ sơ
                </TextComponent>
              </ButtonComponent>
              <ButtonComponent
                containerStyles={styles.buttonOption}
                backgroundColor="white"
                onPress={handleFindProfileCodeScreen}>
                <TextComponent
                  fontWeight="500"
                  fontSize={16}
                  color={appColors.primaryDark}>
                  Tôi quên mã bệnh nhân của mình
                </TextComponent>
              </ButtonComponent>
            </View>
          </View>
        </Modal>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

export default AllPatientProfilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    borderColor: appColors.primaryDark,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
