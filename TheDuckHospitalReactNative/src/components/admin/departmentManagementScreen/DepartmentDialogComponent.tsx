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

const headDoctors = [
  'Lâm Mộc Văn',
  'Lý Đại Bàng',
  'Lý Thị Định',
  'Đinh Văn Hoan',
];

interface DepartmentDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
}

const DepartmentDialogComponent = (props: DepartmentDialogComponentProps) => {
  const {modalVisible, setModalVisible, edit = false} = props;
  const [name, setName] = useState(edit ? 'Tai mũi họng' : '');
  const [description, setDescription] = useState(
    edit ? 'Khoa tai mũi họng' : '',
  );
  const [headDoctor, setHeadDoctor] = useState(
    edit ? headDoctors[1] : headDoctors[0],
  );

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName('Tai mũi họng');
        setDescription('Khoa tai mũi họng');
        setHeadDoctor(headDoctors[1]);
      } else {
        setName('');
        setDescription('');
        setHeadDoctor(headDoctors[0]);
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
        <View style={[styles.modalView, {height: edit ? '65%' : '50%'}]}>
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
            <InputComponent
              label="Tên khoa*"
              labelStyle={styles.labelInput}
              size="md"
              placeholder="Tên khoa*"
              value={name}
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
                marginBottom: 5,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 5,
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
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 5,
              }}
            />

            {edit && (
              <View style={{height: '10%'}}>
                <TextComponent bold style={styles.labelText}>
                  Trưởng khoa*
                </TextComponent>
                <SelectDropdown
                  data={headDoctors}
                  onSelect={(selectedItem, index) => {
                    setHeadDoctor(selectedItem);
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
                          {selectedItem ? selectedItem : headDoctor}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
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

export default DepartmentDialogComponent;
