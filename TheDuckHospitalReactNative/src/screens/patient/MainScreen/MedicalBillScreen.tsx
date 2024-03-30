import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  MedicalBillComponent,
  SelectComponent,
} from '../../../components';
import FilterComponent from '../../../components/FilterComponent';
import {appColors} from '../../../constants/appColors';
import {getAllBooking} from '../../../services/bookingServices';
import {useAuth} from '../../../hooks/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import LoginRequireComponent from '../../../components/LoginRequireComponent';

const MedicalBillScreen = () => {
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [fillter, setFillter] = useState('Tất cả');
  const [patientNames, setPatientNames] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState({
    fullName: null,
    patientProfileId: null,
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingToDisplay, setBookingToDisplay] = useState([]);
  const isFocused = useIsFocused();

  const {t} = useTranslation();
  const auth = useAuth();

  const _renderItem = ({item}: any) => {
    return (
      <MedicalBillComponent
        booking={item}
        patientName={selectedPatientName.fullName || ''}
      />
    );
  };
  const _keyExtractor = (item: any, index: number) => item.bookingId;

  useEffect(() => {
    const handleGetAllBooking = async () => {
      setIsLoadingAPI(true);
      const response = await getAllBooking();
      setIsLoadingAPI(false);

      if (response.success) {
        let bookingsTemp = response.data.data;
        setBookings(bookingsTemp);

        let bookingToDisplayTemp = bookingsTemp[0]?.bookings;
        bookingToDisplayTemp?.sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          return dateB.getTime() - dateA.getTime();
        });
        setBookingToDisplay(bookingToDisplayTemp);

        let patientNamesTemp = bookingsTemp.map((booking: any) => {
          const item = {
            fullName: booking.fullName,
            patientProfileId: booking.patientProfileId,
          };

          return item;
        });
        setPatientNames(patientNamesTemp);
        setSelectedPatientName({
          fullName: patientNamesTemp[0]?.fullName,
          patientProfileId: patientNamesTemp[0]?.patientProfileId,
        });
      } else {
        console.log('Error: ', response.error);
      }
    };

    if (auth.token && isFocused) handleGetAllBooking();
  }, [auth.token, isFocused]);

  useEffect(() => {
    setIsLoadingAPI(true);
    switch (fillter) {
      case 'Tất cả':
        setBookingToDisplay(bookings[0]?.bookings);
        break;
      case 'Đã khám':
        setBookingToDisplay(
          bookings[0]?.bookings.filter((booking: any) => booking.status),
        );
        break;
      case 'Chưa khám':
        setBookingToDisplay(
          bookings[0]?.bookings.filter((booking: any) => !booking.status),
        );
        break;
    }
    setIsLoadingAPI(false);
  }, [fillter]);

  useEffect(() => {
    const temp = bookings.filter(
      (booking: any) =>
        booking.patientProfileId === selectedPatientName.patientProfileId,
    );
    let bookingToDisplayTemp = temp[0]?.bookings;
    bookingToDisplayTemp?.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    });
    setBookingToDisplay(bookingToDisplayTemp);
  }, [selectedPatientName]);
  return (
    <LoginRequireComponent>
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

        <FlexComponent
          direction="row"
          style={{
            width: '100%',
            paddingHorizontal: 16,
            backgroundColor: appColors.backgroundGray,
          }}>
          <SelectComponent
            flex={1}
            options={patientNames}
            keyTitle="fullName"
            value={selectedPatientName}
            selectTextColor={appColors.textDarker}
            title="Chọn hồ sơ bệnh nhân"
            placeholder="Chọn hồ sơ bệnh nhân"
            onChange={value => {
              setSelectedPatientName(value);
            }}
          />
        </FlexComponent>

        <FilterComponent
          items={['Tất cả', 'Đã khám', 'Chưa khám']}
          value={fillter}
          onChange={value => setFillter(value)}
        />
        <ContentComponent style={{backgroundColor: appColors.backgroundGray}}>
          {isLoadingAPI ? (
            <FlexComponent flex={1} alignItems="center" justifyContent="center">
              <ActivityIndicator size="large" color={appColors.primary} />
            </FlexComponent>
          ) : (
            <FlatList
              data={bookingToDisplay}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
            />
          )}
        </ContentComponent>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

export default MedicalBillScreen;
