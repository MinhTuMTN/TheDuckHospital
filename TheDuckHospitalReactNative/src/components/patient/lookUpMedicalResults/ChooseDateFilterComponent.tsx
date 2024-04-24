import dayjs from 'dayjs';
import {CalendarDays, ChevronDownIcon} from 'lucide-react-native';
import React, {useMemo, useState} from 'react';
import {Easing, Pressable, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../ButtonComponent';
import FlexComponent from '../../FlexComponent';
import InputComponent from '../../InputComponent';
import PopupComponent from '../../PopupComponent';
import Space from '../../Space';
import TextComponent from '../../TextComponent';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useToast} from '../../../hooks/ToastProvider';

interface ChooseDateFilterComponentProps {
  onChange?: (fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs) => void;
}

const ChooseDateFilterComponent = (props: ChooseDateFilterComponentProps) => {
  const {onChange} = props;
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(
    dayjs().subtract(1, 'month'),
  );
  const [label, setLabel] = useState<string>('Hôm nay');
  const [toDate, setToDate] = useState<dayjs.Dayjs>(dayjs());
  const [fromDateVisible, setFromDateVisible] = useState(false);
  const [toDateVisible, setToDateVisible] = useState(false);
  const [dateFilterVisible, setDateFilterVisible] = useState(false);
  const [mode, setMode] = useState<'any' | 'today' | 'yesterday'>('today');
  const [message, setMessage] = useState<string>('');

  // Animate the label when the input is focused
  const offsetValue = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      display: offsetValue.value === 0 ? 'none' : 'flex',
      transform: [
        {
          scale: offsetValue.value,
        },
      ],
    };
  });
  const toggleChooseDate = (show: boolean) => {
    if (
      (show && offsetValue.value === 1) ||
      (!show && offsetValue.value === 0)
    ) {
      return;
    }
    offsetValue.value = withTiming(show ? 1 : 0, {
      duration: 300,
    });
  };

  const toast = useToast();
  const handleApply = () => {
    if (mode === 'any' && fromDate.isAfter(toDate)) {
      setMessage('Ngày bắt đầu không được lớn hơn ngày kết thúc');
      return;
    }

    if (mode === 'any' && toDate.diff(fromDate, 'day') > 60) {
      setMessage('Khoảng thời gian tìm kiếm không được lớn hơn 60 ngày');
      return;
    }

    switch (mode) {
      case 'any':
        setLabel(`${fromDate.format('DD/MM')} - ${toDate.format('DD/MM')}`);
        break;
      case 'today':
        setLabel('Hôm nay');
        break;
      case 'yesterday':
        setLabel('Hôm qua');
        break;
    }

    onChange?.(fromDate, toDate);
    setDateFilterVisible(false);
  };
  return (
    <>
      <Pressable
        onPress={() => setDateFilterVisible(!dateFilterVisible)}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <FlexComponent direction="row" alignItems="center">
          <CalendarDays
            color={appColors.black}
            size={18}
            style={{marginRight: 4}}
          />
          <TextComponent fontSize={16}>{label}</TextComponent>
        </FlexComponent>
        <ChevronDownIcon width={16} height={16} color={appColors.black} />
      </Pressable>
      <PopupComponent
        visible={dateFilterVisible}
        onClose={() => setDateFilterVisible(false)}
        variant="default">
        <View
          style={{
            width: '100%',
          }}>
          <TextComponent fontWeight="500" textAlign="center" fontSize={18}>
            Ngày thực hiện
          </TextComponent>
          <ButtonComponent
            onPress={() => {
              setMode('any');
              toggleChooseDate(true);
            }}
            containerStyles={[
              styles.button,
              mode === 'any' && styles.buttonActive,
            ]}
            textStyles={[
              styles.buttonText,
              mode === 'any' && styles.buttonTextActive,
            ]}>
            Ngày bất kỳ
          </ButtonComponent>
          <Animated.View style={animatedStyles}>
            <Space paddingTop={16} />
            <View>
              <InputComponent
                editabled={false}
                label="Từ ngày"
                labelStyle={styles.labelInput}
                size="md"
                placeholder="DD/MM/YYYY"
                value={fromDate.format('DD/MM/YYYY')}
                inputContainerStyle={styles.inputContainer}
                inputContainerFocusStyle={styles.inputContainer}
                inputStyle={{
                  paddingLeft: 10,
                }}
                inputFocusStyle={{
                  paddingLeft: 10,
                }}
                endIcon={
                  <Pressable onPress={() => setFromDateVisible(true)}>
                    <CalendarDays size={24} color={appColors.black} />
                  </Pressable>
                }
              />
              <DatePicker
                modal
                mode="date"
                open={fromDateVisible}
                date={fromDate.toDate()}
                onConfirm={date => {
                  setFromDateVisible(false);
                  setFromDate(dayjs(date));
                }}
                onCancel={() => {
                  setFromDateVisible(false);
                }}
              />
            </View>
            <View>
              <InputComponent
                editabled={false}
                label="Đến ngày"
                labelStyle={styles.labelInput}
                size="md"
                placeholder="DD/MM/YYYY"
                value={toDate.format('DD/MM/YYYY')}
                inputContainerStyle={styles.inputContainer}
                inputContainerFocusStyle={styles.inputContainer}
                inputStyle={{
                  paddingLeft: 10,
                }}
                inputFocusStyle={{
                  paddingLeft: 10,
                }}
                endIcon={
                  <Pressable onPress={() => setToDateVisible(true)}>
                    <CalendarDays size={24} color={appColors.black} />
                  </Pressable>
                }
              />
              <DatePicker
                modal
                mode="date"
                open={toDateVisible}
                date={toDate.toDate()}
                onConfirm={date => {
                  setToDateVisible(false);
                  setToDate(dayjs(date));
                }}
                onCancel={() => {
                  setToDateVisible(false);
                }}
              />
            </View>
          </Animated.View>
          <ButtonComponent
            onPress={() => {
              setMode('today');
              toggleChooseDate(false);
              setFromDate(dayjs());
              setToDate(dayjs());
            }}
            containerStyles={[
              styles.button,
              mode === 'today' && styles.buttonActive,
            ]}
            textStyles={[
              styles.buttonText,
              mode === 'today' && styles.buttonTextActive,
            ]}>
            Hôm nay
          </ButtonComponent>
          <ButtonComponent
            onPress={() => {
              setMode('yesterday');
              toggleChooseDate(false);
              setFromDate(dayjs().subtract(1, 'day'));
              setToDate(dayjs().subtract(1, 'day'));
            }}
            containerStyles={[
              styles.button,
              mode === 'yesterday' && styles.buttonActive,
            ]}
            textStyles={[
              styles.buttonText,
              mode === 'yesterday' && styles.buttonTextActive,
            ]}>
            Hôm qua
          </ButtonComponent>
        </View>
        <Space paddingTop={12} />

        <TextComponent
          fontSize={14}
          color={appColors.error}
          style={{
            width: '100%',
            display: message ? 'flex' : 'none',
          }}>
          {message}
        </TextComponent>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: 12,
          }}>
          <ButtonComponent
            onPress={handleApply}
            containerStyles={[
              styles.button,
              styles.buttonActive,
              {backgroundColor: appColors.primaryDark, flex: 1},
            ]}>
            Áp dụng
          </ButtonComponent>
          <ButtonComponent
            onPress={() => setDateFilterVisible(false)}
            containerStyles={[
              styles.button,
              {backgroundColor: '#fd4949', flex: 1},
            ]}
            textStyles={[styles.buttonText, styles.buttonTextActive]}>
            Hủy
          </ButtonComponent>
        </View>
      </PopupComponent>
    </>
  );
};

const styles = StyleSheet.create({
  labelInput: {
    color: appColors.black,
    fontSize: 15,
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: appColors.white,
    borderRadius: 8,
    borderColor: appColors.white,
    borderWidth: 1,
    height: 40,
  },
  button: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.primary,
  },
  buttonActive: {
    backgroundColor: appColors.primary,
  },
  buttonTextActive: {
    color: appColors.white,
  },
});
export default ChooseDateFilterComponent;
