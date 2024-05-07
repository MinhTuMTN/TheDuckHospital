import React from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {useToast} from '../hooks/ToastProvider';
import {globalStyles} from '../styles/globalStyles';
import notifee, {TriggerType} from '@notifee/react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';

const TestScreen = () => {
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);

  return (
    <View style={globalStyles.center}>
      <ButtonComponent
        onPress={() => {
          setDatePickerVisible(true);
        }}>
        Show Notification
      </ButtonComponent>

      <DatePicker
        date={new Date()}
        onConfirm={(date: Date) => {
          // Reset the time to 00:00:00
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);

          console.log('date', date);
          setDatePickerVisible(false);
        }}
        mode="date"
        modal
        onCancel={() => {
          setDatePickerVisible(false);
        }}
        open={datePickerVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default TestScreen;
