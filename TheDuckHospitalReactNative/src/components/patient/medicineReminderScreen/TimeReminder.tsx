import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../../constants/appColors';
import ButtonComponent from '../../ButtonComponent';
import LineInfoComponent from '../../LineInfoComponent';
import TextComponent from '../../TextComponent';
import {howToUse} from '../../../utils/medicineUtils';
import InputComponent from '../../InputComponent';

interface TimeReminderProps {
  unit: string;
  howToUse: string;
  index: number;
  hour: string;
  minute: string;
  quantity: number;
  onChange: (
    index: number,
    hour: string,
    minute: string,
    quantity: number,
  ) => void;
}
const TimeReminder = (props: TimeReminderProps) => {
  const {index, hour, minute, quantity, onChange, unit, howToUse} = props;
  const [timeReminderVisible, setTimeReminderVisible] = useState(false);
  const setHour = (hour: string) => {
    onChange(index, hour, minute, quantity);
  };
  const setMinute = (minute: string) => {
    onChange(index, hour, minute, quantity);
  };
  const setQuantity = (quantity: number) => {
    onChange(index, hour, minute, quantity);
  };
  return (
    <Pressable
      onPress={() => {
        setTimeReminderVisible(true);
      }}
      style={styles.container}>
      <View style={styles.timeLayout}>
        <TextComponent
          fontSize={32}
          fontWeight="700"
          color={'#dc2f2ff2'}
          style={{
            textShadowColor: appColors.grayLight,
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
            letterSpacing: 1,
          }}>
          {hour.toString().padStart(2, '0')}:
          {minute.toString().padStart(2, '0')}
        </TextComponent>
      </View>
      <View style={styles.infoLayOut}>
        <LineInfoComponent
          label="Liều lượng:"
          value={quantity + ' ' + unit}
          containerStyles={{
            paddingHorizontal: 16,
          }}
          labelStyles={{
            color: '#5E5E5E',
            fontSize: 15,
            fontWeight: '500',
          }}
          valueStyles={{
            color: '#5E5E5E',
            fontSize: 16,
            fontWeight: '700',
          }}
          endIcon={
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={28}
              color={appColors.grayLight}
            />
          }
          valueTextAlign="left"
          flexLabel={1.75}
          flexValue={2.25}
        />
      </View>
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={timeReminderVisible}
        onRequestClose={() => setTimeReminderVisible(false)}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
          }}>
          <View style={styles.containerModal}>
            <View style={styles.modalView}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 12,
                  borderBottomColor: appColors.grayLight,
                  borderBottomWidth: 1,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => setTimeReminderVisible(false)}
                  style={{
                    position: 'absolute',
                    padding: 10,
                    top: -10,
                    right: 10,
                    zIndex: 1,
                  }}>
                  <AntDesign
                    name="close"
                    size={30}
                    color={appColors.grayLight}
                  />
                </TouchableOpacity>
                <TextComponent
                  textAlign="center"
                  fontWeight="600"
                  fontSize={18}>
                  Chọn thời gian và liều lượng
                </TextComponent>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 22,
                  paddingTop: 14,
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    backgroundColor: appColors.white,
                  }}>
                  <TextInput
                    placeholder="00"
                    placeholderTextColor={appColors.grayLight}
                    value={hour}
                    onChangeText={(text: string) => {
                      const newValue = parseInt(text);
                      if (newValue >= 0 && newValue <= 23) {
                        setHour(newValue.toString());
                      } else {
                        setHour('');
                        console.log('Hour must be between 0 and 23');
                      }
                    }}
                    selectTextOnFocus
                    keyboardType="numeric"
                    style={{
                      fontSize: 64,
                      fontWeight: '500',
                      textAlign: 'center',
                      width: 100,
                      color: appColors.black,
                    }}
                  />
                  <TextComponent fontSize={25} fontWeight="bold">
                    :
                  </TextComponent>
                  <TextInput
                    value={minute.toString()}
                    onChangeText={(text: string) => {
                      const newValue = parseInt(text);
                      if (newValue >= 0 && newValue <= 59) {
                        setMinute(newValue.toString());
                      } else setMinute('');
                    }}
                    placeholder="00"
                    placeholderTextColor={appColors.grayLight}
                    selectTextOnFocus
                    keyboardType="numeric"
                    style={{
                      fontSize: 64,
                      fontWeight: '500',
                      textAlign: 'center',
                      width: 100,
                      color: appColors.black,
                    }}
                  />
                </View>
                <TextComponent
                  style={{}}
                  textAlign="left"
                  color={appColors.grayLight}
                  fontSize={16}
                  fontWeight="600">
                  Liều uống:
                </TextComponent>
                <View style={styles.quantityInput}>
                  <TextComponent
                    fontSize={14}
                    fontWeight="500"
                    color={appColors.grayLight}>
                    {howToUse}
                  </TextComponent>
                  <View style={styles.numberInputWrapper}>
                    <AntDesign
                      name="minuscircleo"
                      size={22}
                      color={appColors.grayLight}
                      style={{
                        zIndex: 1,
                      }}
                      onPress={() => {
                        if (quantity > 0) setQuantity(quantity - 0.5);
                      }}
                    />
                    <InputComponent
                      value={quantity.toString()}
                      onChangeText={(text: string) => {
                        const newValue = parseFloat(text);
                        if (newValue >= 0) {
                          setQuantity(newValue);
                        } else {
                          setQuantity(0);
                        }
                      }}
                      keyboardType="numeric"
                      _inputStyle={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '600',
                        paddingVertical: 0,
                      }}
                      containerStyle={{
                        width: 90,
                        marginHorizontal: 10,
                      }}
                    />

                    <AntDesign
                      name="pluscircleo"
                      size={22}
                      color={appColors.grayLight}
                      onPress={() => setQuantity(quantity + 0.5)}
                      style={{
                        zIndex: 1,
                      }}
                    />
                  </View>
                  <TextComponent
                    fontSize={14}
                    fontWeight="500"
                    color={appColors.grayLight}>
                    {unit}
                  </TextComponent>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                }}>
                <ButtonComponent
                  onPress={() => setTimeReminderVisible(false)}
                  containerStyles={styles.buttonOption}
                  textStyles={{
                    color: appColors.white,
                    fontWeight: '600',
                  }}>
                  Xác nhận
                </ButtonComponent>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Pressable>
  );
};

export default TimeReminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderColor: appColors.grayLight,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 16,
  },
  timeLayout: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: appColors.grayLight,
    borderRightWidth: 1,
  },
  infoLayOut: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingBottom: 20,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityInput: {
    width: '100%',
    flexDirection: 'row',
    borderColor: appColors.grayLight,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 10,
  },
  numberInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonOption: {
    width: '100%',
    alignItems: 'center',
    borderColor: appColors.darkerBlue,
    backgroundColor: appColors.darkerBlue,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
