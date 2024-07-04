import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ScrollView} from '@gluestack-ui/themed';
import {CalendarDays, LineChartIcon, NotepadText} from 'lucide-react-native';
import {LineChart} from 'react-native-chart-kit';
import {appInfo} from '../../../constants/appInfo';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import {
  getAllStatisticsByDepartment,
  getBookingStatisticsByDepartment,
  getRevenueStatisticsByDepartment,
} from '../../../services/statisticsServices';
import StatisticsItemComponent from '../../../components/admin/statisticsScreen/StatisticsItemComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {getAllActiveDepartments} from '../../../services/departmentServices';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '@gluestack-ui/themed';
import DepartmentStatisticsItemComponent from '../../../components/admin/statisticsScreen/DepartmentStatisticsItemComponent';
import DoctorStatisticsItemComponent from '../../../components/admin/statisticsScreen/DoctorStatisticsItemComponent';

function StatisticsByDepartmentScreen() {
  const [showDatePicker1, setShowDatePicker1] = React.useState(false);
  const [showDatePicker2, setShowDatePicker2] = React.useState(false);
  const [showDatePicker3, setShowDatePicker3] = React.useState(false);
  const [showDatePicker4, setShowDatePicker4] = React.useState(false);
  const [startDate1, setStartDate1] = React.useState(
    new Date(new Date().setDate(new Date().getDate() - 30)),
  );
  const [endDate1, setEndDate1] = React.useState(new Date());
  const [startDate2, setStartDate2] = React.useState(
    new Date(new Date().setDate(new Date().getDate() - 30)),
  );
  const [endDate2, setEndDate2] = React.useState(new Date());
  const [statistics, setStatistics] = React.useState<any>({});
  const [revenueStatistics, setRevenueStatistics] = React.useState<any>({});
  const [bookingStatistics, setBookingStatistics] = React.useState<any>({});
  const [activeDepartments, setActiveDepartments] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState<any>(null);

  React.useEffect(() => {
    const handleGetAllStatistics = async () => {
      const response = await getAllStatisticsByDepartment(
        selectedDepartment.departmentId,
      );

      if (response.success) {
        setStatistics(response.data?.data);
      }
    };

    if (selectedDepartment !== null) handleGetAllStatistics();
  }, [selectedDepartment]);

  React.useEffect(() => {
    const handleGetAllActiveDepartments = async () => {
      const response = await getAllActiveDepartments();

      if (response.success) {
        setActiveDepartments(response.data?.data);
        setSelectedDepartment(response.data?.data[0]);
      }
    };

    handleGetAllActiveDepartments();
  }, []);

  React.useEffect(() => {
    const handleGetRevenueStatistics = async () => {
      const response = await getRevenueStatisticsByDepartment(
        selectedDepartment.departmentId,
        dayjs(startDate1).format('YYYY/MM/DD'),
        dayjs(endDate1).format('YYYY/MM/DD'),
      );

      if (response.success) {
        setRevenueStatistics(response.data?.data);
      }
    };

    if (selectedDepartment !== null) handleGetRevenueStatistics();
  }, [startDate1, endDate1, selectedDepartment]);

  React.useEffect(() => {
    const handleGetBookingStatistics = async () => {
      const response = await getBookingStatisticsByDepartment(
        selectedDepartment.departmentId,
        dayjs(startDate2).format('YYYY/MM/DD'),
        dayjs(endDate2).format('YYYY/MM/DD'),
      );

      if (response.success) {
        setBookingStatistics(response.data?.data);
      }
    };

    if (selectedDepartment !== null) handleGetBookingStatistics();
  }, [startDate2, endDate2, selectedDepartment]);

  return (
    <ScrollView>
      <ContainerComponent style={styles.cardStatistics}>
        <ContainerComponent style={styles.container}>
          <MaterialIcons
            name="meeting-room"
            size={28}
            color={appColors.primary}
          />
          <TextComponent
            color={appColors.primary}
            bold
            fontSize={24}
            style={styles.listLabel}>
            Chọn khoa cần thống kê
          </TextComponent>
        </ContainerComponent>
        <SelectDropdown
          data={activeDepartments}
          onSelect={(selectedItem, index) => {
            setSelectedDepartment(selectedItem);
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
            marginTop: 20,
            marginBottom: 10,
          }}
          buttonTextStyle={{
            textAlign: 'left',
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdownBtnChildStyle}>
                <NotepadText size={24} color={appColors.black} />
                <Text style={styles.dropdownBtnTxt}>
                  {selectedItem
                    ? selectedItem.departmentName
                    : selectedDepartment?.departmentName}
                </Text>
              </View>
            );
          }}
        />
      </ContainerComponent>
      <FlexComponent direction="row" justifyContent="space-evenly">
        <StatisticsItemComponent
          marginLeft={10}
          icon={
            <FontistoIcon name="doctor" size={65} color={appColors.primary} />
          }
          label={`Số bác sĩ`}
          value={statistics.totalDoctors}
        />

        <StatisticsItemComponent
          marginLeft={0}
          icon={
            <FontistoIcon name="nurse" size={65} color={appColors.primary} />
          }
          label={`Số điều dưỡng`}
          value={statistics.totalNurses}
        />
      </FlexComponent>

      <ContainerComponent style={styles.cardStatistics}>
        <ContainerComponent
          paddingTop={10}
          style={{backgroundColor: 'transparent'}}>
          <ContainerComponent style={styles.container}>
            <LineChartIcon size={28} color={appColors.primary} />
            <TextComponent
              color={appColors.primary}
              bold
              fontSize={24}
              style={styles.listLabel}>
              Thống kê doanh thu
            </TextComponent>
          </ContainerComponent>

          <FlexComponent
            direction="row"
            justifyContent="space-evenly"
            style={{paddingTop: 20}}>
            <InputComponent
              editabled={false}
              label="Ngày bắt đầu *"
              labelStyle={styles.labelInput}
              size="md"
              placeholder="DD/MM/YYYY"
              value={dayjs(startDate1).format('DD/MM/YYYY')}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={styles.inputContainer}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
              endIcon={
                <Pressable onPress={() => setShowDatePicker1(true)}>
                  <CalendarDays size={24} color={appColors.black} />
                </Pressable>
              }
            />

            <DatePicker
              modal
              open={showDatePicker1}
              mode="date"
              date={startDate1}
              title={'Chọn ngày bắt đầu'}
              maximumDate={new Date()}
              onConfirm={date => {
                setStartDate1(date);
                setShowDatePicker1(false);
              }}
              onCancel={() => setShowDatePicker1(false)}
            />

            <InputComponent
              editabled={false}
              label="Ngày kết thúc *"
              labelStyle={styles.labelInput}
              size="md"
              placeholder="DD/MM/YYYY"
              value={dayjs(endDate1).format('DD/MM/YYYY')}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={styles.inputContainer}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
              endIcon={
                <Pressable onPress={() => setShowDatePicker2(true)}>
                  <CalendarDays size={24} color={appColors.black} />
                </Pressable>
              }
            />

            <DatePicker
              modal
              open={showDatePicker2}
              mode="date"
              date={endDate1}
              title={'Chọn ngày kết thúc'}
              maximumDate={new Date()}
              onConfirm={date => {
                setEndDate1(date);
                setShowDatePicker2(false);
              }}
              onCancel={() => setShowDatePicker2(false)}
            />
          </FlexComponent>
          <ContainerComponent style={styles.detailContainer}>
            <TextComponent style={{paddingBottom: 5}}>
              Biểu đồ đường thống kê doanh thu
            </TextComponent>
            {revenueStatistics.totalValues?.length > 0 && (
              <LineChart
                data={{
                  labels: revenueStatistics.labels,
                  datasets: [
                    {
                      data: revenueStatistics.totalValues,
                    },
                  ],
                }}
                width={appInfo.size.width * 0.9}
                height={220}
                yAxisSuffix="k đ"
                chartConfig={{
                  decimalPlaces: 0,
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: appColors.white,
                  backgroundGradientTo: appColors.white,
                  color: (opacity = 1) => appColors.primary,
                  labelColor: (opacity = 1) => appColors.black,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: appColors.primary,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                }}
              />
            )}
          </ContainerComponent>
        </ContainerComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.cardStatistics}>
        <ContainerComponent paddingTop={20}>
          <ContainerComponent style={styles.container}>
            <LineChartIcon size={28} color={appColors.primary} />
            <TextComponent
              color={appColors.primary}
              bold
              fontSize={24}
              style={styles.listLabel}>
              Thống kê đặt khám
            </TextComponent>
          </ContainerComponent>

          <FlexComponent
            direction="row"
            justifyContent="space-evenly"
            style={{paddingTop: 20}}>
            <InputComponent
              editabled={false}
              label="Ngày bắt đầu *"
              labelStyle={styles.labelInput}
              size="md"
              placeholder="DD/MM/YYYY"
              value={dayjs(startDate2).format('DD/MM/YYYY')}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={styles.inputContainer}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
              endIcon={
                <Pressable onPress={() => setShowDatePicker3(true)}>
                  <CalendarDays size={24} color={appColors.black} />
                </Pressable>
              }
            />

            <DatePicker
              modal
              open={showDatePicker3}
              mode="date"
              date={startDate2}
              title={'Chọn ngày bắt đầu'}
              maximumDate={endDate2}
              onConfirm={date => {
                setStartDate2(date);
                setShowDatePicker3(false);
              }}
              onCancel={() => setShowDatePicker3(false)}
            />

            <InputComponent
              editabled={false}
              label="Ngày kết thúc *"
              labelStyle={styles.labelInput}
              size="md"
              placeholder="DD/MM/YYYY"
              value={dayjs(endDate2).format('DD/MM/YYYY')}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={styles.inputContainer}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
              endIcon={
                <Pressable onPress={() => setShowDatePicker4(true)}>
                  <CalendarDays size={24} color={appColors.black} />
                </Pressable>
              }
            />

            <DatePicker
              modal
              open={showDatePicker4}
              mode="date"
              date={endDate2}
              title={'Chọn ngày kết thúc'}
              minimumDate={startDate2}
              onConfirm={date => {
                setEndDate2(date);
                setShowDatePicker4(false);
              }}
              onCancel={() => setShowDatePicker4(false)}
            />
          </FlexComponent>
          <ContainerComponent style={styles.detailContainer}>
            <TextComponent style={{paddingBottom: 5}}>
              Biểu đồ đường thống kê lượt đặt khám
            </TextComponent>
            {bookingStatistics?.values?.length > 0 && (
              <LineChart
                data={{
                  labels: bookingStatistics.labels,
                  datasets: [
                    {
                      data: bookingStatistics.values,
                    },
                  ],
                }}
                yAxisSuffix=" lượt"
                width={appInfo.size.width * 0.9}
                height={220}
                chartConfig={{
                  decimalPlaces: 0,
                  backgroundColor: appColors.white,
                  backgroundGradientFrom: appColors.white,
                  backgroundGradientTo: appColors.white,
                  color: (opacity = 1) => appColors.primary,
                  labelColor: (opacity = 1) => appColors.black,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: appColors.primary,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                }}
              />
            )}
          </ContainerComponent>
        </ContainerComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.cardStatistics}>
        <ContainerComponent
          style={[styles.container, {paddingTop: 20, paddingBottom: 5}]}>
          <FontAwesome6Icon
            name="ranking-star"
            size={24}
            color={appColors.primary}
          />
          <TextComponent
            color={appColors.primary}
            bold
            fontSize={24}
            style={styles.listLabel}>
            5 bác sĩ ưu tú
          </TextComponent>
        </ContainerComponent>
        {statistics?.topDoctors?.map((item: any, index: number) => (
          <DoctorStatisticsItemComponent
            key={index}
            doctor={item}
            index={index}
          />
        ))}
      </ContainerComponent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  detailContainer: {
    flex: 0.45,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  listLabel: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  labelInput: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    marginBottom: 5,
    width: appInfo.size.width * 0.4,
  },
  cardStatistics: {
    paddingTop: 5,
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    margin: 10,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  departmentContainer: {
    width: '100%',
    paddingTop: 15,
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    marginRight: 5,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

export default StatisticsByDepartmentScreen;
