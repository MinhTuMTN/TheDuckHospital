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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ButtonGroup} from '@gluestack-ui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import {
  ActivitySquare,
  ChevronDownIcon,
  CircleDollarSign,
} from 'lucide-react-native';
import FormControlComponent from '../../FormControlComponent';
import {
  createService,
  updateService,
} from '../../../services/medicalServiceServices';
import {getDepartmentWithoutService} from '../../../services/departmentServices';

const serviceTypes = [
  {value: 'MedicalExamination', label: 'Dịch vụ khám'},
  {value: 'MedicalTest', label: 'Dịch vụ xét nghiệm'},
];

// const departments = [
//   {departmentId: 1, departmentName: 'Tim mạch'},
//   {departmentId: 2, departmentName: 'Tai mũi họng'},
//   {departmentId: 3, departmentName: 'Nhi'},
//   {departmentId: 4, departmentName: 'Ung bướu'},
// ];

interface ServiceDialogComponentProps {
  modalVisible?: boolean;
  edit?: boolean;
  refreshList: boolean;
  service?: any;
  setRefreshList: (refreshList: boolean) => void;
  setModalVisible?: (modalVisible: boolean) => void;
  setIsEditing?: (isEditing: boolean) => void;
}

const ServiceDialogComponent = (props: ServiceDialogComponentProps) => {
  const {
    modalVisible,
    refreshList,
    service,
    setRefreshList,
    setModalVisible,
    setIsEditing,
    edit = false,
  } = props;
  const [name, setName] = useState(edit ? service.serviceName : '');
  const [price, setPrice] = useState(edit ? service.price + '' : '1');
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(
    edit ? service.department : {departmentName: '', departmentId: null},
  );
  const [serviceType, setServiceType] = useState(
    edit
      ? serviceTypes.find(type => type.value === service.serviceType)
      : {value: 'MedicalExamination', label: 'Dịch vụ khám'},
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
        setName(service.serviceName);
        setPrice(service.price + '');
        setDepartment(service.department);
        setServiceType(
          serviceTypes.find(type => type.value === service.serviceType),
        );
      } else {
        setName('');
        setPrice('1');
        setServiceType({value: 'MedicalExamination', label: 'Dịch vụ khám'});
        setDepartment({departmentName: '', departmentId: null});
      }
    }
  };

  const handleCreateOrUpdateService = async () => {
    if (firstClick) setFirstClick(false);
    if (error) {
      return;
    }

    if (price.trim() === '' || price.trim().length <= 0 || price.trim() === '0')
      return;

    if (
      serviceType?.value === 'MedicalExamination' &&
      department.departmentName === ''
    )
      return;

    if (serviceType?.value === 'MedicalTest' && name.trim() === '') return;

    if (!edit) {
      let medicinePrice: number = +price;

      const data = {
        serviceName: name,
        price: medicinePrice,
        serviceType: serviceType ? serviceType.value : 'MedicalExamination',
        departmentId: department.departmentId,
      };
      setIsLoading(true);
      const responseCreateService = await createService(data);
      setIsLoading(false);

      if (responseCreateService.success) {
        setRefreshList(!refreshList);
        closeModal();
      }
    } else {
      let medicinePrice: number = +price;

      const data = {
        price: medicinePrice,
      };
      setIsLoading(true);
      const responseUpdateService = await updateService(
        service.serviceId,
        data,
      );
      setIsLoading(false);

      if (responseUpdateService.success) {
        setRefreshList(!refreshList);
        closeModal();
      }
    }
  };

  React.useEffect(() => {
    const handleGetDepartmentWithoutService = async () => {
      const response = await getDepartmentWithoutService();
      if (response.success) {
        setDepartments(response.data.data);
      } else {
        console.log(response);
      }
    };
    try {
      handleGetDepartmentWithoutService();
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
        <View
          style={[
            styles.modalView,
            {
              height: edit ? '50%' : '60%',
            },
          ]}>
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
            {!edit && (
              <>
                <TextComponent bold style={styles.modalText}>
                  Loại dịch vụ*
                </TextComponent>
                <SelectDropdown
                  data={serviceTypes}
                  onSelect={(selectedItem, index) => {
                    setServiceType(selectedItem);
                    selectedItem.value === 'MedicalExamination'
                      ? setName('')
                      : setDepartment({
                          departmentName: '',
                          departmentId: null,
                        });
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
                        <MaterialCommunityIcons
                          name="format-list-bulleted-type"
                          size={24}
                          color={appColors.black}
                        />
                        <Text style={styles.dropdownBtnTxt}>
                          {selectedItem
                            ? selectedItem.label
                            : serviceType?.label}
                        </Text>
                      </View>
                    );
                  }}
                />

                {/* <SelectComponent
                options={serviceTypes}
                keyTitle="label"
                value={serviceType.label}
                selectInputStyle={{paddingHorizontal: 10}}
                placeholderColor={appColors.darkGray}
                title="Chọn loại dịch vụ"
                error={serviceType.value === '' && firstClick}
                errorMessage="Chọn loại dịch vụ không được để trống"
                onChange={value => setServiceType(value)}
                selectTextColor={'black'}
                placeholder="Loại dịch vụ"
                marginRight={8}
                selectInputIcon={
                  <ChevronDownIcon color={appColors.black} size={20} />
                }
              /> */}

                {serviceType?.value === 'MedicalExamination' ? (
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
                        marginBottom:
                          department.departmentName === '' && !firstClick
                            ? 0
                            : 15,
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
                            marginBottom: 15,
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
                  </>
                ) : (
                  <InputComponent
                    size="md"
                    label="Tên dịch vụ*"
                    labelStyle={styles.labelInput}
                    placeholder="Tên dịch vụ*"
                    value={name}
                    error={name.trim() === '' || name.trim().length <= 0}
                    errorMessage="Tên dịch vụ không được để trống"
                    onChangeText={newValue => setName(newValue)}
                    startIcon={
                      <MaterialIcons
                        name="bloodtype"
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
                )}
              </>
            )}

            <InputComponent
              size="md"
              label="Giá*"
              labelStyle={styles.labelInput}
              placeholder="Giá*"
              value={price}
              error={
                price.trim() === '' ||
                price.trim().length <= 0 ||
                price.trim() === '0'
              }
              errorMessage="Giá dịch vụ không được để trống"
              onChangeText={newValue => setPrice(newValue)}
              startIcon={<CircleDollarSign size={24} color={appColors.black} />}
              keyboardType="numeric"
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
                !(
                  name.trim() === '' &&
                  serviceType?.value !== 'MedicalExamination'
                ) &&
                !(
                  (department === undefined ||
                    department.departmentName === '') &&
                  serviceType?.value === 'MedicalExamination'
                ) &&
                !(price.trim() === '') &&
                !(price.trim() === '0')
              }
              isLoading={isLoading}
              onPress={handleCreateOrUpdateService}
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

export default ServiceDialogComponent;
