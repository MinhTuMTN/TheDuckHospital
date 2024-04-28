import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import FlexComponent from '../../FlexComponent';
import {PieChart} from '../../../assets/svgs';
import TextComponent from '../../TextComponent';
import {FlatList} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Space from '../../Space';
import dayjs from 'dayjs';

const MonthComponent = ({
  month,
  year,
  active,
  onPress,
}: {
  month: number;
  year: number;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.monthContainer, active && styles.activeContainer]}>
      <TextComponent
        color={active ? appColors.white : appColors.textDarker}
        fontWeight={active ? '600' : '500'}>
        {month.toString().padStart(2, '0') + '/' + year}
      </TextComponent>
    </Pressable>
  );
};

interface ChooseMonthStatisticComponentProps {
  selectedMonth: {
    month: number;
    year: number;
  };
  onMonthChange: (value: {month: number; year: number}) => void;
}

const ChooseMonthStatisticComponent = (
  props: ChooseMonthStatisticComponentProps,
) => {
  const {selectedMonth, onMonthChange} = props;
  const [month, setMonth] = React.useState([]);
  const _renderItem = useCallback(
    ({item}: {item: any}) => {
      return (
        <MonthComponent
          month={item.month}
          year={item.year}
          active={
            item.month === selectedMonth.month &&
            item.year === selectedMonth.year
          }
          onPress={() => {
            onMonthChange(item);
          }}
        />
      );
    },
    [selectedMonth],
  );

  const _keyExtractor = useCallback(
    (item: any) => item.month + '/' + item.year,
    [],
  );

  useEffect(() => {
    let currentMonth: dayjs.Dayjs = dayjs();
    const months: any = [];
    for (let i = 0; i < 12; i++) {
      currentMonth = currentMonth.subtract(i, 'month');
      months.push({
        month: currentMonth.month() + 1,
        year: currentMonth.year(),
      });
    }
    setMonth(months);
  }, []);
  return (
    <View>
      <FlexComponent direction="row" alignItems="center" columnGap={8}>
        <PieChart width={32} height={32} />
        <TextComponent
          color={appColors.textDarker}
          fontSize={18}
          fontWeight="500">
          Thống kê giao dịch
        </TextComponent>
      </FlexComponent>
      <Space paddingTop={16} />
      <FlatList
        data={month}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: appColors.textDarker,
    elevation: 4,
  },
  activeContainer: {
    backgroundColor: appColors.darkBlue,
    borderColor: appColors.darkBlue,
  },
});
export default memo(ChooseMonthStatisticComponent);
