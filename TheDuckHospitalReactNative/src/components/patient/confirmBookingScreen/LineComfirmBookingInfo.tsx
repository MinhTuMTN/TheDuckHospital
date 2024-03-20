import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextComponent} from '../..';
import {Image} from 'react-native-svg';
import {Doctor} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';

interface LineComfirmBookingInfoProps {
  label: string;
  value: string;
  image?: any;
}
const LineComfirmBookingInfo = (props: LineComfirmBookingInfoProps) => {
  const {label, value, image} = props;
  return (
    <View style={styles.container}>
      <View style={styles.image}>{image}</View>
      <View style={styles.info}>
        <TextComponent color={appColors.grayLight} fontWeight="400">
          {label}
        </TextComponent>
        <TextComponent color={appColors.black} fontWeight="700" fontSize={18}>
          {value}
        </TextComponent>
      </View>
    </View>
  );
};

export default LineComfirmBookingInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 22,
    borderBottomColor: appColors.gray,
    borderBottomWidth: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,163,231,0.27)',
  },
  info: {
    marginLeft: 20,
    flexDirection: 'column',
  },
});
