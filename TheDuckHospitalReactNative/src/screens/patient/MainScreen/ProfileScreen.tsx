import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ContainerComponent,
  Header,
  PatientProfile,
  TextComponent,
} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {appColors} from '../../../constants/appColors';
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import {useAuth} from '../../../auth/AuthProvider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonComponent from '../../../components/ButtonComponent';
import {navigationProps} from '../../../types';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [patientProfiles, setPatientProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const auth = useAuth();
  const navigation = useNavigation<navigationProps>();

  const handleEndIconHeaderPress = () => {
    setModalVisible(true);
  };
  const handleAddProfileClick = () => {
    setModalVisible(false);
    if (auth.token) {
      navigation.navigate('AddProfileScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };
  const handleEnterProfileCode = () => {
    setModalVisible(false);
    navigation.navigate('EnterProfileCode');
  };

  useFocusEffect(
    React.useCallback(() => {
      const handleGetAllPatientProfile = async () => {
        setIsLoading(true);
        const response = await getAllPatientProfile();
        setIsLoading(false);
        if (response.success) {
          setPatientProfiles(response.data.data);
        } else console.log('Error: ', response.error);
      };

      if (auth.token) handleGetAllPatientProfile();
    }, [auth.token]),
  );

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('patientProfile.title')}
        titleSize={19}
        icon={
          <TouchableOpacity onPress={handleEndIconHeaderPress}>
            <Icon name="adduser" color={'white'} size={30} />
          </TouchableOpacity>
        }
      />
      <ContentComponent>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color={appColors.primary} />
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={patientProfiles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <PatientProfile profile={item} />}
          />
        )}
      </ContentComponent>

      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
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
              Thêm hồ sơ khám bệnh mới
            </TextComponent>
            <ButtonComponent
              onPress={handleAddProfileClick}
              containerStyles={styles.buttonOption}
              backgroundColor="white"
              textStyles={{
                color: appColors.textLight,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Chưa từng khám, tạo hồ sơ mới
            </ButtonComponent>
            <ButtonComponent
              containerStyles={styles.buttonOption}
              backgroundColor="white"
              textStyles={{
                color: appColors.textLight,
                fontSize: 16,
                fontWeight: '500',
              }}
              onPress={handleEnterProfileCode}>
              Đã từng khám, nhập mã hồ sơ
            </ButtonComponent>
            <ButtonComponent
              containerStyles={styles.buttonOption}
              backgroundColor="white"
              textStyles={{
                color: appColors.textLight,
                fontSize: 16,
                fontWeight: '500',
              }}
              onPress={handleEnterProfileCode}>
              Tôi quên mã bệnh nhân của mình
            </ButtonComponent>
          </View>
        </View>
      </Modal>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
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

export default ProfileScreen;
