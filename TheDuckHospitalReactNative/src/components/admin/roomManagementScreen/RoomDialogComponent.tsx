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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';

const departments = ['Tim mạch', 'Tai mũi họng', 'Nhi', 'Ung bướu'];

interface RoomDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
}

const RoomDialogComponent = (props: RoomDialogComponentProps) => {
  const {modalVisible, setModalVisible, edit = false} = props;
  const [name, setName] = useState(edit ? 'A302' : '');
  const [description, setDescription] = useState(edit ? 'Khu A lầu 3' : '');
  const [department, setDepartment] = useState(
    edit ? departments[1] : departments[0],
  );

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName('A302');
        setDescription('Khu A lầu 3');
        setDepartment(departments[1]);
      } else {
        setName('');
        setDescription('');
        setDepartment(departments[0]);
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
              <MaterialIcons name="meeting-room" size={24} color={appColors.white} />
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
            <InputComponent
              size="md"
              label="Tên phòng*"
              labelStyle={styles.labelInput}
              placeholder="Tên phòng*"
              value={name}
              onChangeText={newValue => setName(newValue)}
              startIcon={
                <FontistoIcon name="room" size={24} color={appColors.black} />
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
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 5,
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
                height: '18%',
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
                      {selectedItem ? selectedItem : department}
                    </Text>
                  </View>
                );
              }}
            />
          </ScrollView>
          <ButtonGroup
            space="lg"
            justifyContent="flex-end"
            style={{
              marginVertical: 15,
            }}>
            <ButtonComponent
              containerStyles={[styles.button, {backgroundColor: appColors.darkRed}]}
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
    height: '55%',
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

export default RoomDialogComponent;
