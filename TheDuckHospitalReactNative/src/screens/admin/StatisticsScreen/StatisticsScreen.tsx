import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {ScrollView} from '@gluestack-ui/themed';
import {CalendarDays, LifeBuoy, LineChartIcon} from 'lucide-react-native';
import {LineChart} from 'react-native-chart-kit';
import {appInfo} from '../../../constants/appInfo';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import {PieChart} from 'react-native-gifted-charts';
import {
  getAllStatistics,
  getBookingStatistics,
  getRevenueStatistics,
} from '../../../services/statisticsServices';
import DepartmentStatisticsItemComponent from '../../../components/admin/statisticsScreen/DepartmentStatisticsItemComponent';
import LegendComponent from '../../../components/admin/statisticsScreen/LegendComponent';
import StatisticsItemComponent from '../../../components/admin/statisticsScreen/StatisticsItemComponent';

function StatisticsScreen() {
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
  const [pieData, setPieData] = useState([
    {
      value: 0,
      color: '#009FFF',
      gradientCenterColor: appColors.primary,
      focused: true,
      text: '',
      label: '',
    },
    {
      value: 0,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      text: '',
      label: '',
    },
    {
      value: 0,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
      text: '',
      label: '',
    },
  ]);

  const getTotalValueSum = (data: any) => {
    return data.reduce(
      (accumulator: any, current: any) => accumulator + current.value,
      0,
    );
  };

  React.useEffect(() => {
    const handleGetAllStatistics = async () => {
      const response = await getAllStatistics();

      console.log(response);

      if (response.success) {
        setStatistics(response.data?.data);
        let pieDataAPI = response.data?.data.paymentMethodStatistics;
        pieDataAPI = pieDataAPI.sort((a: any, b: any) => b.value - a.value);
        const totalValueSum = getTotalValueSum(pieDataAPI);

        let updatedPieData = pieData.map((item, index) => {
          const apiItem = pieDataAPI[index];
          return {
            ...item,
            value: apiItem.value,
            text: `${Math.round((apiItem.value * 100) / totalValueSum)}%`,
            label: apiItem.label,
          };
        });

        setPieData(updatedPieData);
      }
    };

    handleGetAllStatistics();
  }, []);

  React.useEffect(() => {
    const handleGetRevenueStatistics = async () => {
      const response = await getRevenueStatistics(
        dayjs(startDate1).format('YYYY/MM/DD'),
        dayjs(endDate1).format('YYYY/MM/DD'),
      );

      console.log(response);

      if (response.success) {
        setRevenueStatistics(response.data?.data);
      }
    };

    handleGetRevenueStatistics();
  }, [startDate1, endDate1]);

  React.useEffect(() => {
    const handleGetBookingStatistics = async () => {
      const response = await getBookingStatistics(
        dayjs(startDate2).format('YYYY/MM/DD'),
        dayjs(endDate2).format('YYYY/MM/DD'),
      );

      if (response.success) {
        setBookingStatistics(response.data?.data);
      }
    };

    handleGetBookingStatistics();
  }, [startDate2, endDate2]);

  return (
    <ScrollView>
      <FlexComponent direction="row" justifyContent="space-evenly">
        <StatisticsItemComponent
          marginLeft={10}
          icon={
            <FontistoIcon
              name="bed-patient"
              size={65}
              color={appColors.primary}
            />
          }
          label={`Số bệnh nhân mới`}
          value={statistics.totalPatients}
        />

        <StatisticsItemComponent
          marginLeft={10}
          icon={
            <MaterialCommunityIcon
              name="google-classroom"
              size={65}
              color={appColors.primary}
            />
          }
          label={`Số chuyên khoa`}
          value={statistics.totalDepartments}
        />
        {/* <ContainerComponent style={[styles.cardStatistics, {marginLeft: 10}]}>
          <FlexComponent alignItems="center" justifyContent="center">
            <FontistoIcon
              name="bed-patient"
              size={65}
              color={appColors.primary}
            />

            <TextComponent
              color={appColors.darkGray}
              fontSize={18}
              style={{
                paddingBottom: 10,
                borderBottomWidth: 5,
                borderColor: appColors.gray,
              }}>
              Số bệnh nhân mới
            </TextComponent>
            <TextComponent fontSize={28}>
              {statistics.totalPatients}
            </TextComponent>
          </FlexComponent>
        </ContainerComponent> */}

        {/* <ContainerComponent style={[styles.cardStatistics, {marginLeft: 0}]}>
          <FlexComponent alignItems="center" justifyContent="center">
            <MaterialCommunityIcon
              name="google-classroom"
              size={65}
              color={appColors.primary}
            />

            <TextComponent
              color={appColors.darkGray}
              fontSize={18}
              style={{
                paddingBottom: 10,
                borderBottomWidth: 5,
                borderColor: appColors.gray,
              }}>
              Số chuyên khoa
            </TextComponent>
            <TextComponent fontSize={28}>
              {statistics.totalDepartments}
            </TextComponent>
          </FlexComponent>
        </ContainerComponent> */}
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
            {revenueStatistics.values?.length > 0 && (
              <LineChart
                data={{
                  labels: revenueStatistics.labels,
                  datasets: [
                    {
                      data: revenueStatistics.values,
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
            {bookingStatistics.values?.length > 0 && (
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
          <LifeBuoy size={28} color={appColors.primary} />
          <TextComponent
            color={appColors.primary}
            bold
            fontSize={24}
            style={styles.listLabel}>
            Thống kê loại thanh toán
          </TextComponent>
        </ContainerComponent>
        <FlexComponent
          alignItems="center"
          style={{backgroundColor: appColors.white, paddingLeft: 20}}>
          <TextComponent style={{fontSize: 16, paddingVertical: 10}}>
            Biểu đồ tròn thống kê loại thanh toán
          </TextComponent>
          <FlexComponent
            direction="row"
            justifyContent="space-evenly"
            alignItems="center">
            <PieChart
              showText
              textColor={appColors.black}
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={95}
              innerRadius={45}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TextComponent
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}>
                      {pieData[0].text}
                    </TextComponent>
                    <TextComponent style={{fontSize: 14}}>
                      {pieData[0].label}
                    </TextComponent>
                  </View>
                );
              }}
            />
            <ContainerComponent style={{paddingTop: 0, paddingLeft: 20}}>
              {pieData[0].label !== '' && <LegendComponent pieData={pieData} />}
            </ContainerComponent>
          </FlexComponent>
        </FlexComponent>
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
            10 khoa có nhiều lượt khám
          </TextComponent>
        </ContainerComponent>
        {statistics.topDepartments?.map((item: any, index: number) => (
          <DepartmentStatisticsItemComponent
            key={index}
            departmentItem={item}
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
    marginRight: 10,
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
});

export default StatisticsScreen;
