import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  CalendarPlus,
  ChevronRight,
  ChevronsLeftRight,
  Pill,
} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LineInfoComponent from '../../../components/LineInfoComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import TimeReminder from '../../../components/patient/medicineReminderScreen/TimeReminder';
import {appColors} from '../../../constants/appColors';
import {useToast} from '../../../hooks/ToastProvider';
import {
  creatReminder,
  updateReminder,
} from '../../../services/medicineReminderServices';
import {deleteReminder} from '../../../services/reminderServices';
import {navigationProps} from '../../../types';
import {getMedicineUnit, howToUse} from '../../../utils/medicineUtils';

const ScheduleMedicationRemindersScreen = ({route}: {route: any}) => {
  const {isEdit, medicationInfo, patientProfileId} = route.params;
  const toast = useToast();
  const navigation = useNavigation<navigationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deleteModalComfirmVisible, setDeleteModalComfirmVisible] =
    useState(false);
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    isEdit ? dayjs(medicationInfo.medicineReminder.startDate) : dayjs(),
  );
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [amountOfMedicine, setAmountOfMedicine] = useState(
    isEdit
      ? medicationInfo.medicineReminder.amount
      : medicationInfo.prescriptionItem.quantity,
  );
  const [amountOfMedicineModalVisible, setAmountOfMedicineModalVisible] =
    useState(false);
  const [times, setTimes] = useState<any[]>([]);

  const defaultTime: {
    [key: string]: {hour: string; minute: string; quantity: number};
  } = {
    morning: {
      hour: '7',
      minute: '0',
      quantity: 1,
    },
    noon: {
      hour: '12',
      minute: '0',
      quantity: 1,
    },
    afternoon: {
      hour: '16',
      minute: '0',
      quantity: 1,
    },
    evening: {
      hour: '20',
      minute: '0',
      quantity: 1,
    },
  };

  useEffect(() => {
    const newTimes: any[] = [];
    if (!isEdit) {
      let index = 0;
      ['morning', 'noon', 'afternoon', 'evening'].forEach(time => {
        if (medicationInfo.prescriptionItem[time]) {
          newTimes.push({
            index: index++,
            hour: defaultTime[time].hour,
            minute: defaultTime[time].minute,
            quantity: medicationInfo.prescriptionItem.quantityPerTime || 1,
          });
        }
      });
    } else {
      medicationInfo.medicineReminder.indexTimes.forEach(
        (indexTime: any, index: number) => {
          const time = dayjs(`1990-01-01 ${indexTime.reminderTime}`);

          newTimes.push({
            index: indexTime.reminderIndex,
            hour: time.get('hour').toString(),
            minute: time.get('minute').toString(),
            quantity: indexTime.amount,
          });
        },
      );
    }

    setTimes(newTimes);
  }, []);

  const handleCreateReminder = async () => {
    setIsLoading(true);
    const result = await creatReminder({
      patientProfileId: patientProfileId,
      startDate: startDate.toString(),
      prescriptionItemId: medicationInfo.prescriptionItem.prescriptionItemId,
      amount: amountOfMedicine,
      details: times.map(time => ({
        hour: time.hour,
        minute: time.minute,
        amount: time.quantity,
      })),
    });
    setIsLoading(false);
    if (result) {
      toast.showToast('Tạo lịch nhắc thuốc thành công');
      navigation.navigate('MedicineReminderScreen');
    }
  };

  const handleDeleteReminder = async () => {
    setIsLoadingDelete(true);

    const result = await deleteReminder(
      medicationInfo.medicineReminder.medicineReminderId,
    );

    setIsLoadingDelete(false);
    if (result.success) {
      toast.showToast('Xóa lịch nhắc thuốc thành công');
      navigation.navigate('MedicineReminderScreen');
    }
  };

  const handleUpdateReminder = async () => {
    setIsLoading(true);

    const reminderIdToUpdate =
      medicationInfo.medicineReminder.medicineReminderId;

    const result = await updateReminder(reminderIdToUpdate, {
      patientProfileId: patientProfileId,
      startDate: startDate.toString(),
      prescriptionItemId: medicationInfo.prescriptionItem.prescriptionItemId,
      amount: amountOfMedicine,
      details: times.map(time => ({
        index: time.index,
        hour: time.hour,
        minute: time.minute,
        amount: time.quantity,
      })),
    });

    setIsLoading(false);

    if (result.success) {
      toast.showToast('Cập nhật lịch nhắc thuốc thành công');
    }
  };
  return (
    <LoadingComponent
      styles={{
        flex: 1,
      }}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Lịch nhắc thuốc"
          noBackground
          backgroundColor={appColors.darkerBlue}
          paddingStart={15}
          icon={
            isEdit ? (
              <MaterialCommunityIcons
                name="delete-forever"
                onPress={() => setDeleteModalComfirmVisible(true)}
                size={28}
                color={appColors.white}
                style={{
                  zIndex: 1,
                }}
              />
            ) : (
              ''
            )
          }
        />
        <Modal
          statusBarTranslucent
          animationType="slide"
          transparent={true}
          visible={deleteModalComfirmVisible}
          onRequestClose={() => setDeleteModalComfirmVisible(false)}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
            }}>
            <View style={styles.containerModal}>
              <View style={styles.modalView}>
                <TextComponent
                  textAlign="center"
                  fontWeight="500"
                  fontSize={18}
                  style={{
                    paddingHorizontal: 20,
                    width: '100%',
                  }}>
                  Bạn có chác chắn muốn xóa {'\n'}lịch nhắc thuốc này không?
                </TextComponent>

                <View
                  style={{
                    flexDirection: 'row-reverse',
                    width: '100%',
                    paddingHorizontal: 20,
                  }}>
                  <ButtonComponent
                    onPress={() => {
                      setDeleteModalComfirmVisible(false);
                      handleDeleteReminder();
                    }}
                    containerStyles={styles.buttonOption}
                    textStyles={{
                      color: appColors.white,
                      fontWeight: '600',
                    }}>
                    Xác nhận
                  </ButtonComponent>
                  <ButtonComponent
                    onPress={() => setDeleteModalComfirmVisible(false)}
                    containerStyles={{
                      ...styles.buttonOption,
                      backgroundColor: appColors.white,
                      borderWidth: 0,
                    }}
                    textStyles={{
                      color: appColors.darkerBlue,
                      fontWeight: '600',
                    }}>
                    Huỷ
                  </ButtonComponent>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.container}>
          <View style={styles.medicineNameLine}>
            <Image
              source={require('../../../assets/images/painkiller.png')}
              style={{width: 30, height: 30, marginRight: 8}}
            />
            <TextComponent
              fontSize={24}
              fontWeight="600"
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                flex: 1,
              }}>
              {medicationInfo.prescriptionItem.medicine.medicineName}
            </TextComponent>
          </View>
          <View style={styles.mainLayout}>
            <TextComponent style={styles.lableStyle}>
              Thời gian nhắc:
            </TextComponent>
            <View style={styles.medicationSchedule}>
              <TouchableOpacity onPress={() => setDateStartVisible(true)}>
                <LineInfoComponent
                  label="Ngày bắt đầu:"
                  value={startDate.format('DD/MM/YYYY')}
                  containerStyles={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomColor: appColors.grayLight,
                    borderBottomWidth: 1,
                  }}
                  startIcon={
                    <CalendarPlus
                      size={22}
                      color={appColors.black}
                      style={{
                        marginRight: 8,
                        marginLeft: 5,
                      }}
                    />
                  }
                  endIcon={
                    <ChevronRight
                      size={23}
                      color={appColors.black}
                      style={{
                        marginLeft: 5,
                      }}
                    />
                  }
                  flexLabel={1}
                  flexValue={1}
                  valueTextAlign="right"
                  valueStyles={{
                    fontWeight: '500',
                    color: appColors.darkerBlue,
                  }}
                  labelStyles={{
                    color: appColors.black,
                  }}
                />
                <DatePicker
                  title={'Chọn ngày bắt đầu'}
                  confirmText="Xác nhận"
                  cancelText="Hủy"
                  modal
                  mode="date"
                  open={dateStartVisible}
                  date={startDate.toDate()}
                  onConfirm={date => {
                    setStartDate(dayjs(date));
                    setDateStartVisible(false);
                  }}
                  onCancel={() => {
                    setDateStartVisible(false);
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toast.showToast('Không thể thay đổi đơn vị')}>
                <LineInfoComponent
                  label="Đơn vị:"
                  value={getMedicineUnit(
                    medicationInfo.prescriptionItem.medicine.unit,
                  )}
                  containerStyles={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomColor: appColors.grayLight,
                    borderBottomWidth: 1,
                  }}
                  startIcon={
                    <ChevronsLeftRight
                      size={22}
                      color={appColors.black}
                      style={{
                        marginRight: 8,
                        marginLeft: 5,
                      }}
                    />
                  }
                  endIcon={
                    <ChevronRight
                      size={23}
                      color={appColors.black}
                      style={{
                        marginLeft: 5,
                      }}
                    />
                  }
                  flexLabel={1}
                  flexValue={1}
                  valueTextAlign="right"
                  valueStyles={{
                    fontWeight: '500',
                    color: appColors.darkerBlue,
                  }}
                  labelStyles={{
                    color: appColors.black,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAmountOfMedicineModalVisible(true)}>
                <LineInfoComponent
                  label="Số lượng:"
                  value={
                    'Còn ' +
                    amountOfMedicine +
                    ' ' +
                    getMedicineUnit(
                      medicationInfo.prescriptionItem.medicine.unit,
                    )
                  }
                  containerStyles={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                  startIcon={
                    <Pill
                      size={22}
                      color={appColors.black}
                      style={{
                        marginRight: 8,
                        marginLeft: 5,
                      }}
                    />
                  }
                  endIcon={
                    <ChevronRight
                      size={23}
                      color={appColors.black}
                      style={{
                        marginLeft: 5,
                      }}
                    />
                  }
                  flexLabel={1}
                  flexValue={1}
                  valueTextAlign="right"
                  valueStyles={{
                    fontWeight: '500',
                    color: appColors.darkerBlue,
                  }}
                  labelStyles={{
                    color: appColors.black,
                  }}
                />
                <Modal
                  statusBarTranslucent
                  animationType="slide"
                  transparent={true}
                  visible={amountOfMedicineModalVisible}
                  onRequestClose={() => setAmountOfMedicineModalVisible(false)}>
                  <KeyboardAvoidingView
                    behavior="padding"
                    style={{
                      flex: 1,
                    }}>
                    <View style={styles.containerModal}>
                      <View style={styles.modalView}>
                        <View
                          style={{
                            paddingHorizontal: 20,
                            paddingBottom: 12,
                            borderBottomColor: appColors.grayLight,
                            borderBottomWidth: 1,
                            width: '100%',
                          }}>
                          <AntDesign
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 15,
                              zIndex: 1,
                            }}
                            onPress={() => {
                              setAmountOfMedicineModalVisible(false);
                            }}
                            name="close"
                            size={30}
                            color={appColors.grayLight}
                          />
                          <TextComponent
                            textAlign="center"
                            fontWeight="600"
                            fontSize={20}>
                            Số lượng thuốc
                          </TextComponent>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingTop: 14,
                          }}>
                          <TextComponent
                            fontWeight="500"
                            fontSize={16}
                            color={appColors.grayText}>
                            Số lượng còn lại:
                          </TextComponent>
                          <InputComponent
                            value={amountOfMedicine.toString()}
                            onChangeText={text => setAmountOfMedicine(+text)}
                            keyboardType="numeric"
                            containerStyle={{
                              width: 120,
                              marginLeft: 10,
                            }}
                            inputStyle={{
                              fontSize: 20,
                              textAlign: 'center',
                            }}
                            inputFocusStyle={{
                              borderColor: appColors.darkerBlue,
                              fontSize: 20,
                              textAlign: 'center',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            height: 60,
                          }}>
                          <ButtonComponent
                            onPress={() =>
                              setAmountOfMedicineModalVisible(false)
                            }
                            containerStyles={styles.buttonOption}
                            textStyles={{
                              color: appColors.white,
                              fontWeight: '600',
                            }}>
                            Xác nhận
                          </ButtonComponent>
                        </View>
                      </View>
                    </View>
                  </KeyboardAvoidingView>
                </Modal>
              </TouchableOpacity>
            </View>
            <TextComponent
              style={[
                styles.lableStyle,
                {
                  paddingBottom: 4,
                },
              ]}>
              Cài đặt thời gian và liều lượng sử dụng:
            </TextComponent>
            <View
              style={{
                width: '100%',
              }}>
              {times.map((time, index) => {
                return (
                  <TimeReminder
                    key={index}
                    hour={time.hour}
                    minute={time.minute}
                    quantity={time.quantity}
                    index={time.index}
                    onChange={(index, hour, minute, quantity) => {
                      const newTimes = [...times];
                      newTimes[index] = {
                        hour,
                        minute,
                        quantity,
                        index,
                      };
                      setTimes(newTimes);
                    }}
                    unit={getMedicineUnit(
                      medicationInfo.prescriptionItem.medicine.unit,
                    )}
                    howToUse={howToUse(
                      medicationInfo.prescriptionItem.medicine.unit,
                    )}
                  />
                );
              })}
            </View>
          </View>
        </View>
        {isEdit ? (
          <ButtonComponent
            isLoading={isLoading}
            onPress={handleUpdateReminder}
            containerStyles={{
              backgroundColor: appColors.darkerBlue,
              marginHorizontal: 16,
              marginBottom: 16,
              borderRadius: 10,
            }}
            textStyles={{
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: 16,
            }}>
            Cập nhật
          </ButtonComponent>
        ) : (
          <ButtonComponent
            isLoading={isLoading}
            onPress={handleCreateReminder}
            containerStyles={{
              backgroundColor: appColors.darkerBlue,
              marginHorizontal: 16,
              marginBottom: 16,
              borderRadius: 10,
            }}
            textStyles={{
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: 16,
            }}>
            Lưu
          </ButtonComponent>
        )}
      </ContainerComponent>
    </LoadingComponent>
  );
};

export default ScheduleMedicationRemindersScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  medicineNameLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomColor: appColors.grayLight,
    borderBottomWidth: 1,
  },
  lableStyle: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.7,
    color: appColors.grayText,
    paddingVertical: 16,
  },
  mainLayout: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  medicationSchedule: {
    borderColor: '#8E97A1',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingBottom: 20,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOption: {
    flex: 1,
    alignItems: 'center',
    borderColor: appColors.darkerBlue,
    backgroundColor: appColors.darkerBlue,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
