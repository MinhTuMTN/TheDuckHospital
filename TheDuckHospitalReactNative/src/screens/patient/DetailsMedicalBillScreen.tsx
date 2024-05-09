import {Spinner} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {LogBox, ScrollView, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  DetailsMedicalBillComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../components';
import RequestRefundBookingComponent from '../../components/patient/detailsMedicalBillScreen/RequestRefundBookingComponent';
import {appColors} from '../../constants/appColors';
import {getDetailsMedicalBill} from '../../services/bookingServices';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../types';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import dayjs from 'dayjs';

const DetailsMedicalBillScreen = ({route}: {route: any}) => {
  const {bookingId, bookingCode} = route.params;
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [medicalBill, setMedicalBill] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation<navigationProps>();

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
  }, [refresh]);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

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
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {medicalBill.cancelled && (
                <RequestRefundBookingComponent booking={medicalBill} />
              )}
              {medicalBill.status && (
                <View style={{paddingTop: 10}}>
                  <FlexComponent
                    style={{
                      backgroundColor: '#d3eef9',
                      padding: 8,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FlexComponent flex={8}>
                      <TextComponent bold fontSize={18} textAlign="justify">
                        Phiếu khám đã hoàn tất
                      </TextComponent>
                      <TextComponent textAlign="justify">
                        Để nâng cao chất lượng dịch vụ, bạn vui lòng thực hiện
                        đánh giá phiên khám bệnh này{' '}
                        <TextComponent bold italic>
                          trong 7 ngày
                        </TextComponent>{' '}
                        kể từ ngày khám.
                      </TextComponent>
                      <TextComponent textAlign="justify" italic>
                        TheDuckHospital xin chân thành cảm ơn.
                      </TextComponent>
                    </FlexComponent>
                    <FlexComponent flex={2} alignItems="center">
                      <EvilIcons
                        name="like"
                        size={85}
                        color={appColors.black}
                      />
                    </FlexComponent>
                  </FlexComponent>
                </View>
              )}
              <DetailsMedicalBillComponent booking={medicalBill} />
            </ScrollView>
            {medicalBill.status &&
              dayjs().isBefore(dayjs(medicalBill.date).add(7, 'day')) && (
                <ButtonComponent
                  containerStyles={{marginBottom: 20}}
                  backgroundColor={appColors.primaryDark}
                  borderRadius={10}
                  onPress={() => {
                    navigation.navigate('RatingScreen', {
                      medicalBill,
                      onGoBack: () => setRefresh(!refresh),
                    });
                  }}
                  textStyles={{
                    textTransform: 'uppercase',
                    fontWeight: '700',
                  }}>
                  {medicalBill.rating.rated
                    ? `Xem lại đánh giá`
                    : `Đánh giá phiên khám`}
                </ButtonComponent>
              )}
          </>
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DetailsMedicalBillScreen;
