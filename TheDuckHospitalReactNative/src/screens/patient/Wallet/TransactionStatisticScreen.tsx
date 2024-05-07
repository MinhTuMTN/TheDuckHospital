import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ContainerComponent,
  ContentComponent,
  Header,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import LoginRequireComponent from '../../../components/LoginRequireComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import CurrentBalanceComponent from '../../../components/patient/transactionStatisticScreen/CurrentBalanceComponent';
import ChooseMonthStatisticComponent from '../../../components/patient/transactionStatisticScreen/ChooseMonthStatisticComponent';
import PieChartComponent from '../../../components/patient/transactionStatisticScreen/PieChartComponent';
import DetailsTransaction from '../../../components/patient/transactionStatisticScreen/DetailsTransaction';
import {appInfo} from '../../../constants/appInfo';
import LoadingStatisticComponent from '../../../components/patient/transactionStatisticScreen/LoadingStatisticComponent';
import dayjs from 'dayjs';
import {getWalletStatistic} from '../../../services/walletServices';

const TransactionStatisticScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [month, setMonth] = useState({
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const [statistic, setStatistic] = useState<any>({});

  const handleGetStatistic = useCallback(
    async (month: number, year: number) => {
      if (!month || !year) return;

      setIsLoading(true);
      const response = await getWalletStatistic(month, year);
      setIsLoading(false);

      if (response.success) setStatistic(response.data.data);
    },
    [],
  );

  useEffect(() => {
    handleGetStatistic(month.month, month.year);
  }, [month]);

  return (
    <LoadingComponent styles={{flex: 1}}>
      <LoginRequireComponent>
        <ContainerComponent
          paddingTop={0}
          style={{minHeight: appInfo.size.height}}>
          <ScrollView style={{flex: 1}}>
            <Header
              title="Thống kê giao dịch"
              noBackground
              paddingTop={28}
              backgroundColor={appColors.darkBlue}
            />
            <ContentComponent
              style={{
                backgroundColor: '#f8f8f8',
                flex: 1,
              }}>
              <CurrentBalanceComponent balance={statistic.balance} />
              <View style={styles.container}>
                <ChooseMonthStatisticComponent
                  selectedMonth={month}
                  onMonthChange={(value: {month: number; year: number}) => {
                    setMonth(value);
                  }}
                />
                <PieChartComponent dataChart={statistic?.charts} />
              </View>
              <DetailsTransaction transactions={statistic?.transactions} />
            </ContentComponent>
          </ScrollView>

          <LoadingStatisticComponent loading={isLoading} />
        </ContainerComponent>
      </LoginRequireComponent>
    </LoadingComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: appColors.white,
    elevation: 4,
    padding: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
});
export default TransactionStatisticScreen;
