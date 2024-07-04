import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {FlexComponent, TextComponent} from '../..';
import ButtonComponent from '../../ButtonComponent';
import {appColors} from '../../../constants/appColors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  addDoctorToDepartment,
  addNurseToDepartment,
  getDoctorWithoutDepartment,
  getNurseWithoutDepartment,
} from '../../../services/departmentServices';

interface AddStaffDialogComponentProps {
  isDoctor: boolean;
  departmentId: number;
  modalVisible?: boolean;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setModalVisible?: (modalVisible: boolean) => void;
}

const AddStaffDialogComponent = (props: AddStaffDialogComponentProps) => {
  const {
    isDoctor,
    departmentId,
    refreshList,
    modalVisible,
    setRefreshList,
    setModalVisible,
  } = props;
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState({
    staffId: '',
    fullName: isDoctor ? 'Chọn bác sĩ' : 'Chọn điều dưỡng',
  });
  const [isFirstClick, setIsFirstClick] = useState(true);

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      setIsFirstClick(true);
      setStaff({
        staffId: '',
        fullName: isDoctor ? 'Chọn bác sĩ' : 'Chọn điều dưỡng',
      });
    }
  };

  const handleAddStaffToDepartment = async () => {
    if (isFirstClick) setIsFirstClick(false);
    if (staff === null || staff.staffId === '') return;
    setLoading(true);
    const response = isDoctor
      ? await addDoctorToDepartment(departmentId, staff.staffId)
      : await addNurseToDepartment(departmentId, staff.staffId);
    setLoading(false);
    if (response.success) {
      setStaffs(response.data.data);
      setRefreshList(!refreshList);
      closeModal();
    } else {
      console.log(response);
    }
  };

  React.useEffect(() => {
    const handleGetStaffWithoutDepartment = async () => {
      const response = isDoctor
        ? await getDoctorWithoutDepartment(departmentId)
        : await getNurseWithoutDepartment(departmentId);
      if (response.success) {
        setStaffs(response.data.data);
      } else {
        console.log(response);
      }
    };
    try {
      handleGetStaffWithoutDepartment();
    } catch (error) {
      console.log(error);
    }
  }, [refreshList]);

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
              <FontistoIcon
                name={isDoctor ? 'doctor' : 'nurse'}
                size={24}
                color={appColors.white}
              />
              <TextComponent style={styles.headerText}>
                {isDoctor ? `Thêm bác sĩ vào khoa` : `Thêm điều dưỡng vào khoa`}
              </TextComponent>
            </FlexComponent>
            <Pressable onPress={closeModal}>
              {({pressed}) => (
                <AntDesignIcon name="close" size={24} color={appColors.white} />
              )}
            </Pressable>
          </FlexComponent>

          <ScrollView style={styles.modalBody}>
            <TextComponent bold style={styles.labelText}>
              {isDoctor ? `Bác sĩ*` : `Điều dưỡng*`}
            </TextComponent>
            <SelectDropdown
              data={staffs}
              onSelect={(selectedItem, index) => {
                setStaff(selectedItem);
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
              }}
              buttonTextStyle={{
                textAlign: 'left',
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdownBtnChildStyle}>
                    <FontistoIcon
                      name={isDoctor ? 'doctor' : 'nurse'}
                      color={appColors.black}
                      size={24}
                    />
                    <Text style={styles.dropdownBtnTxt}>
                      {selectedItem ? selectedItem.fullName : staff.fullName}
                    </Text>
                  </View>
                );
              }}
            />
            {staff && staff.staffId === '' && !isFirstClick && (
              <TextComponent
                color={appColors.error}
                fontSize={12}
                style={[
                  {
                    paddingLeft: 5,
                    marginTop: 10,
                  },
                ]}>
                {isDoctor ? `Cần chọn bác sĩ` : `Cần chọn điều dưỡng`}
              </TextComponent>
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
              enabled={!(staff?.staffId === '')}
              isLoading={loading}
              onPress={handleAddStaffToDepartment}
              containerStyles={[styles.button, {marginRight: 15}]}>
              <TextComponent style={styles.buttonTextStyle}>Thêm</TextComponent>
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

export default AddStaffDialogComponent;
