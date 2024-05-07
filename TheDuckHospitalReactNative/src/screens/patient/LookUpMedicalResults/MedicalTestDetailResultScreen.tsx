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
  // const source = {
  //   uri: result.medicalTest.resultFileUrl,
  //   cache: true,
  // };

  return (
    <ContainerComponent paddingTop={0}>
      <Header title={`Chi tiết kết quả xét nghiệm`} />
      <ContentComponent>
        {/* <FlexComponent
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}>
          <TextComponent uppercase>{`Kết quả ${
            result.medicalService.serviceName
          }\n(${formatDate(result.medicalTest.date)})`}</TextComponent>
        </FlexComponent>
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Bác sĩ điều trị"
          value={result.doctor.fullName}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Chuyên khoa"
          value={result.doctor.department.departmentName}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Bác sĩ xét nghiệm"
          value={result.laboratoryTechnician.fullName}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Yêu cầu thực hiện"
          value={result.medicalTest.note}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Chuẩn đoán"
          value={result.medicalTest.note}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Space paddingTop={4} />
        <LineInfoComponent
          label="Hình ảnh đính kèm"
          value={''}
          labelStyles={{
            fontSize: 15,
            color: appColors.darkGray,
            fontWeight: '500',
          }}
          valueStyles={{
            fontSize: 15,
            color: appColors.black,
          }}
        />
        <Image
          source={{
            uri: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/2/1/1299808/Parkshinhye.jpeg',
          }}
          alt="medical-test-result-image"
          style={{
            width: 90,
            height: 90,
            borderRadius: 50,
          }}
        /> */}

        <View style={styles.container}>
          <Pdf
            source={source}
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
