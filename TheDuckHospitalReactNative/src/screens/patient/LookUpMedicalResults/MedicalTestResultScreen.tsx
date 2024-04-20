import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  Header,
} from '../../../components';
import LookupFilterComponent from '../../../components/patient/lookUpMedicalResults/LookupFilterComponent';
import {appColors} from '../../../constants/appColors';
import dayjs from 'dayjs';
import GroupMedicalTestResult from '../../../components/patient/lookUpMedicalResults/GroupMedicalTestResult';

const MedicalTestResultScreen = ({route}: {route: any}) => {
  const profile = route.params?.profile;
  const fullName = useMemo(() => {
    const originName = profile?.fullName;
    const splitName = originName.split(' ');
    return `${splitName[splitName.length - 2]} ${
      splitName[splitName.length - 1]
    }`;
  }, [profile]);

  const filterOnChange = (
    sort: 'DESC' | 'ASC',
    fromDate: dayjs.Dayjs,
    toDate: dayjs.Dayjs,
    serviceId: number,
  ) => {
    console.log(sort, fromDate, toDate, serviceId);
  };
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Kết quả xét nghiệm\n(${fullName})`}
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
        noBackground
      />
      <ContentComponent>
        <LookupFilterComponent onChange={filterOnChange} />
        <GroupMedicalTestResult />
      </ContentComponent>
    </ContainerComponent>
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
  padding: {
    paddingVertical: 8,
  },
  sperator: {
    height: '100%',
    width: 1,
    backgroundColor: '#D4D4D4',
    marginHorizontal: 8,
  },
});

export default MedicalTestResultScreen;
