import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  Header,
} from '../../../components';
import {appInfo} from '../../../constants/appInfo';
import Pdf from 'react-native-pdf';

const MedicalTestDetailResultScreen = ({route}: {route: any}) => {
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
