import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextComponent} from '../..';
import {Calendar, CashInHand, Gender, Stethoscope} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';
import {navigationProps} from '../../../types';
import {formatCurrency} from '../../../utils/currencyUtils';
import LineInfoComponent from '../../LineInfoComponent';
import {useTranslation} from 'react-i18next';
import {BadgeInfo, Info, Star} from 'lucide-react-native';
import dayjs from 'dayjs';

interface DoctorInfoComponentProps {
  item: any;
  timeSlots: any;
}

const DoctorInfoComponent = (props: DoctorInfoComponentProps) => {
  const {item} = props;

  const {t} = useTranslation();
  const [dayOfWeek, setDayOfWeek] = React.useState('');
  const navigation = useNavigation<navigationProps>();

  const navigateToChooseDateScreen = () => {
    navigation.navigate('ChooseDateScreen', {
      selectedDoctor: item,
      timeSlots: props.timeSlots,
    });
  };

  useEffect(() => {
    const doctorSchedules = item.doctorSchedules;

    let dayOfWeeks: number[] = [];
    doctorSchedules.forEach((schedule: any) => {
      const dayOfWeek = dayjs(schedule.date).day() + 1;
      if (dayOfWeeks.indexOf(dayOfWeek) === -1) {
        dayOfWeeks.push(dayOfWeek);
      }
    });
    dayOfWeeks.sort();

    let dayOfWeekString = '';
    dayOfWeeks.forEach((day: number, index: number) => {
      if (index === dayOfWeeks.length - 1) {
        dayOfWeekString += day === 1 ? 'Chủ nhật' : `Thứ ${day}`;
      } else {
        dayOfWeekString += day === 1 ? 'Chủ nhật, ' : `Thứ ${day}, `;
      }
    });
    setDayOfWeek(dayOfWeekString);
  }, [item]);
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={navigateToChooseDateScreen}>
        <Image
          // source={require('../../../assets/images/avatarDoctor.jpg')}
          source={{
            uri:
              item.avatar ||
              'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/2/1/1299808/Parkshinhye.jpeg',
          }}
          alt="Logo"
          style={{
            width: 90,
            height: 90,
            borderRadius: 50,
          }}
        />
        <View style={styles.textView}>
          <TextComponent
            uppercase
            flexWrap="wrap"
            fontWeight="700"
            textAlign="justify"
            numberOfLines={1}
            ellipsizeMode="head"
            fontSize={15}>
            <TextComponent fontWeight="700" fontSize={15}>
              {item.degree}.
            </TextComponent>{' '}
            {item.doctorName}
          </TextComponent>
          <LineInfoComponent
            startIcon={
              <Stethoscope width={20} height={20} style={{marginRight: 8}} />
            }
            label={t('chooseDoctorForBooking.department')}
            labelColor={'#8F8F8F'}
            value={item.department?.departmentName}
            valueColor={'#4F4F4F'}
            flexLabel={2}
            flexValue={3}
            valueStyles={{
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: 13,
            }}
          />
          <LineInfoComponent
            startIcon={
              <Calendar width={20} height={20} style={{marginRight: 8}} />
            }
            label={t('chooseDoctorForBooking.date')}
            labelColor={'#8F8F8F'}
            value={dayOfWeek}
            valueColor={'#4F4F4F'}
            flexLabel={2}
            flexValue={3}
          />
          <LineInfoComponent
            startIcon={
              <Gender width={20} height={20} style={{marginRight: 8}} />
            }
            label={t('chooseDoctorForBooking.gender')}
            labelColor={'#8F8F8F'}
            value={item.gender == 'MALE' ? 'Nam' : 'Nữ'}
            valueColor={'#4F4F4F'}
            flexLabel={2}
            flexValue={3}
          />
          <LineInfoComponent
            startIcon={
              <Star
                size={20}
                color={appColors.black}
                style={{marginRight: 8}}
              />
            }
            label={t('chooseDoctorForBooking.rating')}
            labelColor={'#8F8F8F'}
            value={`${item.rating}/5 (${item.totalRating})`}
            valueColor={'#4F4F4F'}
            flexLabel={2}
            flexValue={3}
          />
          <LineInfoComponent
            startIcon={
              <CashInHand width={20} height={20} style={{marginRight: 8}} />
            }
            label={t('chooseDoctorForBooking.fee')}
            labelColor={'#8F8F8F'}
            value={formatCurrency(item.price) + ' đ'}
            valueColor={'#00A3E7'}
            valueStyles={{fontWeight: '500', fontSize: 13}}
            flexLabel={2}
            flexValue={3}
          />
        </View>

        <View style={styles.nextPage}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DoctorInformationScreen', {
                doctor: item,
                dayOfWeek,
              });
            }}>
            <BadgeInfo size={30} color={appColors.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    borderRadius: 10,
    elevation: 16,
    marginBottom: 16,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    rowGap: 4,
  },
  nextPage: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: 16,
    right: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: appColors.primary,
    borderWidth: 1,
    top: 8,
    right: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(DoctorInfoComponent);
