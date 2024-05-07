import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../../constants/appColors';
import TextComponent from '../../TextComponent';

interface TabMyMedicineComponentProps {
  tabIsUse: boolean;
  setTabIsUse: (value: boolean) => void;
}
const TabMyMedicineComponent = (props: TabMyMedicineComponentProps) => {
  const {tabIsUse, setTabIsUse} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setTabIsUse(true)}
        style={[
          styles.tabLayout,
          {backgroundColor: tabIsUse ? appColors.darkBlue : 'transparent'},
        ]}>
        <TextComponent
          style={tabIsUse ? styles.textTabOnFocus : styles.textTabNotFocus}>
          Thuốc đang uống
        </TextComponent>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTabIsUse(false)}
        style={[
          styles.tabLayout,
          {backgroundColor: !tabIsUse ? appColors.darkBlue : 'transparent'},
        ]}>
        <TextComponent
          style={!tabIsUse ? styles.textTabOnFocus : styles.textTabNotFocus}>
          Thuốc đã dừng
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default TabMyMedicineComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -20,
    left: 22,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    padding: 6,
    borderRadius: 30,
    flexDirection: 'row',
  },
  tabLayout: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textTabOnFocus: {
    fontSize: 14,
    letterSpacing: 0.5,
    color: appColors.white,
    fontWeight: '700',
  },
  textTabNotFocus: {
    fontSize: 14,
    letterSpacing: 0.5,
    color: appColors.grayLight,
  },
});
