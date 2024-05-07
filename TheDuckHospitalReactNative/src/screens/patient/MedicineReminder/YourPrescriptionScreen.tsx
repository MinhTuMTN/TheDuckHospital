import dayjs from 'dayjs';
import {CalendarDays} from 'lucide-react-native';
import React, {useState} from 'react';
import {FlatList, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import MedicineSearchComponent from '../../../components/patient/medicineReminderScreen/MedicineSearchComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import {searchPrescription} from '../../../services/reminderServices';

const YourPrescriptionScreen = ({route}: {route: any}) => {
  const patientProfileId = route.params?.profile.patientProfileId;
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().startOf('year'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [dateEndVisible, setDateEndVisible] = useState(false);
  const [prescriptionList, setPrescriptionList] = useState([] as any[]);

  const handleSearchPrescription = async () => {
    const result = await searchPrescription(
      patientProfileId,
      startDate.format('YYYY-MM-DD'),
      endDate.format('YYYY-MM-DD'),
    );

    if (result.success) {
      setPrescriptionList(result.data.data);
      console.log(prescriptionList);
    }
  };
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
                  onPress={() => console.log('Scan QR code')}
                />
              }
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
          </View>
        </View>
      </ContainerComponent>
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
});
