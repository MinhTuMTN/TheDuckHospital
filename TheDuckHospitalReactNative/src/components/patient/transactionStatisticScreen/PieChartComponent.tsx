import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {memo, useEffect, useMemo} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import FlexComponent from '../../FlexComponent';
import TextComponent from '../../TextComponent';
import Space from '../../Space';
import {appColors} from '../../../constants/appColors';
import {
  getCenterGradientColor,
  getTransactionColor,
  getTransactionType,
} from '../../../utils/transactionUtils';

interface PieChartComponentProps {
  dataChart: any[];
}

const PieChartComponent = (props: PieChartComponentProps) => {
  const {dataChart} = props;

  const [status, setStatus] = React.useState(0);
  const [pieData, setPieData] = React.useState<any[]>([
    {
      value: 100,
      text: '0',
      color: '#c0c0c0',
      gradientCenterColor: '#c0c0c0',
      name: 'Không có dữ liệu',
    },
  ]);

  const renderLegend = useMemo(() => {
    const paymentType =
      status === 0 ? ['TOP_UP', 'REFUND'] : ['BOOKING', 'MEDICAL_TEST'];
    return (
      <FlexComponent direction="row" columnGap={8}>
        {paymentType.map((item, index) => {
          return (
            <FlexComponent
              key={index}
              direction="row"
              alignItems="center"
              columnGap={8}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: getTransactionColor(item),
                }}
              />
              <TextComponent>{getTransactionType(item)}</TextComponent>
            </FlexComponent>
          );
        })}
      </FlexComponent>
    );
  }, [status]);

  useEffect(() => {
    let totalValue = 0;
    let tempPieData: any[] = [];
    if (dataChart && dataChart.length > 0) {
      const incomePaymentType = ['TOP_UP', 'REFUND'];
      const outcomePaymentType = ['BOOKING', 'MEDICAL_TEST'];

      const paymentType = status === 0 ? incomePaymentType : outcomePaymentType;
      dataChart.forEach(item => {
        if (paymentType.includes(item.paymentType)) {
          totalValue += item.value;
          tempPieData.push({
            value: item.value,
            text: `${item.value}`,
            color: getTransactionColor(item.paymentType),
            gradientCenterColor: getCenterGradientColor(item.paymentType),
            name: item.paymentType,
          });
        }
      });
    }

    if (totalValue === 0) {
      tempPieData = [
        {
          value: 100,
          text: '0',
          color: '#c0c0c0',
          gradientCenterColor: '#c0c0c0',
          name: 'Không có dữ liệu',
        },
      ];
    }

    setPieData(tempPieData);
  }, [dataChart, status]);

  return (
    <View style={styles.container}>
      <Space paddingBottom={16} />
      <FlexComponent direction="row" style={{width: '60%'}}>
        <Pressable
          onPress={() => setStatus(0)}
          style={[styles.button, styles.left, status === 0 && styles.active]}>
          <TextComponent
            color={appColors.white}
            fontWeight="500"
            textAlign="center">
            Tiền vào
          </TextComponent>
        </Pressable>
        <Pressable
          onPress={() => setStatus(1)}
          style={[styles.button, styles.right, status === 1 && styles.active]}>
          <TextComponent
            textAlign="center"
            color={appColors.white}
            fontWeight="500">
            Tiền ra
          </TextComponent>
        </Pressable>
      </FlexComponent>
      <PieChart
        data={pieData}
        showText
        textColor="#ffffff"
        fontWeight="bold"
        donut
        showGradient
        sectionAutoFocus
      />
      <Space paddingBottom={16} />
      {renderLegend}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5c9cf0',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 1,
    borderRightColor: appColors.gray,
  },
  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 1,
    borderLeftColor: appColors.gray,
  },
  active: {
    backgroundColor: appColors.darkerBlue,
  },
});

export default memo(PieChartComponent);
