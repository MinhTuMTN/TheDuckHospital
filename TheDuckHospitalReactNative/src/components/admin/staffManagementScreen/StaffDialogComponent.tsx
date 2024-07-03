import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {FlexComponent, InputComponent, TextComponent} from '../..';
import ButtonComponent from '../../ButtonComponent';
import {appColors} from '../../../constants/appColors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  AtSign,
  CalendarDays,
  Fingerprint,
  FolderHeart,
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
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const roles = [
  {value: 'DOCTOR', label: 'Bác sĩ'},
  {value: 'LABORATORY_TECHNICIAN', label: 'Bác sĩ xét nghiệm'},
  {value: 'NURSE', label: 'Điều dưỡng'},
  {value: 'CASHIER', label: 'Thu ngân'},
];

const nurseTypes = [
  {value: 'null', label: 'Không'},
  {value: 'CLINICAL_NURSE', label: 'Phòng khám'},
  {value: 'INPATIENT_NURSE', label: 'Nội trú'},
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
  setIsEditing?: (isEditing: boolean) => void;
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
    setIsEditing,
    edit = false,
  } = props;
  const [name, setName] = useState(edit ? staff.fullName : '');
  const [phoneNumber, setPhoneNumber] = useState(edit ? staff.phoneNumber : '');
  const [identity, setIdentity] = useState(edit ? staff.identityNumber : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    edit
      ? new Date(staff.dateOfBirth)
      : new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
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
  const [nurseType, setNurseType] = useState(
    edit
      ? staff?.nurseType === null
        ? nurseTypes[0]
        : nurseTypes.find(nurseType => nurseType.value === staff.nurseType)
      : nurseTypes[0],
  );
  const [gender, setGender] = React.useState(
    edit
      ? genders.find(gender => gender.genderId === staff.gender)
      : genders[0],
  );
  const [error, setError] = React.useState(false);
  const [firstClick, setFirstClick] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(
    edit
      ? {
          uri: staff?.avatar,
          name: 'avatar.jpeg',
          type: 'image/jpeg',
        }
      : {
          uri: null,
          name: null,
          type: null,
        },
  );

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (setIsEditing) setIsEditing(false);
      if (!firstClick) setFirstClick(true);
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
        setNurseType(
          staff.role === 'Nurse'
            ? staff?.nurseType === null
              ? nurseTypes[0]
              : nurseTypes.find(
                  nurseType => nurseType.value === staff.nurseType,
                )
            : undefined,
        );
        setDepartment(staff.department);
        setSelectedImage({
          uri: staff?.avatar,
          name: 'avatar.jpeg',
          type: 'image/jpeg',
        });
      } else {
        setName('');
        setPhoneNumber('');
        setIdentity('');
        setDateOfBirth(
          new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        );
        setEmail('');
        setGender(genders[0]);
        setDegree(degrees[0]);
        setRole(roles[0]);
        setNurseType(nurseTypes[0]);
        setDepartment({departmentId: null, departmentName: ''});
        setSelectedImage({
          uri: null,
          name: null,
          type: null,
        });
      }
    }
  };

  const handleCreateOrUpdateStaff = async () => {
    if (firstClick) setFirstClick(false);
    // if (error || selectedImage.uri === null) {
    //   return;
    // }
    if (!edit) {
      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('identityNumber', identity);
      formData.append('email', email);
      formData.append('dateOfBirth', dayjs(dateOfBirth).format('MM/DD/YYYY'));
      formData.append('role', role ? role.value : roles[0].value);
      formData.append('gender', gender ? gender.genderId : 0);
      formData.append('degree', degree ? degree.value : degrees[0].value);
      formData.append(
        'departmentId',
        department?.departmentId ? department?.departmentId : -1,
      );
      // formData.append('avatar', selectedImage);
      formData.append(
        'nurseType',
        nurseType?.value === 'null' ? '' : nurseType?.value,
      );
      // const data = {
      //   fullName: name,
      //   phoneNumber: phoneNumber,
      //   identityNumber: identity,
      //   dateOfBirth: dayjs(staff.dateOfBirth).toISOString(),
      //   role: role ? role.value : roles[0].value,
      //   gender: gender ? gender.genderId : 0,
      //   email: email,
      //   degree: degree ? degree.value : degrees[0].value,
      //   departmentId: department.departmentId,
      // };

      setIsLoading(true);
      const responseCreateStaff = await createStaff(formData);
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
      const formData = new FormData();

      formData.append('role', role ? role.value : roles[0].value);
      formData.append('fullName', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('identityNumber', identity);
      formData.append('dateOfBirth', dayjs(dateOfBirth).format('MM/DD/YYYY'));
      formData.append('gender', gender ? gender.genderId : 0);
      formData.append('avatar', selectedImage);
      formData.append('degree', degree ? degree.value : degrees[0].value);
      formData.append(
        'departmentId',
        department ? department.departmentId : '',
      );
      formData.append('avatar', selectedImage);
      formData.append('nurseType', nurseType?.value);
      // const data = {
      //   fullName: name,
      //   phoneNumber: phoneNumber,
      //   identityNumber: identity,
      //   dateOfBirth: dayjs(staff.dateOfBirth).toISOString(),
      //   role: role ? role.value : roles[0].value,
      //   gender: gender ? gender.genderId : 0,
      //   degree: degree ? degree.value : degrees[0].value,
      //   departmentId: department.departmentId,
      // };

      setIsLoading(true);
      const responseUpdateStaff = await updateStaff(staff.staffId, formData);
      setIsLoading(false);

      if (responseUpdateStaff.success) {
        setRefreshList(!refreshList);
        closeModal();
      }
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options as ImageLibraryOptions, handleResponse);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted) return;

      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Yêu cầu quyền truy cập camera',
          message:
            'The Duck Hospital cần quyền truy cập camera của bạn để chụp ảnh.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('Camera permission given');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    requestCameraPermission();
    launchCamera(options as ImageLibraryOptions, handleResponse);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
    } else {
      let image = response.assets?.[0];
      setSelectedImage({
        uri: image?.uri,
        name: image?.fileName,
        type: image?.type,
      });
      // console.log(selectedImage);
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
              {selectedImage && selectedImage.uri !== null && (
                <Image
                  source={{uri: selectedImage.uri}}
                  style={{flex: 1, width: 250, height: 250, borderRadius: 10}}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                  width: '100%',
                }}>
                <ButtonComponent
                  onPress={openImagePicker}
                  containerStyles={{
                    borderRadius: 15,
                    shadowColor: appColors.black,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    marginBottom: 10,
                  }}
                  textStyles={{
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Chọn ảnh đại diện
                </ButtonComponent>
                <ButtonComponent
                  onPress={openCamera}
                  containerStyles={{
                    borderRadius: 15,
                    shadowColor: appColors.black,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    marginBottom: 10,
                  }}
                  textStyles={{
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Chụp ảnh trực tiếp
                </ButtonComponent>
              </View>
              {selectedImage && selectedImage.uri === null && !firstClick && (
                <TextComponent
                  color={appColors.error}
                  fontSize={12}
                  style={[
                    {
                      paddingLeft: 5,
                      marginBottom: 15,
                    },
                  ]}>
                  Cần chọn ảnh đại diện
                </TextComponent>
              )}
              <InputComponent
                size="md"
                label="Họ tên*"
                labelStyle={styles.labelInput}
                placeholder="Họ tên*"
                value={name}
                error={name.trim() === '' || name.length <= 0}
                errorMessage="Tên nhân viên không được để trống"
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
              <TextComponent bold style={styles.modalText}>
                Chức vụ*
              </TextComponent>
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

              <InputComponent
                size="md"
                label="Số điện thoại*"
                labelStyle={styles.labelInput}
                placeholder="Số điện thoại*"
                value={phoneNumber}
                error={
                  phoneNumber.trim() === '' || phoneNumber.trim().length !== 10
                }
                maxLength={10}
                errorMessage="Số điện thoại không hợp lệ"
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
                error={
                  identity.trim().length !== 9 && identity.trim().length !== 12
                }
                errorMessage="CCCD/CMND không hợp lệ"
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

              <InputComponent
                editabled={false}
                label="Ngày sinh *"
                labelStyle={styles.labelInput}
                size="md"
                placeholder="DD/MM/YYYY"
                value={dayjs(dateOfBirth).format('DD/MM/YYYY')}
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
                maximumDate={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18),
                  )
                }
                onConfirm={date => {
                  setShowDatePicker(false);
                  setDateOfBirth(date);
                }}
                onLayout={() => {}}
                onCancel={() => {
                  setShowDatePicker(false);
                }}
              />
              <TextComponent bold style={styles.modalText}>
                Giới tính*
              </TextComponent>
              <SelectDropdown
                data={genders}
                onSelect={(selectedItem, index) => {
                  setGender(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.genderName;
                }}
                rowTextForSelection={(item, index) => {
                  return item.genderName;
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
                      <FolderHeart size={24} color={appColors.black} />
                      <Text style={styles.dropdownBtnTxt}>
                        {selectedItem
                          ? selectedItem.genderName
                          : gender?.genderName}
                      </Text>
                    </View>
                  );
                }}
              />
              {!edit && (
                <InputComponent
                  size="md"
                  label="Email*"
                  labelStyle={styles.labelInput}
                  placeholder="Email*"
                  value={email}
                  error={
                    email.trim() === '' ||
                    email.trim().length <= 0 ||
                    email.trim() === '@theduckhospital.onmicrosoft.com' ||
                    !email.trim().includes('@theduckhospital.onmicrosoft.com')
                  }
                  errorMessage="Email không hợp lệ"
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
                </>
              )}
              {role?.value === 'NURSE' && !edit && (
                <>
                  <TextComponent bold style={styles.modalText}>
                    Loại điều dưỡng*
                  </TextComponent>
                  <SelectDropdown
                    data={nurseTypes}
                    onSelect={(selectedItem, index) => {
                      setNurseType(selectedItem);
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
                          <FontistoIcon
                            name="nurse"
                            size={24}
                            color={appColors.black}
                          />
                          <Text style={styles.dropdownBtnTxt}>
                            {nurseType?.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </>
              )}
              {(role?.value === 'DOCTOR' ||
                (role?.value === 'NURSE' && nurseType?.value !== 'null')) &&
                !edit && (
                  <>
                    <TextComponent bold style={styles.modalText}>
                      Khoa*
                    </TextComponent>
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
              enabled={
                !error &&
                // !(selectedImage === undefined || selectedImage.uri === null) &&
                !(
                  (department === undefined ||
                    department?.departmentName === '') &&
                  (role?.value === 'DOCTOR' ||
                    (role?.value === 'NURSE' && nurseType?.value !== 'null'))
                )
              }
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
