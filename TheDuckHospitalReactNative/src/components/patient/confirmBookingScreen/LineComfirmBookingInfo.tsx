import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextComponent} from '../..';
import {Image} from 'react-native-svg';
import {Doctor} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';

interface LineComfirmBookingInfoProps {
  label: string;
  value: string;
  isDepartment?: boolean;
  image?: any;
}
const LineComfirmBookingInfo = (props: LineComfirmBookingInfoProps) => {
  const {label, value, image, isDepartment} = props;
  return (
    <View style={styles.container}>
      <View style={styles.image}>{image}</View>
      <View style={styles.info}>
        <View
          style={{
            width: 115,
          }}>
          <TextComponent fontSize={14} color={appColors.black} fontWeight="500">
            {label}
          </TextComponent>
        </View>
        {isDepartment ? (
          <TextComponent
            flex={1}
            numberOfLines={1}
            color={appColors.primaryDark}
            fontSize={14}
            fontWeight="700"
            uppercase
            ellipsizeMode="middle">
            {value}
          </TextComponent>
        ) : (
          <TextComponent fontSize={14} color={appColors.black} fontWeight="500">
            {value}
          </TextComponent>
        )}
      </View>
    </View>
  );
};

export default LineComfirmBookingInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  image: {
    height: 22,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
});
