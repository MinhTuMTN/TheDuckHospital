import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  FlexComponent,
  InputComponent,
  SelectComponent,
  TextComponent,
} from '../..';
import ButtonComponent from '../../ButtonComponent';
import {appColors} from '../../../constants/appColors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  CalendarDays,
  ChevronDownIcon,
  Fingerprint,
  NotepadText,
  Phone,
  School,
  User,
  Users,
} from 'lucide-react-native';
import FormControlComponent from '../../FormControlComponent';
import {createStaff, updateStaff} from '../../../services/staffServices';
import {getAllDepartments} from '../../../services/departmentServices';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

const roles = [
  {value: 'DOCTOR', label: 'Bác sĩ'},
  {value: 'LABORATORY_TECHNICIAN', label: 'Bác sĩ xét nghiệm'},
  {value: 'NURSE', label: 'Điều dưỡng'},
  {value: 'ADMIN', label: 'Quản lý'},
];
const degrees = [{value: 'BS'}, {value: 'TS'}, {value: 'PGS'}, {value: 'GS'}];

const genders = [
  {
    genderId: 0,
    genderName: 'Nam',
  },
  {
    genderId: 1,
    genderName: 'Nữ',
  },
];

// const departments = [
//   {departmentId: 1, departmentName: 'Tim mạch'},
//   {departmentId: 2, departmentName: 'Tai mũi họng'},
//   {departmentId: 3, departmentName: 'Nhi'},
//   {departmentId: 4, departmentName: 'Ung bướu'},
// ];

interface StaffDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  refreshList: boolean;
  staff?: any;
  setRefreshList: (refreshList: boolean) => void;
  setModalVisible?: (modalVisible: boolean) => void;
  setConfirmModalVisible?: (confirmModalVisible: boolean) => void;
  setCreatedStaff?: (createdStaff: any) => void;
}

const StaffDialogComponent = (props: StaffDialogComponentProps) => {
  const {
    modalVisible,
    refreshList,
    staff,
    setRefreshList,
    setModalVisible,
    setConfirmModalVisible,
    setCreatedStaff,
    edit = false,
  } = props;
  const [name, setName] = useState(edit ? staff.fullName : '');
  const [phoneNumber, setPhoneNumber] = useState(edit ? staff.phoneNumber : '');
  const [identity, setIdentity] = useState(edit ? staff.identityNumber : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    edit ? new Date(staff.dateOfBirth) : new Date(),
  );
  const [degree, setDegree] = useState(
    edit ? degrees.find(degree => degree.value === staff.degree) : degrees[0],
  );
  const [email, setEmail] = useState(edit ? staff.email : '');
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(
    edit ? staff.department : {departmentId: null, departmentName: ''},
  );
  const [role, setRole] = useState(
    edit ? roles.find(role => role.label === staff.role) : roles[0],
  );
  const [gender, setGender] = React.useState(
    edit
      ? genders.find(gender => gender.genderId === staff.gender)
      : genders[0],
  );
  const [error, setError] = React.useState(false);
  const [firstClick, setFirstClick] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName(staff.fullName);
        setPhoneNumber(staff.phoneNumber);
        setIdentity(staff.identityNumber);
        setDateOfBirth(new Date(staff.dateOfBirth));
        setEmail(staff.email);
        setGender(genders.find(gender => gender.genderId === staff.gender));
        setDegree(
          edit
            ? degrees.find(degree => degree.value === staff.degree)
            : degrees[0],
        );
        setRole(roles.find(role => role.label === staff.role));
        setDepartment(staff.department);
      } else {
        setName('');
        setPhoneNumber('');
        setIdentity('');
        setDateOfBirth(new Date());
        setEmail('');
        setGender(genders[0]);
        setDegree(degrees[0]);
        setRole(roles[0]);
        setDepartment({departmentId: null, departmentName: ''});
      }
    }
  };

  const handleCreateOrUpdateStaff = async () => {
    if (!firstClick) setFirstClick(true);
    if (error) {
      return;
    }
    if (!edit) {
      const data = {
        fullName: name,
        phoneNumber: phoneNumber,
        identityNumber: identity,
        dateOfBirth: dayjs(staff.dateOfBirth).toISOString(),
        role: role ? role.value : roles[0].value,
        gender: gender ? gender.genderId : 0,
        email: email,
        degree: degree ? degree.value : degrees[0].value,
        departmentId: department.departmentId,
      };

      setIsLoading(true);
      const responseCreateStaff = await createStaff(data);
      setIsLoading(false);

      if (responseCreateStaff.success) {
        setRefreshList(!refreshList);
        if (setCreatedStaff) {
          setCreatedStaff({
            phoneNumber: responseCreateStaff.data.data.phoneNumber,
            email: responseCreateStaff.data.data.email,
            password: responseCreateStaff.data.data.password,
          });
        }
        closeModal();
        if (setConfirmModalVisible) {
          setConfirmModalVisible(true);
        }
      }
    } else {
      const data = {
        fullName: name,
        phoneNumber: phoneNumber,
        identityNumber: identity,
        dateOfBirth: dayjs(staff.dateOfBirth).toISOString(),
        role: role ? role.value : roles[0].value,
        gender: gender ? gender.genderId : 0,
        degree: degree ? degree.value : degrees[0].value,
        departmentId: department.departmentId,
      };

      setIsLoading(true);
      const responseUpdateStaff = await updateStaff(staff.staffId, data);
      setIsLoading(false);

      if (responseUpdateStaff.success) {
        setRefreshList(!refreshList);
        closeModal();
      }
    }
  };

  React.useEffect(() => {
    const handleGetAllDepartments = async () => {
      const response = await getAllDepartments();
      if (response.success) {
        setDepartments(response.data.data);
      } else {
        console.log(response);
      }
    };
    try {
      handleGetAllDepartments();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
            <FormControlComponent onErrors={error => setError(error)}>
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
                  width: '100%',
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 5,
                  width: '100%',
                }}
              />

              {!edit && (
                <>
                  <TextComponent bold style={styles.modalText}>
                    Chức vụ*
                  </TextComponent>
                  {/* <SelectComponent
                    options={roles}
                    keyTitle="label"
                    value={role.label}
                    selectInputStyle={{paddingHorizontal: 10}}
                    placeholderColor={appColors.darkGray}
                    title="Chọn chức vụ"
                    error={role.value === '' && firstClick}
                    errorMessage="Chức vụ không được để trống"
                    onChange={value => setRole(value)}
                    selectTextColor={'black'}
                    placeholder="Chức vụ"
                    marginRight={8}
                    selectInputIcon={
                      <ChevronDownIcon color={appColors.black} size={20} />
                    }
                  /> */}
                  <SelectDropdown
                    data={roles}
                    onSelect={(selectedItem, index) => {
                      setRole(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
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
                            {selectedItem ? selectedItem.label : role?.label}
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
                  marginBottom: 5,
                  width: '100%',
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 5,
                  width: '100%',
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
                  marginBottom: 5,
                  width: '100%',
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 5,
                  width: '100%',
                }}
              />

              {/* <InputComponent
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
                  }}
                  inputContainerFocusStyle={{
                    backgroundColor: appColors.white,
                    borderColor: appColors.primary,
                    borderRadius: 10,
                    marginBottom: 20,
                    marginRight: 25,
                  }}
                /> */}

              <InputComponent
                editabled={false}
                label="Ngày sinh *"
                labelStyle={styles.labelInput}
                size="md"
                placeholder="DD/MM/YYYY"
                value={dayjs(dateOfBirth).format('DD/MM/YYYY')}
                // inputContainerStyle={styles.inputContainer}
                // inputContainerFocusStyle={styles.inputContainer}
                inputContainerStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.black,
                  borderRadius: 10,
                  marginBottom: 5,
                  width: '100%',
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  marginBottom: 5,
                  width: '100%',
                }}
                inputStyle={{
                  paddingLeft: 10,
                }}
                inputFocusStyle={{
                  paddingLeft: 10,
                }}
                endIcon={
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <CalendarDays size={24} color={appColors.black} />
                  </Pressable>
                }
              />

              <DatePicker
                modal
                open={showDatePicker}
                mode="date"
                date={dateOfBirth}
                title={'Chọn ngày sinh'}
                maximumDate={new Date()}
                onConfirm={date => {
                  setShowDatePicker(false);
                  setDateOfBirth(date);
                }}
                onLayout={() => {}}
                onCancel={() => {
                  setShowDatePicker(false);
                }}
              />
              {/* <View style={{flex: 0.55}}>
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
                </View> */}

              <TextComponent bold style={styles.modalText}>
                Giới tính *
              </TextComponent>
              <SelectComponent
                options={genders}
                keyTitle="genderName"
                value={gender?.genderName}
                selectInputStyle={{paddingHorizontal: 10}}
                placeholderColor={appColors.darkGray}
                title="Chọn giới tính"
                error={gender?.genderId === null && firstClick}
                errorMessage="Giới tính không được để trống"
                onChange={value => setGender(value)}
                selectTextColor={'black'}
                placeholder="Giới tính"
                marginRight={8}
                marginBottom={15}
                selectInputIcon={
                  <FontAwesomeIcon
                    name="chevron-down"
                    color={appColors.black}
                    size={18}
                  />
                }
              />

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
                    marginBottom: 5,
                    width: '100%',
                  }}
                  inputContainerFocusStyle={{
                    backgroundColor: appColors.white,
                    borderColor: appColors.primary,
                    borderRadius: 10,
                    marginBottom: 5,
                    width: '100%',
                  }}
                />
              )}

              {role?.value === 'DOCTOR' && !edit && (
                <>
                  <TextComponent bold style={styles.modalText}>
                    Bằng cấp*
                  </TextComponent>
                  {/* <SelectComponent
                    options={degrees}
                    keyTitle="value"
                    value={degree.value}
                    selectInputStyle={{paddingHorizontal: 10}}
                    placeholderColor={appColors.darkGray}
                    title="Chọn bằng cấp"
                    error={degree.value === '' && firstClick}
                    errorMessage="Bằng cấp không được để trống"
                    onChange={value => setDegree(value)}
                    selectTextColor={'black'}
                    placeholder="Bằng cấp"
                    marginRight={8}
                    selectInputIcon={
                      <ChevronDownIcon color={appColors.black} size={20} />
                    }
                  /> */}

                  <SelectDropdown
                    data={degrees}
                    onSelect={(selectedItem, index) => {
                      setDegree(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.value;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.value;
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
                            {selectedItem ? selectedItem.value : degree?.value}
                          </Text>
                        </View>
                      );
                    }}
                  />

                  <TextComponent bold style={styles.modalText}>
                    Khoa*
                  </TextComponent>
                  {/* <SelectComponent
                    options={departments}
                    keyTitle="departmentName"
                    value={department.departmentName}
                    selectInputStyle={{paddingHorizontal: 10}}
                    placeholderColor={appColors.darkGray}
                    title="Chọn khoa"
                    error={department.departmentId === null && firstClick}
                    errorMessage="Khoa không được để trống"
                    onChange={value => setDepartment(value)}
                    selectTextColor={'black'}
                    placeholder="Khoa"
                    marginRight={8}
                    selectInputIcon={
                      <ChevronDownIcon color={appColors.black} size={20} />
                    }
                  /> */}
                  <SelectDropdown
                    data={departments}
                    onSelect={(selectedItem, index) => {
                      setDepartment(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.departmentName;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.departmentName;
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
                      marginBottom: 25,
                    }}
                    buttonTextStyle={{
                      textAlign: 'left',
                    }}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={styles.dropdownBtnChildStyle}>
                          <MaterialCommunityIcons
                            name="google-classroom"
                            size={24}
                            color={appColors.black}
                          />
                          <Text style={styles.dropdownBtnTxt}>
                            {selectedItem
                              ? selectedItem.departmentName
                              : department?.departmentName}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </>
              )}
            </FormControlComponent>
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
              isLoading={isLoading}
              onPress={handleCreateOrUpdateStaff}
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
    width: '100%',
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
  inputContainer: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },
});

export default StaffDialogComponent;
