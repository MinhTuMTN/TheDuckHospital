import React from 'react';
import {StyleSheet, View} from 'react-native';
import FlexComponent from '../../FlexComponent';
import ChooseDateFilterComponent from './ChooseDateFilterComponent';
import SortFilterComponent from './SortFilterComponent';
import TestTypeFilterComponent from './TestTypeFilterComponent';
import dayjs from 'dayjs';

interface LookupFilterComponentProps {
  onChange?: (
    sort: 'DESC' | 'ASC',
    fromDate: dayjs.Dayjs,
    toDate: dayjs.Dayjs,
    serviceId: number,
  ) => void;
}

const LookupFilterComponent = (props: LookupFilterComponentProps) => {
  const {onChange} = props;
  const [sort, setSort] = React.useState<'DESC' | 'ASC'>('DESC');
  const [fromDate, setFromDate] = React.useState<dayjs.Dayjs>(dayjs());
  const [toDate, setToDate] = React.useState<dayjs.Dayjs>(dayjs());
  const [serviceId, setServiceId] = React.useState<number>(-1);
  return (
    <>
      <View style={styles.filterContainer}>
        <FlexComponent direction="row">
          <SortFilterComponent
            onChange={(sort: 'DESC' | 'ASC') => {
              onChange && onChange(sort, fromDate, toDate, serviceId);
              setSort(sort);
            }}
          />
          <ChooseDateFilterComponent
            onChange={(fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs) => {
              onChange && onChange(sort, fromDate, toDate, serviceId);
              setFromDate(fromDate);
              setToDate(toDate);
            }}
          />
        </FlexComponent>
        <FlexComponent direction="row">
          <TestTypeFilterComponent
            onChange={(serviceId: number) => {
              onChange && onChange(sort, fromDate, toDate, serviceId);
              setServiceId(serviceId);
            }}
          />
        </FlexComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    elevation: 4,
    flexDirection: 'column',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

export default LookupFilterComponent;
