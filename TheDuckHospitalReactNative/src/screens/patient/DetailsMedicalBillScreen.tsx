import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  ContentComponent,
  DetailsMedicalBillComponent,
  Header,
} from '../../components';
import {appColors} from '../../constants/appColors';

const DetailsMedicalBillScreen = () => {
  return (
    <ContainerComponent paddingTop={0}>
      <Header title="PK-A2306152305" />
      <ContentComponent
        style={{backgroundColor: appColors.backgroundGray, paddingTop: 0}}>
        <ScrollView>
          <DetailsMedicalBillComponent />
        </ScrollView>
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DetailsMedicalBillScreen;
