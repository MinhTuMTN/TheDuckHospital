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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import {ChevronDownIcon} from 'lucide-react-native';
import {createRoom, updateRoom} from '../../../services/roomServices';
import FormControlComponent from '../../FormControlComponent';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAllDepartments} from '../../../services/departmentServices';

// const departments = [
//   {departmentId: 1, departmentName: 'Tim mạch'},
//   {departmentId: 2, departmentName: 'Tai mũi họng'},
//   {departmentId: 3, departmentName: 'Nhi'},
//   {departmentId: 4, departmentName: 'Ung bướu'},
// ];

interface RoomDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  refreshList: boolean;
  room?: any;
  setRefreshList: (refreshList: boolean) => void;
  setModalVisible?: (modalVisible: boolean) => void;
  setIsEditing?: (isEditing: boolean) => void;
}

const RoomDialogComponent = (props: RoomDialogComponentProps) => {
  const {
    modalVisible,
    refreshList,
    room,
    setIsEditing,
    setRefreshList,
    setModalVisible,
    edit = false,
  } = props;
  const [name, setName] = useState(edit ? room.roomName : '');
  const [description, setDescription] = useState(edit ? room.description : '');
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(
    edit ? room.department : {departmentId: null, departmentName: ''},
  );
  const [error, setError] = React.useState(false);
  const [firstClick, setFirstClick] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (setIsEditing) setIsEditing(false);
      if (!firstClick) setFirstClick(true);
      if (edit) {
        setName(room.roomName);
        setDescription(room.description);
        setDepartment(room.department);
      } else {
        setName('');
        setDescription('');
        setDepartment({departmentId: null, departmentName: ''});
      }
    }
  };

  const handleCreateOrUpdateRoom = async () => {
    if (firstClick) setFirstClick(false);
    if (error) {
      return;
    }

    const data = {
      roomName: name,
      description: description,
      departmentId: department.departmentId,
    };

    if (!edit) {
      setIsLoading(true);
      const responseCreateRoom = await createRoom(data);
      setIsLoading(false);

      if (responseCreateRoom.success) {
        setRefreshList(!refreshList);
        closeModal();
      }
    } else {
      setIsLoading(true);
      const responseUpdateRoom = await updateRoom(room.roomId, data);
      setIsLoading(false);

      if (responseUpdateRoom.success) {
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
              <MaterialIcons
                name="meeting-room"
                size={24}
                color={appColors.white}
              />
              <TextComponent style={styles.headerText}>
                {edit ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
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
                label="Tên phòng*"
                labelStyle={styles.labelInput}
                placeholder="Tên phòng*"
                value={name}
                error={name.trim() === '' || name.length <= 0}
                errorMessage="Tên phòng không được để trống"
                onChangeText={newValue => setName(newValue)}
                startIcon={
                  <FontistoIcon name="room" size={24} color={appColors.black} />
                }
                labelContainerStyle={{marginTop: 5}}
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
                  height: '18%',
                  width: '100%',
                  marginBottom:
                    !firstClick && department.departmentId === null ? 0 : 25,
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
              {department.departmentName === '' && !firstClick && (
                <TextComponent
                  color={appColors.error}
                  fontSize={12}
                  style={[
                    {
                      paddingLeft: 5,
                      marginTop: 10,
                      marginBottom: 25,
                      width: '100%',
                    },
                  ]}>
                  Cần chọn khoa
                </TextComponent>
              )}

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
              enabled={!error && !(department.departmentName === '')}
              isLoading={isLoading}
              onPress={handleCreateOrUpdateRoom}
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
    width: '90%',
    height: '65%',
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
});

export default RoomDialogComponent;
