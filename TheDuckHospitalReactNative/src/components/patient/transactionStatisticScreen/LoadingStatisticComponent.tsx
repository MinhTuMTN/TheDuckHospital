import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FlexComponent from '../../FlexComponent';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
interface LoadingStatisticComponentProps {
  loading: boolean;
}
const LoadingStatisticComponent = (props: LoadingStatisticComponentProps) => {
  const {loading} = props;
  return (
    loading && (
      <View style={styles.container}>
        <FlexComponent style={styles.loading} rowGap={8}>
          <ActivityIndicator size="large" color={appColors.white} />
          <TextComponent color={appColors.white} fontSize={16}>
            Đang tải dữ liệu
          </TextComponent>
        </FlexComponent>
      </View>
    )
  );
};

export default LoadingStatisticComponent;

const styles = StyleSheet.create({
  container: {
    width: appInfo.size.width,
    height: appInfo.size.height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loading: {
    backgroundColor: '#00000080',
    padding: 32,
    paddingHorizontal: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
