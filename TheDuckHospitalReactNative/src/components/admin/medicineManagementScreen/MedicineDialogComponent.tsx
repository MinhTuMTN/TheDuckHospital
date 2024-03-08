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
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';

const units = ['Viên', 'Vỉ', 'Chai', 'Hộp'];

interface MedicineDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
}

const MedicineDialogComponent = (props: MedicineDialogComponentProps) => {
  const {modalVisible, setModalVisible, edit = false} = props;
  const [name, setName] = useState(edit ? 'Paracetamol' : '');
  const [quanity, setQuantity] = useState(edit ? '1000' : '0');
  const [unit, setUnit] = useState(edit ? units[1] : units[0]);
  const [price, setPrice] = useState(edit ? '2000' : '0');

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName('Paracetamol');
        setQuantity('1000');
        setUnit(units[1]);
        setPrice('2000');
      } else {
        setName('');
        setQuantity('0');
        setUnit(units[0]);
        setPrice('0');
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
              <AntDesignIcon
                name="medicinebox"
                size={24}
                color={appColors.white}
              />
              <TextComponent style={styles.headerText}>
                {edit ? 'Chỉnh sửa thuốc' : 'Thêm thuốc'}
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
              label="Tên thuốc*"
              labelStyle={styles.labelInput}
              placeholder="Tên thuốc*"
              value={name}
              onChangeText={newValue => setName(newValue)}
              startIcon={
                <MaterialCommunityIcons
                  name="pill"
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
              size="md"
              label="Số lượng*"
              labelStyle={styles.labelInput}
              placeholder="Số lượng*"
              value={quanity}
              onChangeText={newValue => setQuantity(newValue)}
              startIcon={
                <OcticonsIcon name="number" size={24} color={appColors.black} />
              }
              keyboardType="numeric"
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
              Đơn vị*
            </TextComponent>
            <SelectDropdown
              data={units}
              onSelect={(selectedItem, index) => {
                setUnit(selectedItem);
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
                height: '14%',
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
                      name="pills"
                      color={appColors.black}
                      size={24}
                    />
                    <Text style={styles.dropdownBtnTxt}>
                      {selectedItem ? selectedItem : unit}
                    </Text>
                  </View>
                );
              }}
            />

            <InputComponent
              size="md"
              label="Giá*"
              labelStyle={styles.labelInput}
              placeholder="Giá*"
              value={price}
              onChangeText={newValue => setPrice(newValue)}
              startIcon={
                <FoundationIcon
                  name="dollar-bill"
                  size={24}
                  color={appColors.black}
                />
              }
              keyboardType="numeric"
              inputContainerStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.black,
                borderRadius: 10,
                marginBottom: 15,
              }}
              inputContainerFocusStyle={{
                backgroundColor: appColors.white,
                borderColor: appColors.primary,
                borderRadius: 10,
                marginBottom: 15,
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
  labelInput: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '70%',
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

export default MedicineDialogComponent;
