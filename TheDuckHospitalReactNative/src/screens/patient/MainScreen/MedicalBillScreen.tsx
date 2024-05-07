import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  MedicalBillComponent,
  NotFoundComponent,
  SelectComponent,
} from '../../../components';
import FilterComponent from '../../../components/FilterComponent';
import {appColors} from '../../../constants/appColors';
import {getAllBooking} from '../../../services/bookingServices';
import {useIsFocused} from '@react-navigation/native';
import LoginRequireComponent from '../../../components/LoginRequireComponent';
import {useSelector} from 'react-redux';
import {RootState} from '../../../types';
import {globalStyles} from '../../../styles/globalStyles';
import {appInfo} from '../../../constants/appInfo';

const MedicalBillScreen = () => {
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [fillter, setFillter] = useState('Chưa khám');
  const [patientNames, setPatientNames] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState({
    fullName: null,
    patientProfileId: null,
  });
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingToDisplay, setBookingToDisplay] = useState([]);
  const isFocused = useIsFocused();

  const {t} = useTranslation();
  const token = useSelector((state: RootState) => state.auth.token);

  const _renderItem = ({item}: any) => {
    return (
      <MedicalBillComponent
        booking={item}
        patientName={selectedPatientName.fullName || ''}
      />
    );
  };
  const _keyExtractor = (item: any, index: number) => item.bookingId;
  const _footerComponent = () => {
    if (bookingToDisplay === undefined || bookingToDisplay.length === 0) {
      return (
        <View
          style={{
            height: appInfo.size.height * 0.65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NotFoundComponent
            imageSrc={require('../../../assets/images/no-booking.png')}
            imgStyle={{
              width: 300,
              height: 300,
            }}
            desc={'Không có phiếu khám để hiển thị'}
            descStyle={{
              color: appColors.textDarker,
              fontWeight: '600',
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
            }}
          />
        </View>
      );
    }
  };

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

    if (token && isFocused) handleGetAllBooking();
  }, [token, isFocused]);

  useEffect(() => {
    setIsLoadingAPI(true);
    const temp = bookings.filter(
      (booking: any) =>
        booking.patientProfileId === selectedPatientName.patientProfileId,
    );
    var bookingToDisplayTemp = temp[0]?.bookings;
    if (fillter === 'Chưa khám') {
      bookingToDisplayTemp?.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
      });
    } else {
      bookingToDisplayTemp?.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
      });
    }

    switch (fillter) {
      case 'Tất cả':
        setBookingToDisplay(bookingToDisplayTemp);
        break;
      case 'Đã khám':
        setBookingToDisplay(
          bookingToDisplayTemp?.filter(
            (booking: any) => booking.status && !booking.cancelled,
          ),
        );
        break;
      case 'Chưa khám':
        setBookingToDisplay(
          bookingToDisplayTemp?.filter(
            (booking: any) => !booking.status && !booking.cancelled,
          ),
        );
        break;
      case 'Bị hủy':
        setBookingToDisplay(
          bookingToDisplayTemp?.filter((booking: any) => booking.cancelled),
        );
        break;
    }
    setIsLoadingAPI(false);
  }, [fillter, selectedPatientName, bookings]);

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
          items={['Chưa khám', 'Tất cả', 'Đã khám', 'Bị hủy']}
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
              ListFooterComponent={_footerComponent}
            />
          )}
        </ContentComponent>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

export default MedicalBillScreen;
