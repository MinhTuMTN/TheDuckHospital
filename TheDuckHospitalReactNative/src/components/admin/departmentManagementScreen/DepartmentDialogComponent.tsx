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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import FormControlComponent from '../../FormControlComponent';
import {
  createDepartment,
  getDoctorWithinDepartment,
  updateDepartment,
} from '../../../services/departmentServices';

// const headDoctors = [
//   {staffId: '1', fullName: 'Lâm Mộc Văn'},
//   {staffId: '2', fullName: 'Lý Đại Bàng'},
//   {staffId: '3', fullName: 'Lý Thị Định'},
//   {staffId: '4', fullName: 'Đinh Văn Hoan'},
// ];

interface DepartmentDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  refreshList: boolean;
  department?: any;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing?: (isEditing: boolean) => void;
  setModalVisible?: (modalVisible: boolean) => void;
}

const DepartmentDialogComponent = (props: DepartmentDialogComponentProps) => {
  const {
    modalVisible,
    refreshList,
    department,
    setRefreshList,
    setIsEditing,
    setModalVisible,
    edit = false,
  } = props;
  const [name, setName] = useState(edit ? department?.departmentName : '');
  const [description, setDescription] = useState(
    edit ? department?.description : '',
  );
  const [headDoctors, setHeadDoctors] = useState([]);
  const [headDoctor, setHeadDoctor] = useState(
    edit ? department?.headDoctor : {fullName: 'Chưa cập nhật', staffId: ''},
  );
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [firstClick, setFirstClick] = useState(true);

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (setIsEditing) setIsEditing(false);
      // if (!firstClick) setFirstClick(true);
      if (edit) {
        setName(department?.departmentName);
        setDescription(department?.description);
        setHeadDoctor(department?.headDoctor);
      } else {
        setName('');
        setDescription('');
        setHeadDoctor({fullName: 'Chưa cập nhật', staffId: ''});
      }
    }
  };

  const handleCreateOrUpdateDepartment = async () => {
    try {
      // if (firstClick) setFirstClick(false);
      if (error) {
        return;
      }
      
      if (!edit) {
        const data = {
          departmentName: name,
          description: description,
        };

        setIsLoading(true);
        const responseCreateDepartment = await createDepartment(data);
        setIsLoading(false);

        if (responseCreateDepartment.success) {
          setRefreshList(!refreshList);
          closeModal();
        } else {
          console.log(responseCreateDepartment);
        }
      } else {
        const data = {
          departmentName: name,
          description: description,
          staffId: headDoctor?.staffId,
        };

        setIsLoading(true);
        const responseUpdateDepartment = await updateDepartment(
          department?.departmentId,
          data,
        );
        setIsLoading(false);

        if (responseUpdateDepartment.success) {
          setRefreshList(!refreshList);
          closeModal();
        } else {
          console.log(responseUpdateDepartment);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const handleGetDoctorWithinDepartment = async () => {
      const response = await getDoctorWithinDepartment(
        department?.departmentId,
      );
      if (response.success) {
        setHeadDoctors(response.data.data);
      } else {
        console.log(response);
      }
    };
    try {
      handleGetDoctorWithinDepartment();
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
        <View style={[styles.modalView, {height: edit ? '70%' : '60%'}]}>
          <FlexComponent style={styles.modalHeader}>
            <FlexComponent style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="google-classroom"
                size={24}
                color={appColors.white}
              />
              <TextComponent style={styles.headerText}>
                {edit ? 'Chỉnh sửa khoa' : 'Thêm khoa'}
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
                label="Tên khoa*"
                labelStyle={styles.labelInput}
                size="md"
                placeholder="Tên khoa*"
                value={name}
                // enableFirstClick
                // firstClick={firstClick}
                error={name.trim() === '' || name.length <= 0}
                errorMessage="Tên khoa không được để trống"
                onChangeText={newValue => setName(newValue)}
                startIcon={
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={24}
                    color={appColors.black}
                  />
                }
                inputContainerStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.black,
                  borderRadius: 10,
                  width: '100%',
                }}
                inputContainerFocusStyle={{
                  backgroundColor: appColors.white,
                  borderColor: appColors.primary,
                  borderRadius: 10,
                  width: '100%',
                }}
              />

              <InputComponent
                label="Mô tả"
                labelStyle={styles.labelInput}
                placeholder="Mô tả"
                value={description}
                onChangeText={newValue => setDescription(newValue)}
                startIcon={
                  <MaterialIcons
                    name="description"
                    size={24}
                    color={appColors.black}
                  />
                }
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
              {edit && (
                <>
                  <TextComponent bold style={styles.labelText}>
                    Trưởng khoa*
                  </TextComponent>
                  <SelectDropdown
                    data={headDoctors}
                    onSelect={(selectedItem, index) => {
                      setHeadDoctor(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.fullName;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.fullName;
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
                          <FontistoIcon
                            name="doctor"
                            color={appColors.black}
                            size={24}
                          />
                          <Text style={styles.dropdownBtnTxt}>
                            {selectedItem
                              ? selectedItem.fullName
                              : headDoctor?.fullName}
                          </Text>
                        </View>
                      );
                    }}
                  />

                  {/* <SelectComponent
                    options={headDoctors}
                    keyTitle="fullName"
                    value={headDoctor.fullName}
                    selectInputStyle={{paddingHorizontal: 10}}
                    placeholderColor={appColors.darkGray}
                    title="Chọn trưởng khoa"
                    error={headDoctor.staffId === '' && firstClick}
                    errorMessage="Trưởng khoa không được để trống"
                    onChange={value => setHeadDoctor(value)}
                    selectTextColor={'black'}
                    placeholder="Trưởng khoa"
                    marginRight={8}
                    selectInputIcon={
                      <ChevronDownIcon color={appColors.black} size={20} />
                    }
                  /> */}
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
              enabled={!error}
              isLoading={isLoading}
              containerStyles={[styles.button, {marginRight: 15}]}
              onPress={handleCreateOrUpdateDepartment}>
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
  labelInput: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  buttonTextStyle: {
    color: appColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  labelText: {
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
});

export default DepartmentDialogComponent;
