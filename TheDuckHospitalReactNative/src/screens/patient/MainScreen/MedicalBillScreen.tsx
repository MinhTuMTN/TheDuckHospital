import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {ContainerComponent, Header} from '../../../components';

const MedicalBillScreen = () => {
  const {t} = useTranslation();
  return (
    <ContainerComponent paddingTop={0}>
      <Header title={t('medicalBill.title')} titleSize={19} />
      <Text>MedicalBillScreen</Text>
    </ContainerComponent>
  );
};

export default MedicalBillScreen;
