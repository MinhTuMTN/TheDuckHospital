import dayjs from 'dayjs';
import {CalendarDays, Keyboard, Zap} from 'lucide-react-native';
import {default as React, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {QRScan} from '../../../assets/svgs';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import MedicineSearchComponent from '../../../components/patient/medicineReminderScreen/MedicineSearchComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import {
  searchPrescription,
  searchPrescriptionByCode,
} from '../../../services/reminderServices';
import {globalStyles} from '../../../styles/globalStyles';

const YourPrescriptionScreen = ({route}: {route: any}) => {
  const [loading, setLoading] = React.useState(false);
  const patientProfileId = route.params?.profile.patientProfileId;
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().startOf('year'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [dateEndVisible, setDateEndVisible] = useState(false);
  const [prescriptionList, setPrescriptionList] = useState([] as any[]);
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const top = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: top.value}],
    };
  });

  const handleSearchPrescription = async () => {
    setLoading(true);
    const result = await searchPrescription(
      patientProfileId,
      startDate.format('YYYY-MM-DD'),
      endDate.format('YYYY-MM-DD'),
    );
    setLoading(false);
    if (result.success) {
      setPrescriptionList(result.data.data);
    }
  };

  const handleSearchPrescriptionByPrescriptionCode = useCallback(async () => {
    console.log('prescriptionCode', prescriptionCode);

    if (prescriptionCode.length !== 12) return;

    console.log('will search');

    const result = await searchPrescriptionByCode(
      patientProfileId,
      prescriptionCode,
    );

    if (result.success) {
      setPrescriptionList(result.data.data);
    }
  }, [prescriptionCode]);

  useEffect(() => {
    handleSearchPrescriptionByPrescriptionCode();
  }, [handleSearchPrescriptionByPrescriptionCode]);
  useEffect(() => {
    top.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);
  }, []);
  return (
    <LoadingComponent
      styles={{
        flex: 1,
      }}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Chọn toa thuốc"
          noBackground
          backgroundColor={appColors.darkBlue}
        />
        <View style={styles.container}>
          <View style={styles.filterWrapper}>
            <InputComponent
              startIcon={
                <Fontisto name="search" size={20} color={appColors.grayText} />
              }
              endIcon={
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={20}
                  color={appColors.grayLight}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              }
              value={prescriptionCode}
              onChangeText={setPrescriptionCode}
              containerStyle={{
                marginBottom: 10,
                borderRadius: 12,
                backgroundColor: 'rgba(231, 231, 231, 0.36)',
              }}
              inputContainerFocusStyle={{
                borderRadius: 12,
              }}
              inputContainerStyle={{
                borderRadius: 12,
              }}
              placeholder="Tìm kiếm theo mã toa thuốc"
            />
            <TextComponent fontWeight="700" fontSize={15}>
              Chọn ngày
            </TextComponent>
            <View style={styles.filterDateWrapper}>
              <View style={styles.filterDate}>
                <TextComponent
                  fontWeight="400"
                  fontSize={14}
                  style={{
                    letterSpacing: 0.5,
                  }}>
                  Từ ngày
                </TextComponent>
                <View>
                  <Pressable
                    onPress={() => setDateStartVisible(true)}
                    style={styles.inputContainer}>
                    <CalendarDays size={22} color={appColors.darkGray} />
                    <TextComponent
                      style={{
                        letterSpacing: 1,
                      }}
                      fontWeight="400"
                      fontSize={15}
                      paddingStart={8}>
                      {startDate.format('DD/MM/YYYY')}
                    </TextComponent>
                  </Pressable>
                  <DatePicker
                    modal
                    mode="date"
                    open={dateStartVisible}
                    date={startDate.toDate()}
                    onConfirm={date => {
                      setStartDate(dayjs(date));
                      console.log('date', date);

                      setDateStartVisible(false);
                    }}
                    onCancel={() => {
                      setDateStartVisible(false);
                    }}
                  />
                </View>
              </View>
              <Fontisto
                name="arrow-swap"
                size={20}
                color={appColors.darkGray}
                style={{paddingTop: 28}}
              />
              <View style={styles.filterDate}>
                <TextComponent
                  fontWeight="400"
                  fontSize={14}
                  style={{
                    letterSpacing: 0.5,
                  }}>
                  Đến ngày
                </TextComponent>
                <View>
                  <Pressable
                    onPress={() => setDateEndVisible(true)}
                    style={styles.inputContainer}>
                    <CalendarDays size={22} color={appColors.darkGray} />
                    <TextComponent
                      style={{
                        letterSpacing: 1,
                      }}
                      fontWeight="400"
                      fontSize={15}
                      paddingStart={8}>
                      {endDate.format('DD/MM/YYYY')}
                    </TextComponent>
                  </Pressable>
                  <DatePicker
                    modal
                    mode="date"
                    open={dateEndVisible}
                    date={endDate.toDate()}
                    onConfirm={date => {
                      setEndDate(dayjs(date));
                      console.log('date', date);

                      setDateEndVisible(false);
                    }}
                    onCancel={() => {
                      setDateEndVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>

            <ButtonComponent
              isLoading={loading}
              onPress={handleSearchPrescription}
              borderRadius={15}
              fontWeight="600"
              fontSize={18}
              backgroundColor={appColors.darkBlue}
              containerStyles={{
                marginTop: 24,
              }}>
              Tìm kiếm
            </ButtonComponent>
          </View>

          <View style={styles.resultWrapper}>
            {prescriptionList.length > 0 ? (
              <>
                <TextComponent
                  style={{
                    letterSpacing: 0.5,
                  }}
                  fontSize={18}
                  fontWeight="600"
                  color={appColors.primaryDark}>
                  Danh sách toa thuốc ({prescriptionList.length}):
                </TextComponent>
                <FlatList
                  data={prescriptionList}
                  keyExtractor={item => item.prescriptionId}
                  renderItem={({item}) => (
                    <MedicineSearchComponent
                      prescriptionInfo={item}
                      patientId={patientProfileId}
                    />
                  )}
                />
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <Image
                  source={require('../../../assets/images/notFound.png')}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
                <TextComponent
                  style={{
                    letterSpacing: 0.5,
                  }}
                  fontSize={18}
                  fontWeight="600"
                  color={appColors.black}>
                  Không có dữ liệu!
                </TextComponent>
                <TextComponent
                  style={{
                    letterSpacing: 0.5,
                  }}
                  textAlign="center"
                  fontSize={14}
                  fontWeight="400"
                  color={appColors.black}>
                  Các toa thuốc sẽ dược hiển thị ở đây, bạn thử tìm kiếm lại
                  ngày khác nhé.
                </TextComponent>
              </View>
            )}
          </View>
        </View>
      </ContainerComponent>
      <Modal
        onRequestClose={() => {
          setModalVisible(false);
        }}
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View
          style={[
            globalStyles.containerModal,
            {paddingHorizontal: 0, paddingVertical: 0},
          ]}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeModalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <View style={styles.content}>
              <QRCodeScanner
                containerStyle={styles.content}
                cameraStyle={{
                  width: '100%',
                  borderRadius: 20,
                }}
                onRead={e => {
                  setPrescriptionCode(e.data);
                  setModalVisible(false);
                }}
                topContent={
                  <View style={styles.topContent}>
                    <TextComponent bold fontSize={20}>
                      Quét mã QR
                    </TextComponent>
                    <Space paddingTop={4} />
                    <TextComponent
                      fontSize={15}
                      textAlign="center"
                      fontWeight="500"
                      color={appColors.textDescription}>
                      Đưa camera vào mã QR để quét. Vui lòng giữ camera ổn định
                      để có kết quả tốt nhất
                    </TextComponent>
                    <Space paddingTop={4} />
                  </View>
                }
                bottomContent={
                  <View style={styles.bottomContent}>
                    <TextComponent
                      color={appColors.textDescription}
                      fontWeight="600">
                      Đang quét mã...
                    </TextComponent>
                    <Space paddingTop={4} />
                    <FlexComponent
                      direction="row"
                      justifyContent="center"
                      columnGap={12}>
                      <Pressable
                        onPress={() => {
                          setModalVisible(false);
                        }}>
                        <Keyboard size={28} color={appColors.textDescription} />
                      </Pressable>
                      <Pressable>
                        <Zap size={28} color={appColors.textDescription} />
                      </Pressable>
                    </FlexComponent>
                  </View>
                }
              />
              <View style={styles.scanFrame}>
                <QRScan width={200} height={200} />
                <Animated.View style={[styles.indicator, animatedStyles]} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </LoadingComponent>
  );
};

export default YourPrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  filterWrapper: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 8,
    backgroundColor: appColors.white,
    elevation: 8,
  },
  filterDateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  filterDate: {
    flexDirection: 'column',
    width: '40%',
  },

  inputContainer: {
    borderBottomColor: appColors.black,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 6,
  },

  resultWrapper: {
    flexDirection: 'column',
    marginTop: 16,
  },

  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  noteText: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
  },

  howToGetCode: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: appColors.white,
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  closeModalButton: {
    width: 60,
    height: 4,
    backgroundColor: appColors.grayLight,
    alignSelf: 'center',
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  topContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: appInfo.size.width - 16,
    marginLeft: -16,
    marginTop: -32,
  },
  bottomContent: {
    marginTop: 32,
  },
  scanFrame: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 200,
    height: 3,
    backgroundColor: appColors.primary,
    position: 'absolute',
    left: '50%',
    marginLeft: -100,
    marginTop: -1,
    top: 0,
  },
});
