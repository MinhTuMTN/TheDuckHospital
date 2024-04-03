import {Spinner} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  DetailsMedicalBillComponent,
  FlexComponent,
  Header,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {getDetailsMedicalBill} from '../../services/bookingServices';

const DetailsMedicalBillScreen = ({route}: {route: any}) => {
  const {bookingId, bookingCode} = route.params;
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [medicalBill, setMedicalBill] = useState<any>({});

  useEffect(() => {
    const handleGetDetailsMedicalBill = async () => {
      const response = await getDetailsMedicalBill(bookingId);
      setIsLoadingAPI(false);
      if (response.success) {
        setMedicalBill(response.data.data);
      } else {
        console.log('Error: ', response.error);
      }
    };

    handleGetDetailsMedicalBill();
  }, []);
  return (
    <ContainerComponent paddingTop={0}>
      <Header title={`PK-${bookingCode}`} />
      <ContentComponent
        style={{backgroundColor: appColors.backgroundGray, paddingTop: 0}}>
        {isLoadingAPI ? (
          <FlexComponent flex={1} alignItems="center" justifyContent="center">
            <Spinner color={appColors.primary} size={'large'} />
          </FlexComponent>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <DetailsMedicalBillComponent booking={medicalBill} />
          </ScrollView>
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DetailsMedicalBillScreen;
