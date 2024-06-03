import {Info} from 'lucide-react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  Space,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Calendar, DateData} from 'react-native-calendars';
import {DayProps} from 'react-native-calendars/src/calendar/day';
import dayjs from 'dayjs';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {appInfo} from '../../../constants/appInfo';
import {getTimeSlotById} from '../../../utils/timeSlotUtils';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {useTranslation} from 'react-i18next';

const ChooseDateScreen = ({route}: {route: any}) => {
  const {selectedDoctor, timeSlots} = route.params;

  const [availableDates, setAvailableDates] = React.useState<string[]>([]);
  const [selectedDay, setSelectedDay] = React.useState<dayjs.Dayjs>(dayjs());
  const {t, i18n} = useTranslation();
  const [selectedDoctorSchedule, setSelectedDoctorSchedule] =
    React.useState<any[]>();

  const [isRenderingUI, setIsRenderingUI] = React.useState(true);
  const [month, setMonth] = React.useState({
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const today = dayjs();
  const navigation = useNavigation<navigationProps>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const _dayComponent = useCallback(
    (
      e: DayProps & {
        date?: DateData | undefined;
      },
    ) => {
      const date = dayjs(e.date?.dateString as string);
      const available: boolean =
        date > today &&
        availableDates.indexOf(date.format('DD/MM/YYYY')) !== -1;
      return (
        <Pressable
          onPress={() => {
            if (available) {
              setSelectedDay(dayjs(e.date?.dateString as string));
              setSelectedDoctorSchedule(
                selectedDoctor?.doctorSchedules.filter(
                  (ds: any) =>
                    dayjs(ds.date).format('DD/MM/YYYY') ===
                    date.format('DD/MM/YYYY'),
                ),
              );
              bottomSheetModalRef.current?.present();
            } else {
              console.log('Không thể chọn ngày này');
            }
          }}
          style={{
            backgroundColor:
              e.date?.dateString === today.format('YYYY-MM-DD')
                ? appColors.primary
                : available
                ? appColors.lightPrimary
                : e.state === 'disabled'
                ? appColors.white
                : appColors.gray,
            width: 40,
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: -4,
          }}>
          <TextComponent
            style={{
              textAlign: 'center',
              color:
                e.date?.dateString === today.format('YYYY-MM-DD')
                  ? appColors.white
                  : e.state === 'disabled'
                  ? appColors.textGray
                  : appColors.black,
            }}>
            {e.date?.day}
          </TextComponent>
        </Pressable>
      );
    },
    [availableDates, today],
  );
  const _onMonthChange = useCallback((month: DateData) => {
    setMonth({
      month: month.month,
      year: month.year,
    });
  }, []);
  const _customHeaderTitle = useMemo(
    () => (
      <TextComponent bold>
        {i18n.language === 'vi'
          ? `Tháng ${month.month}`
          : dayjs(`2000/${month.month}/01`).format('MMMM')}{' '}
        - {month.year}
      </TextComponent>
    ),
    [month],
  );

  const handleNavigateConfirmBooking = (timeSlot: any) => {
    navigation.navigate('ConfirmBookingInformationScreen', {
      timeSlots: [
        ...(timeSlots || []),
        {
          doctorName: `${selectedDoctor?.degree} ${selectedDoctor?.doctorName}`,
          departmentName: selectedDoctor?.department?.departmentName,
          selectedDay: selectedDay.format('DD/MM/YYYY'),
          timeSlot: timeSlot,
          price: selectedDoctor?.price,
        },
      ],
    });
  };

  useEffect(() => {
    setIsRenderingUI(false);
  }, []);

  useEffect(() => {
    const doctorSchedules = selectedDoctor?.doctorSchedules;
    if (doctorSchedules && timeSlots?.length > 0) {
      const selectedDate = dayjs(timeSlots[0]?.timeSlot?.date).format(
        'DD/MM/YYYY',
      );
      const available = doctorSchedules.some(
        (schedule: any) =>
          dayjs(schedule.date).format('DD/MM/YYYY') === selectedDate,
      );

      available ? setAvailableDates([selectedDate]) : setAvailableDates([]);
      return;
    } else {
      const dates = doctorSchedules.map((schedule: any) =>
        dayjs(schedule.date).format('DD/MM/YYYY'),
      );

      setAvailableDates(dates);
    }
  }, [selectedDoctor?.doctorSchedules]);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title={t('chooseDate.title')}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
        />

        {isRenderingUI ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={appColors.primary} />
          </View>
        ) : (
          <ContentComponent>
            <View style={styles.infoContainer}>
              <Info size={25} color={appColors.primary} />
              <TextComponent flex={1} textAlign="justify">
                {t('chooseDate.note')}{' '}
                <TextComponent bold>{t('chooseDate.noteDate')}</TextComponent>.
              </TextComponent>
            </View>

            <Space paddingTop={32} />

            <View style={styles.noteContainer}>
              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View style={[styles.square]} />
                <TextComponent>{t('chooseDate.toDay')}</TextComponent>
              </FlexComponent>

              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View
                  style={[styles.square, {backgroundColor: appColors.gray}]}
                />
                <TextComponent>{t('chooseDate.outOfSlot')}</TextComponent>
              </FlexComponent>

              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View
                  style={[
                    styles.square,
                    {backgroundColor: appColors.lightPrimary},
                  ]}
                />
                <TextComponent>{t('chooseDate.freeSlot')}</TextComponent>
              </FlexComponent>
            </View>

            <Space paddingTop={32} />
            <Calendar
              dayComponent={_dayComponent}
              enableSwipeMonths={true}
              onMonthChange={_onMonthChange}
              customHeaderTitle={_customHeaderTitle}
              firstDay={1}
            />
          </ContentComponent>
        )}
      </ContainerComponent>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['45%']}
          backdropComponent={() => (
            <Pressable
              style={{
                backgroundColor: 'rgba(0,0,0,.5)',
                flex: 1,
                marginTop: appInfo.size.height * -1,
              }}
              onPress={() => bottomSheetModalRef.current?.close()}
            />
          )}>
          <FlexComponent
            style={{
              flex: 1,
              paddingHorizontal: 12,
              paddingBottom: 16,
            }}>
            <FlexComponent
              direction="row"
              justifyContent="space-between"
              style={{
                borderBottomWidth: 3,
                paddingBottom: 8,
                borderColor: appColors.gray,
              }}
              width={'100%'}>
              <TextComponent bold color={appColors.textGray} fontSize={18}>
                {t('chooseDate.chooseTime')}
              </TextComponent>
              <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
                <TextComponent color={appColors.error} bold>
                  {t('chooseDate.close')}
                </TextComponent>
              </Pressable>
            </FlexComponent>

            <Space paddingTop={8} />

            <ScrollView>
              <TextComponent color={appColors.textDarker} bold>
                {i18n.language === 'vi'
                  ? `Ngày ${selectedDay.get('D')} tháng ${
                      selectedDay.get('M') + 1
                    } năm ${selectedDay.get('year')}`
                  : `${selectedDay.format('MMMM')} ${selectedDay.get(
                      'D',
                    )}, ${selectedDay.get('year')}`}
              </TextComponent>

              <Space paddingTop={16} />
              <View style={[styles.noteContainer, {width: '60%'}]}>
                <FlexComponent
                  direction="row"
                  alignItems="center"
                  columnGap={4}>
                  <View style={[styles.square]} />
                  <TextComponent>{t('chooseDate.freeSlot')}</TextComponent>
                </FlexComponent>

                <FlexComponent
                  direction="row"
                  alignItems="center"
                  columnGap={4}>
                  <View style={[styles.square, {backgroundColor: '#8b8b8b'}]} />
                  <TextComponent>{t('chooseDate.outOfSlot')}</TextComponent>
                </FlexComponent>
              </View>

              {selectedDoctorSchedule?.some(
                ds => ds.scheduleSession === 'MORNING',
              ) && (
                <>
                  <Space paddingTop={16} />
                  <View>
                    <TextComponent
                      bold
                      fontSize={15}
                      color={appColors.textDescription}>
                      {t('chooseDate.morning')}
                    </TextComponent>
                    <Space paddingTop={8} />
                    <FlexComponent
                      direction="row"
                      style={{
                        flexWrap: 'wrap',
                        rowGap: 8,
                      }}>
                      {selectedDoctorSchedule
                        ?.find(ds => ds.scheduleSession === 'MORNING')
                        ?.timeSlots.map((timeSlot: any, index: number) => (
                          <Pressable
                            onPress={
                              timeSlot.currentSlot < timeSlot.maxSlot
                                ? () => handleNavigateConfirmBooking(timeSlot)
                                : () => {}
                            }
                            key={timeSlot.timeSlotId}
                            style={[
                              styles.timeSlot,
                              timeSlot.currentSlot >= timeSlot.maxSlot &&
                                styles.timeSlotDisabled,
                            ]}>
                            <TextComponent
                              bold
                              color={
                                timeSlot.currentSlot >= timeSlot.maxSlot
                                  ? appColors.textDescription
                                  : appColors.primary
                              }>
                              {getTimeSlotById(timeSlot?.timeId)}
                            </TextComponent>
                          </Pressable>
                        ))}
                    </FlexComponent>
                  </View>
                </>
              )}

              {selectedDoctorSchedule?.some(
                ds => ds.scheduleSession === 'AFTERNOON',
              ) && (
                <>
                  <Space paddingTop={16} />
                  <View>
                    <TextComponent
                      bold
                      fontSize={15}
                      color={appColors.textDescription}>
                      Buổi chiều
                    </TextComponent>
                    <Space paddingTop={8} />
                    <FlexComponent
                      direction="row"
                      style={{
                        flexWrap: 'wrap',
                        rowGap: 8,
                      }}>
                      {selectedDoctorSchedule
                        ?.find(ds => ds.scheduleSession === 'AFTERNOON')
                        ?.timeSlots.map((timeSlot: any, index: number) => (
                          <Pressable
                            key={timeSlot.timeSlotId}
                            onPress={
                              timeSlot.currentSlot < timeSlot.maxSlot
                                ? () => handleNavigateConfirmBooking(timeSlot)
                                : () => {}
                            }
                            style={[
                              styles.timeSlot,
                              timeSlot.currentSlot >= timeSlot.maxSlot &&
                                styles.timeSlotDisabled,
                            ]}>
                            <TextComponent
                              bold
                              color={
                                timeSlot.currentSlot >= timeSlot.maxSlot
                                  ? appColors.textDescription
                                  : appColors.primary
                              }>
                              {getTimeSlotById(timeSlot?.timeId)}
                            </TextComponent>
                          </Pressable>
                        ))}
                    </FlexComponent>
                  </View>
                </>
              )}
            </ScrollView>
          </FlexComponent>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: appColors.lightPrimary,
    paddingVertical: 16,
    overflow: 'hidden',
    borderRadius: 10,
    columnGap: 10,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  square: {
    width: 35,
    height: 35,
    backgroundColor: appColors.primary,
    borderRadius: 5,
  },
  timeSlot: {
    borderColor: appColors.primary,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 10,
    flexBasis: '47%',
    alignItems: 'center',
  },
  timeSlotDisabled: {
    borderColor: appColors.textDescription,
  },
});

export default ChooseDateScreen;
