import React, {useMemo, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import LookupFilterComponent from '../../../components/patient/lookUpMedicalResults/LookupFilterComponent';
import {appColors} from '../../../constants/appColors';
import dayjs from 'dayjs';
import GroupMedicalTestResult from '../../../components/patient/lookUpMedicalResults/GroupMedicalTestResult';
import {getMedicalTestResults} from '../../../services/medicalTestServices';
import {formatDate} from '../../../utils/dateUtils';
import LineInfoComponent from '../../../components/LineInfoComponent';
import {appInfo} from '../../../constants/appInfo';
import Pdf from 'react-native-pdf';

const MedicalTestDetailResultScreen = ({route}: {route: any}) => {
  const [medicalTests, setMedicalTest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs());
  const result = route.params?.result;
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
  };

  return (
    <ContainerComponent paddingTop={0}>
      <Header title={`Chi tiết kết quả xét nghiệm`} />
      <ContentComponent>
        <View style={styles.container}>
          <Pdf
            source={result}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
            trustAllCerts={Platform.OS === 'ios'}
          />
        </View>
      </ContentComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  pdf: {
    flex: 1,
    width: appInfo.size.width,
    height: appInfo.size.height,
  },
});

export default MedicalTestDetailResultScreen;
