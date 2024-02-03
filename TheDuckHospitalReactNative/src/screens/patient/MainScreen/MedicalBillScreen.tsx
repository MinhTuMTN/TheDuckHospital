import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {Container, Header} from '../../../components';

const MedicalBillScreen = () => {
  const {t} = useTranslation();
  return (
    <Container paddingTop={0}>
      <Header title={t('medicalBill.title')} titleSize={19} />
      <Text>MedicalBillScreen</Text>
    </Container>
  );
};

export default MedicalBillScreen;
