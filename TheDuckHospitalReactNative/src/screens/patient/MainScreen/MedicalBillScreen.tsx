import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  MedicalBillComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Filter} from 'lucide-react-native';
import FilterComponent from '../../../components/FilterComponent';

const MedicalBillScreen = () => {
  const [fillter, setFillter] = useState('Tất cả');
  const {t} = useTranslation();
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('medicalBill.title')}
        titleSize={19}
        showBackButton={true}
        paddingTop={35}
        noBackground
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
        backgroundColor={appColors.backgroundGray}
      />

      <FilterComponent
        items={['Tất cả', 'Đã khám', 'Chưa khám']}
        value={fillter}
        onChange={value => setFillter(value)}
      />
      <ContentComponent style={{backgroundColor: appColors.backgroundGray}}>
        <MedicalBillComponent />
        <MedicalBillComponent />
      </ContentComponent>
    </ContainerComponent>
  );
};

export default MedicalBillScreen;
