import {ChevronRight} from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColors';
import LineInfoComponent from '../../LineInfoComponent';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FlexComponent, InputComponent, TextComponent} from '../..';
import {confirmPatientProfileViaOTP} from '../../../services/patientProfileServices';
import {addPatientProfileProps, navigationProps} from '../../../types';
import ButtonComponent from '../../ButtonComponent';

interface InfoProfileSearchComponentProps {
  info: any;
}
const InfoProfileSearchComponent = (props: InfoProfileSearchComponentProps) => {
  const {info} = props;
  const [isShow, setIsShow] = React.useState(false);

  const [confirm, setConfirm] = React.useState<addPatientProfileProps>({
    patientProfileId: info.patientProfileId,
    phoneNumber: '',
  });
  const navigation = useNavigation<navigationProps>();

  const handleShowModal = () => {
    setIsShow(true);
  };
  const handleConfirmPhoneNumber = async () => {
    const respone = await confirmPatientProfileViaOTP(confirm);

    if (respone.success) {
      navigation.navigate('AuthenticatePatientAccountViaOTPScreen', {
        patientProfileId: confirm.patientProfileId,
      });
    } else {
      console.log(respone.error);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleShowModal}>
      <LineInfoComponent
        startIcon={
          <Ionicons
            name="person-circle-outline"
            size={24}
            style={{marginRight: 5, marginLeft: -5}}
            color={appColors.grayLight}
          />
        }
        label={info.fullName}
        labelUppercase
        labelStyles={{
          fontSize: 17,
          fontWeight: '700',
          color: appColors.primaryDark,
        }}
      />
      <FlexComponent direction="row" style={{marginTop: 10}}>
        <LineInfoComponent
          startIcon={
            <Ionicons
              name="location-sharp"
              size={20}
              style={{marginRight: 8, marginLeft: -4}}
              color={appColors.grayLight}
            />
          }
          label={`${info.district.districtName} - ${info.province.provinceName}`}
          labelStyles={{
            fontSize: 16,
            fontWeight: '500',
            color: appColors.grayLight,
            letterSpacing: 0,
          }}
          containerFlex={1}
        />
      </FlexComponent>
      <FlexComponent direction="row" style={{marginTop: 10}}>
        <LineInfoComponent
          startIcon={
            <FontAwesome
              name="mobile-phone"
              size={20}
              style={{marginRight: 13, marginLeft: 2}}
              color={appColors.grayLight}
            />
          }
          label={info.phoneNumber}
          labelUppercase
          labelStyles={{
            fontSize: 16,
            fontWeight: '500',
            color: appColors.grayLight,
            letterSpacing: 1,
          }}
          containerFlex={1}
        />
      </FlexComponent>

      <View style={styles.buttonNext}>
        <ChevronRight size={55} color={appColors.primaryDark} />
      </View>

      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={isShow}>
        <View style={styles.containerModal}>
          <View style={styles.modalView}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['rgba(46, 128, 237, 1)', 'rgba(87, 204, 242, 0.87)']}
              style={styles.modalHeader}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="bell"
                  size={22}
                  color={appColors.white}
                  style={{
                    marginRight: 8,
                  }}
                />
                <TextComponent
                  color={appColors.white}
                  fontSize={18}
                  fontWeight="600">
                  Xác nhận số điện thoại
                </TextComponent>
              </View>
              <Pressable onPress={() => setIsShow(false)}>
                <AntDesign
                  name="closecircle"
                  size={22}
                  color={appColors.white}
                />
              </Pressable>
            </LinearGradient>
            <View style={styles.modalBody}>
              <TextComponent
                textAlign="justify"
                fontSize={14}
                style={{
                  lineHeight: 20,
                }}>
                Vui lòng nhập số điện thoại xác minh để xác thực hồ sơ bệnh nhân
              </TextComponent>
              <InputComponent
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={confirm.phoneNumber}
                onChangeText={text => {
                  setConfirm({...confirm, phoneNumber: text});
                }}
                inputContainerStyle={{
                  borderRadius: 10,
                }}
                inputContainerFocusStyle={{
                  borderColor: appColors.black,
                  borderRadius: 10,
                }}
                containerStyle={{
                  marginTop: 8,
                }}
                startIcon={
                  <FontAwesome5
                    name="phone-alt"
                    size={18}
                    color={appColors.black}
                  />
                }
              />
              <View style={styles.options}>
                <ButtonComponent
                  containerStyles={{
                    marginRight: 10,
                  }}
                  backgroundColor="white"
                  textColor="black"
                  textStyles={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  onPress={() => {
                    setIsShow(false);
                  }}>
                  Đóng
                </ButtonComponent>
                <ButtonComponent
                  onPress={handleConfirmPhoneNumber}
                  backgroundColor={appColors.primary}
                  containerStyles={{
                    borderRadius: 12,
                    paddingHorizontal: 20,
                  }}
                  textStyles={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Xác nhận
                </ButtonComponent>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default InfoProfileSearchComponent;
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: appColors.frameColor1,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    elevation: 7,
    marginTop: 10,
  },

  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  modalBody: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonNext: {
    position: 'absolute',
    right: 0,
    top: 25,
  },
});
