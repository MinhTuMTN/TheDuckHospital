import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {FlexComponent, InputComponent, TextComponent} from '../..';
import ButtonComponent from '../../ButtonComponent';
import {appColors} from '../../../constants/appColors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  ButtonGroup,
  CircleIcon,
  HStack,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  AtSign,
  Cake,
  Fingerprint,
  NotepadText,
  Phone,
  School,
  User,
  Users,
} from 'lucide-react-native';

const roles = ['Bác sĩ', 'Xét nghiệm', 'Điều dưỡng'];
const degrees = ['BS', 'TS', 'PGS', 'GS'];

interface StaffDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
}

const StaffDialogComponent = (props: StaffDialogComponentProps) => {
  const {modalVisible, setModalVisible, edit = false} = props;
  const [name, setName] = useState(edit ? 'Tiểu Đại' : '');
  const [phoneNumber, setPhoneNumber] = useState(edit ? '0123456789' : '');
  const [identity, setIdentity] = useState(edit ? '1234567891011' : '');
  const [dateOfBirth, setDateOfBirth] = useState(edit ? '01/01/2000' : '');
  const [degree, setDegree] = useState(edit ? degrees[1] : degrees[0]);
  const [email, setEmail] = useState(
    edit ? 'dait@theduckhospital.onmicrosoft.com' : '',
  );
  const [role, setRole] = useState(edit ? roles[1] : roles[0]);
  const [gender, setGender] = React.useState('male');

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName('Tiểu Đại');
        setPhoneNumber('0123456789');
        setIdentity('1234567891011');
        setDateOfBirth('01/01/2000');
        setEmail('dait@theduckhospital.onmicrosoft.com');
        setGender('male');
        setDegree(degrees[1]);
        setRole(roles[1]);
      } else {
        setName('');
        setPhoneNumber('');
        setIdentity('');
        setDateOfBirth('');
        setEmail('');
        setGender('male');
        setDegree(degrees[0]);
        setRole(roles[0]);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlexComponent style={styles.modalHeader}>
            <FlexComponent style={{flexDirection: 'row', alignItems: 'center'}}>
              <Users size={24} color={appColors.white} />
              <TextComponent style={styles.headerText}>
                {edit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
              </TextComponent>
            </FlexComponent>
            <Pressable onPress={closeModal}>
              {({pressed}) => (
                <AntDesignIcon name="close" size={24} color={appColors.white} />
              )}
            </Pressable>
          </FlexComponent>

          <ScrollView style={styles.modalBody}>
            <InputComponent
              size="md"
              label="Họ tên*"
              labelStyle={styles.labelInput}
              placeholder="Họ tên*"
              value={name}
              onChangeText={newValue => setName(newValue)}
              startIcon={<User size={24} color={appColors.black} />}
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.black,
                borderRadius: 10,
                marginBottom: 5,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 5,
              }}
            />

            {!edit && (
              <>
                <TextComponent bold style={styles.modalText}>
                  Chức vụ*
                </TextComponent>
                <SelectDropdown
                  data={roles}
                  onSelect={(selectedItem, index) => {
                    setRole(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  renderDropdownIcon={() => (
                    <FontAwesomeIcon
                      name="chevron-down"
                      color={appColors.black}
                      size={18}
                    />
                  )}
                  buttonStyle={{
                    backgroundColor: appColors.white,
                    borderColor: appColors.black,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: 15,
                  }}
                  buttonTextStyle={{
                    textAlign: 'left',
                  }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdownBtnChildStyle}>
                        <NotepadText size={24} color={appColors.black} />
                        <Text style={styles.dropdownBtnTxt}>
                          {selectedItem ? selectedItem : role}
                        </Text>
                      </View>
                    );
                  }}
                />
              </>
            )}

            <InputComponent
              size="md"
              label="Số điện thoại*"
              labelStyle={styles.labelInput}
              placeholder="Số điện thoại*"
              value={phoneNumber}
              onChangeText={newValue => setPhoneNumber(newValue)}
              startIcon={<Phone size={24} color={appColors.black} />}
              keyboardType="numeric"
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.black,
                borderRadius: 10,
                marginBottom: 20,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 20,
              }}
            />

            <InputComponent
              size="md"
              label="CCCD/CMND*"
              labelStyle={styles.labelInput}
              placeholder="CCCD/CMND*"
              value={identity}
              onChangeText={newValue => setIdentity(newValue)}
              startIcon={<Fingerprint size={24} color={appColors.black} />}
              keyboardType="numeric"
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.black,
                borderRadius: 10,
                marginBottom: 20,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 20,
              }}
            />

            <FlexComponent style={{flexDirection: 'row'}}>
              <InputComponent
                size="md"
                label="Ngày sinh*"
                labelStyle={styles.labelInput}
                placeholder="Ngày sinh*"
                value={dateOfBirth}
                onChangeText={newValue => setDateOfBirth(newValue)}
                startIcon={<Cake size={24} color={appColors.black} />}
                inputContainerStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.black,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginRight: 20,
                  width: 160,
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginRight: 25,
                  width: 160,
                }}
              />
              <View style={{flex: 0.55}}>
                <TextComponent bold style={styles.modalText}>
                  Giới tính*
                </TextComponent>
                <RadioGroup value={gender} onChange={setGender}>
                  <HStack space="2xl">
                    <Radio value="male">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Nam</RadioLabel>
                    </Radio>
                    <Radio value="female">
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Nữ</RadioLabel>
                    </Radio>
                  </HStack>
                </RadioGroup>
              </View>
            </FlexComponent>

            {!edit && (
              <InputComponent
                size="md"
                label="Email*"
                labelStyle={styles.labelInput}
                placeholder="Email*"
                value={email}
                onChangeText={newValue => setEmail(newValue)}
                startIcon={<AtSign size={24} color={appColors.black} />}
                inputContainerStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.black,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
            )}

            {role === 'Bác sĩ' && !edit && (
              <>
                <TextComponent bold style={styles.modalText}>
                  Bằng cấp*
                </TextComponent>
                <SelectDropdown
                  data={degrees}
                  onSelect={(selectedItem, index) => {
                    setDegree(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  renderDropdownIcon={() => (
                    <FontAwesomeIcon
                      name="chevron-down"
                      color={appColors.black}
                      size={18}
                    />
                  )}
                  buttonStyle={{
                    backgroundColor: appColors.white,
                    borderColor: appColors.black,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: 15,
                  }}
                  buttonTextStyle={{
                    textAlign: 'left',
                  }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdownBtnChildStyle}>
                        <School size={24} color={appColors.black} />
                        <Text style={styles.dropdownBtnTxt}>
                          {selectedItem ? selectedItem : degree}
                        </Text>
                      </View>
                    );
                  }}
                />
              </>
            )}
          </ScrollView>
          <ButtonGroup
            space="lg"
            justifyContent="flex-end"
            style={{
              marginVertical: 15,
            }}>
            <ButtonComponent
              containerStyles={[
                styles.button,
                {backgroundColor: appColors.darkRed},
              ]}
              onPress={closeModal}>
              <TextComponent style={styles.buttonTextStyle}>Hủy</TextComponent>
            </ButtonComponent>
            <ButtonComponent
              containerStyles={[styles.button, {marginRight: 15}]}>
              <TextComponent style={styles.buttonTextStyle}>
                {edit ? 'Sửa' : 'Thêm'}
              </TextComponent>
            </ButtonComponent>
          </ButtonGroup>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '82%',
    backgroundColor: appColors.white,
    borderRadius: 10,
    borderColor: appColors.gray,
    borderWidth: 1,
  },
  button: {
    borderRadius: 15,
    flex: 0.3,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonTextStyle: {
    color: appColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  labelInput: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.primary,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: appColors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalBody: {
    margin: 20,
  },
  dropdownBtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  dropdownBtnTxt: {
    color: appColors.black,
    fontSize: 16,
    marginHorizontal: 12,
  },
});

export default StaffDialogComponent;
