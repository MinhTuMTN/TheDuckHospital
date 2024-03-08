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
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {ActivitySquare, CircleDollarSign} from 'lucide-react-native';

const serviceTypes = ['Dịch vụ khám', 'Dịch vụ xét nghiệm'];
const departments = ['Tim mạch', 'Tai mũi họng', 'Nhi', 'Ung bướu'];

interface ServiceDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
}

const ServiceDialogComponent = (props: ServiceDialogComponentProps) => {
  const {modalVisible, setModalVisible, edit = false} = props;
  const [name, setName] = useState(edit ? 'Xét nghiệm máu' : '');
  const [price, setPrice] = useState(edit ? '20000' : '');
  const [department, setDepartment] = useState(
    edit ? departments[1] : departments[0],
  );
  const [serviceType, setServiceType] = useState(serviceTypes[0]);

  const closeModal = () => {
    if (setModalVisible) {
      setModalVisible(false);
      if (edit) {
        setName('Xét nghiệm máu');
        setPrice('20000');
        setDepartment(departments[1]);
        setServiceType(serviceTypes[0]);
      } else {
        setName('');
        setPrice('');
        setServiceType(serviceTypes[0]);
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
              <ActivitySquare size={24} color={appColors.white} />
              <TextComponent style={styles.headerText}>
                {edit ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}
              </TextComponent>
            </FlexComponent>
            <Pressable onPress={closeModal}>
              {({pressed}) => (
                <AntDesignIcon name="close" size={24} color={appColors.white} />
              )}
            </Pressable>
          </FlexComponent>

          <ScrollView style={styles.modalBody}>
            <TextComponent bold style={styles.modalText}>
              Loại dịch vụ*
            </TextComponent>
            <SelectDropdown
              data={serviceTypes}
              onSelect={(selectedItem, index) => {
                setServiceType(selectedItem);
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
                    <MaterialCommunityIcons
                      name="format-list-bulleted-type"
                      size={24}
                      color={appColors.black}
                    />
                    <Text style={styles.dropdownBtnTxt}>
                      {selectedItem ? selectedItem : serviceType}
                    </Text>
                  </View>
                );
              }}
            />

            {serviceType === 'Dịch vụ khám' ? (
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
              </>
            ) : (
              <InputComponent
                size="md"
                label="Tên dịch vụ*"
                labelStyle={styles.labelInput}
                placeholder="Tên dịch vụ*"
                value={name}
                onChangeText={newValue => setName(newValue)}
                startIcon={
                  <MaterialIcons name="bloodtype" size={24} color={appColors.black} />
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
            )}

            <InputComponent
              size="md"
              label="Giá*"
              labelStyle={styles.labelInput}
              placeholder="Giá*"
              value={price}
              onChangeText={newValue => setPrice(newValue)}
              startIcon={
                <CircleDollarSign
                  size={24}
                  color={appColors.black}
                />
              }
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
    height: '60%',
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

export default ServiceDialogComponent;
