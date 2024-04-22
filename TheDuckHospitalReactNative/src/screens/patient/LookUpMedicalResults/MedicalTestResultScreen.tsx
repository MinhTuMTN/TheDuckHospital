import React, {useMemo, useState} from 'react';
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
import {getMedicalTestResults} from '../../../services/medicalTestServices';

const MedicalTestResultScreen = ({route}: {route: any}) => {
  const [medicalTests, setMedicalTest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const profile = route.params?.profile;
  const fullName = useMemo(() => {
    const originName = profile?.fullName;
    const splitName = originName.split(' ');
    return `${splitName[splitName.length - 2]} ${
      splitName[splitName.length - 1]
    }`;
  }, [profile]);

  const handleGetMedicalTestResult = async (
    sort: 'DESC' | 'ASC',
    fromDate: dayjs.Dayjs,
    toDate: dayjs.Dayjs,
    serviceId: number,
  ) => {
    setFromDate(fromDate);
    setToDate(toDate);

    setLoading(true);
    const response = await getMedicalTestResults(profile.patientCode, {
      sort,
      fromDate: fromDate.format('YYYY/MM/DD'),
      toDate: toDate.format('YYYY/MM/DD'),
      serviceId,
    });
    setLoading(false);

    if (response.success) {
      setMedicalTest(response.data.data);
    } else {
      console.log(response);
    }
  };

  const filterOnChange = (
    sort: 'DESC' | 'ASC',
    fromDate: dayjs.Dayjs,
    toDate: dayjs.Dayjs,
    serviceId: number,
  ) => {
    console.log(sort, fromDate, toDate, serviceId);
    handleGetMedicalTestResult(sort, fromDate, toDate, serviceId);
  };

  React.useEffect(() => {
    if (medicalTests.length === 0)
      handleGetMedicalTestResult('DESC', dayjs(), dayjs(), -1);
  }, []);

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
        <GroupMedicalTestResult
          medicalTests={medicalTests}
          fromDate={fromDate}
          toDate={toDate}
          loading={loading}
        />
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
