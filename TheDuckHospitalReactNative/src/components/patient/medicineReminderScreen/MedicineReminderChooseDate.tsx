import dayjs from 'dayjs';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';

interface MedicineReminderChooseDateProps {
  selectedDate: dayjs.Dayjs;
  onChangeSelectedDate?: (date: dayjs.Dayjs) => void;
}

const MedicineReminderChooseDate = (props: MedicineReminderChooseDateProps) => {
  const {selectedDate} = props;
  // Value in [-4; 4], 0 is the current week
  const [indexShow, setIndexShow] = useState(0);
  const [datesContainerWidth, setDatesContainerWidth] = useState(0);
  const dates = useMemo(() => {
    let startDay = dayjs().startOf('week').subtract(4, 'week');
    let endDay = dayjs().startOf('week').add(4, 'week').endOf('week');

    let dates = [];
    while (startDay.isBefore(endDay)) {
      dates.push(startDay);
      startDay = startDay.add(1, 'day');
    }

    return dates;
  }, []);

  const offsetValue = useSharedValue(datesContainerWidth);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetValue.value}],
    };
  });
  useEffect(() => {
    offsetValue.value = withTiming(
      -4 * datesContainerWidth - indexShow * datesContainerWidth,
      {
        duration: 500,
      },
    );
  }, [indexShow, datesContainerWidth]);
  return (
    <View>
      <FlexComponent
        direction="row"
        style={styles.dateContainer}
        alignItems="center">
        <View
          style={{
            width: 30,
            height: 30,
          }}>
          {indexShow === -4 ? null : (
            <ChevronLeft
              width={30}
              height={30}
              color={appColors.white}
              onPress={() => {
                if (indexShow === -4) return;
                setIndexShow(prev => prev - 1);
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            overflow: 'hidden',
          }}>
          <Animated.View
            onLayout={e => {
              const itemWidth = (e.nativeEvent.layout.width * 13.75) / 100 + 2;
              setDatesContainerWidth(itemWidth * 7);

              offsetValue.value = -4 * itemWidth * 7;
            }}
            style={[
              {
                flexDirection: 'row',
              },
              animatedStyles,
            ]}>
            {dates.map((date, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  props.onChangeSelectedDate?.(date);
                }}
                style={{
                  alignItems: 'center',
                  flexBasis: '13.75%',
                  marginHorizontal: 1,
                  paddingVertical: 8,
                  borderRadius: 10,
                  backgroundColor:
                    date.format('YYYY-MM-DD') ===
                    selectedDate.format('YYYY-MM-DD')
                      ? '#2155b2'
                      : appColors.darkBlue,
                }}>
                <TextComponent fontSize={14} bold color={appColors.white}>
                  {date.get('d') === 0 ? 'CN' : `Th ${date.get('d') + 1}`}
                </TextComponent>
                <TextComponent fontSize={16} bold color={appColors.white}>
                  {date.get('D')}
                </TextComponent>
              </Pressable>
            ))}
          </Animated.View>
        </View>
        <View
          style={{
            width: 30,
            height: 30,
          }}>
          {indexShow === 4 ? null : (
            <ChevronRight
              width={30}
              height={30}
              color={appColors.white}
              onPress={() => {
                if (indexShow === 4) return;
                setIndexShow(prev => prev + 1);
              }}
            />
          )}
        </View>
      </FlexComponent>
      <FlexComponent
        style={[
          styles.dateContainer,
          {
            padding: 8,
            paddingBottom: 32,
          },
        ]}
        direction="row"
        justifyContent="space-between">
        <View style={{flex: 2}}>
          {indexShow < 0 && (
            <Pressable
              onPress={() => {
                setIndexShow(0);
                props.onChangeSelectedDate?.(dayjs());
              }}>
              <FlexComponent direction="row" alignItems="center" columnGap={2}>
                <TextComponent color={appColors.white}>Hôm nay</TextComponent>
                <ChevronsRight color={appColors.white} size={22} />
              </FlexComponent>
            </Pressable>
          )}
        </View>

        <TextComponent bold color={appColors.white}>
          {selectedDate.format('DD/MM/YYYY')}
        </TextComponent>

        <View style={{flex: 2}}>
          {indexShow > 0 && (
            <Pressable
              onPress={() => {
                setIndexShow(0);
                props.onChangeSelectedDate?.(dayjs());
              }}>
              <FlexComponent
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                columnGap={2}>
                <ChevronsLeft color={appColors.white} size={22} />
                <TextComponent color={appColors.white}>Hôm nay</TextComponent>
              </FlexComponent>
            </Pressable>
          )}
        </View>
      </FlexComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: appColors.darkBlue,
  },
  main: {
    backgroundColor: appColors.white,
    flex: 1,
    marginTop: -16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default MedicineReminderChooseDate;
