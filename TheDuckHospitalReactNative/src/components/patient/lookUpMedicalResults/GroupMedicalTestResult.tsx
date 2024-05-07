import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';
import MedicalTestResultItem from './MedicalTestResultItem';
import Space from '../../Space';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

interface GroupMedicalTestResultProps {
  medicalTests: any;
  fromDate: dayjs.Dayjs;
  toDate: dayjs.Dayjs;
  loading: boolean;
}

const GroupMedicalTestResult = (props: GroupMedicalTestResultProps) => {
  const {medicalTests, fromDate, toDate, loading} = props;
  const navigate = useNavigation<navigationProps>();

  const _keyExtractor = useCallback(
    (item: any, index: number) => `${item.medicalTestId}-${index}`,
    [],
  );
  const _renderItem = useCallback(
    ({item}: any) => (
      <TouchableOpacity onPress={item => handleMedicalTestPress(item)}>
        <MedicalTestResultItem medicalTest={item} />
      </TouchableOpacity>
    ),
    [],
  );
  const _footerComponent = useCallback(() => {
    if (loading) {
      return (
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      );
    }
    return null;
  }, [loading]);

  const handleMedicalTestPress = (medicalTest: any) => {
    navigate.navigate('MedicalTestDetailResultScreen', {result: medicalTest});
  };

  return (
    <View style={styles.container}>
      <TextComponent bold color={appColors.textDarker} fontSize={18}>
        {/* Kết quả ngày 20/04/2024 */}
        {fromDate.format('DD/MM/YYYY') === toDate.format('DD/MM/YYYY')
          ? `Kết quả ngày ${fromDate.format('DD/MM/YYYY')}`
          : `Kết quả từ ngày ${fromDate.format(
              'DD/MM/YYYY',
            )} đến ngày ${toDate.format('DD/MM/YYYY')}`}
      </TextComponent>
      <Space paddingTop={8} />
      {/* <View style={styles.resultContainer}> */}
      {/* <MedicalTestResultItem />
        <MedicalTestResultItem /> */}
      <FlatList
        data={medicalTests}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={_footerComponent}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 5}}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  resultContainer: {
    rowGap: 8,
  },
});

export default GroupMedicalTestResult;
