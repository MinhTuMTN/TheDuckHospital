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

const ChooseDateScreen = () => {
  const [isRenderingUI, setIsRenderingUI] = React.useState(true);
  const [month, setMonth] = React.useState({
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const today = dayjs();
  const availableDates = [
    '07/03/2024',
    '08/03/2024',
    '14/03/2024',
    '15/03/2024',
    '21/03/2024',
    '22/03/2024',
    '28/03/2024',
    '29/03/2024',
  ];
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
              console.log(e.date?.dateString);
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
    [],
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
        Tháng {month.month} - {month.year}
      </TextComponent>
    ),
    [month],
  );

  useEffect(() => {
    setIsRenderingUI(false);
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ContainerComponent paddingTop={0}>
        <Header
          title="Chọn ngày khám"
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
                Vui lòng chọn ngày khám phù hợp với lịch trình của bạn. Chúng
                tôi hỗ trợ đặt lịch khám trước từ{' '}
                <TextComponent bold>1 đến 30 ngày</TextComponent>.
              </TextComponent>
            </View>

            <Space paddingTop={32} />

            <View style={styles.noteContainer}>
              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View style={[styles.square]} />
                <TextComponent>Hôm nay</TextComponent>
              </FlexComponent>

              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View
                  style={[styles.square, {backgroundColor: appColors.gray}]}
                />
                <TextComponent>Kín lịch</TextComponent>
              </FlexComponent>

              <FlexComponent direction="row" alignItems="center" columnGap={4}>
                <View
                  style={[
                    styles.square,
                    {backgroundColor: appColors.lightPrimary},
                  ]}
                />
                <TextComponent>Còn trống</TextComponent>
              </FlexComponent>
            </View>

            <Space paddingTop={32} />
            <Calendar
              dayComponent={_dayComponent}
              enableSwipeMonths={true}
              onMonthChange={_onMonthChange}
              customHeaderTitle={_customHeaderTitle}
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
                Chọn giờ khám
              </TextComponent>
              <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
                <TextComponent color={appColors.error} bold>
                  Huỷ
                </TextComponent>
              </Pressable>
            </FlexComponent>

            <Space paddingTop={8} />

            <ScrollView>
              <TextComponent color={appColors.textDarker} bold>
                Ngày 17 tháng 3 năm 2024
              </TextComponent>

              <Space paddingTop={16} />
              <View style={[styles.noteContainer, {width: '60%'}]}>
                <FlexComponent
                  direction="row"
                  alignItems="center"
                  columnGap={4}>
                  <View style={[styles.square]} />
                  <TextComponent>Còn trống</TextComponent>
                </FlexComponent>

                <FlexComponent
                  direction="row"
                  alignItems="center"
                  columnGap={4}>
                  <View style={[styles.square, {backgroundColor: '#8b8b8b'}]} />
                  <TextComponent>Kín lịch</TextComponent>
                </FlexComponent>
              </View>

              <Space paddingTop={16} />
              <View>
                <TextComponent
                  bold
                  fontSize={15}
                  color={appColors.textDescription}>
                  Buổi sáng
                </TextComponent>
                <Space paddingTop={8} />
                <FlexComponent
                  direction="row"
                  style={{
                    flexWrap: 'wrap',
                    rowGap: 8,
                  }}>
                  <View style={styles.timeSlot}>
                    <TextComponent bold color={appColors.primary}>
                      8:00 - 9:00
                    </TextComponent>
                  </View>
                  <View style={[styles.timeSlot, styles.timeSlotDisabled]}>
                    <TextComponent bold color={appColors.textDescription}>
                      9:00 - 10:00
                    </TextComponent>
                  </View>
                  <View style={styles.timeSlot}>
                    <TextComponent bold color={appColors.primary}>
                      10:00 - 11:00
                    </TextComponent>
                  </View>
                  <View style={styles.timeSlot}>
                    <TextComponent bold color={appColors.primary}>
                      11:00 - 12:00
                    </TextComponent>
                  </View>
                </FlexComponent>
              </View>

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
                  <View style={styles.timeSlot}>
                    <TextComponent bold color={appColors.primary}>
                      13:00 - 14:00
                    </TextComponent>
                  </View>
                  <View style={[styles.timeSlot, styles.timeSlotDisabled]}>
                    <TextComponent bold color={appColors.textDescription}>
                      15:00 - 16:00
                    </TextComponent>
                  </View>
                  <View style={styles.timeSlot}>
                    <TextComponent bold color={appColors.primary}>
                      16:00 - 17:00
                    </TextComponent>
                  </View>
                </FlexComponent>
              </View>
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
    paddingHorizontal: 12,
    backgroundColor: appColors.lightPrimary,
    paddingVertical: 16,
    overflow: 'hidden',
    borderRadius: 10,
    columnGap: 8,
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
