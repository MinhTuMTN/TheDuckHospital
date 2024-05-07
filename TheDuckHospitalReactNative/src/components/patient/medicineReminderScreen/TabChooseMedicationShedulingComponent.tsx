import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextComponent} from '../../../components';
import {appColors} from '../../../constants/appColors';

interface TabChooseMedicationShedulingComponentProps {
  numberNotSet: number;
  numberSet: number;
  tabNotSet: boolean;
  setTabNotSet: (value: boolean) => void;
}

const TabChooseMedicationShedulingComponent = (
  props: TabChooseMedicationShedulingComponentProps,
) => {
  const {tabNotSet, setTabNotSet, numberNotSet = 0, numberSet = 0} = props;

  return (
    <View style={styles.tabWrapper}>
      <TouchableOpacity
        style={[
          styles.tab,
          {
            borderBottomColor: tabNotSet
              ? appColors.primaryDark
              : 'transparent',

            borderBottomWidth: tabNotSet ? 2 : 0,
            borderBottomLeftRadius: 10,
          },
        ]}
        onPress={() => {
          setTabNotSet(true);
        }}>
        <TextComponent
          style={tabNotSet ? styles.textTabOnFocus : styles.textTabNotFocus}>
          Chưa đặt lịch
        </TextComponent>
        <View
          style={[
            styles.numberOutline,
            {
              backgroundColor: tabNotSet
                ? appColors.primaryDark
                : appColors.grayLight,
            },
          ]}>
          <Text style={styles.numberOnFocus}>{numberNotSet}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          {
            borderBottomColor: !tabNotSet
              ? appColors.primaryDark
              : 'transparent',
            borderBottomWidth: !tabNotSet ? 2 : 0,
            borderBottomRightRadius: 10,
          },
        ]}
        onPress={() => {
          setTabNotSet(false);
        }}>
        <TextComponent
          style={!tabNotSet ? styles.textTabOnFocus : styles.textTabNotFocus}>
          Đã đặt lịch
        </TextComponent>
        <View
          style={[
            styles.numberOutline,
            {
              backgroundColor: !tabNotSet
                ? appColors.primaryDark
                : appColors.grayLight,
            },
          ]}>
          <Text style={styles.numberOnFocus}>{numberSet}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabChooseMedicationShedulingComponent;

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3EBFF',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textTabOnFocus: {
    letterSpacing: 0.5,
    color: appColors.primaryDark,
    fontWeight: '700',
  },
  textTabNotFocus: {
    letterSpacing: 0.5,
    color: appColors.grayLight,
  },
  numberOutline: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginLeft: 5,
    padding: 0,
    justifyContent: 'center',
  },
  numberOnFocus: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
