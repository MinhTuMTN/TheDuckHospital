import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {InputComponent, TextComponent} from '../../../components';
import DoctorInfoComponent from '../../../components/patient/chooseDoctorsScreen/DoctorInfoComponent';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Expand, ExpandInWhite, Filter} from '../../../assets/svgs';

const data = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    department: 'Khoa nội',
  },
  {
    id: '2',
    name: 'Nguyễn Văn B',
    department: 'Khoa ngoại',
  },
  {
    id: '3',
    name: 'Nguyễn Văn C',
    department: 'Khoa nhi',
  },
  {
    id: '4',
    name: 'Nguyễn Văn D',
    department: 'Khoa sản',
  },
  {
    id: '5',
    name: 'Nguyễn Văn E',
    department: 'Khoa nội',
  },
  {
    id: '6',
    name: 'Nguyễn Văn F',
    department: 'Khoa ngoại',
  },
  {
    id: '7',
    name: 'Nguyễn Văn G',
    department: 'Khoa nhi',
  },
  {
    id: '8',
    name: 'Nguyễn Văn H',
    department: 'Khoa sản',
  },
];

const LoadmoreItem = memo(() => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <ActivityIndicator size="small" color={appColors.primary} />
    </View>
  );
});

const ChooseDoctorsScreen = () => {
  const [doctors, setDoctors] = React.useState(data);
  const [initNumber, setInitNumber] = React.useState(0);
  const renderItem = useCallback(({item}: {item: any}) => {
    return <DoctorInfoComponent item={item} />;
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: number) => `doctor-${item.id}-${index}`,
    [],
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setInitNumber(5);
    }, 300);

    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mainHeader}>
          <Icon name="chevron-back" size={30} color={appColors.black} />
          <TextComponent
            fontSize={18}
            fontWeight="700"
            color={appColors.black}
            textAlign="center"
            uppercase>
            Chọn bác sĩ
          </TextComponent>
          <Filter width={30} height={30} />
        </View>
        <View style={styles.bodyHeard}>
          <InputComponent
            variant="rounded"
            placeholder="Tìm kiếm bác sĩ"
            placeholderTextColor={'#A0A0A0'}
            startIcon={<Icon name="search" size={20} color={'#A0A0A0'} />}
            _inputContainerStyle={{
              backgroundColor: 'rgba(211,211,211,0.31)',
              borderWidth: 0,
              borderRadius: 16,
            }}
          />
          <View style={styles.filter}>
            <View style={styles.box}>
              <Filter width={18} height={18} />
              <Text style={{fontSize: 14, color: appColors.black}}>Bộ lọc</Text>
            </View>
            <View
              style={[
                styles.box,
                {
                  backgroundColor: appColors.primary,
                  borderColor: appColors.primaryLight,
                },
              ]}>
              <Text style={{fontSize: 14, color: appColors.white}}>
                Họ hàm/Học vị
              </Text>
              <ExpandInWhite width={15} height={15} />
            </View>
            <View
              style={[
                styles.box,
                {
                  backgroundColor: appColors.primary,
                  borderColor: appColors.primaryLight,
                },
              ]}>
              <Text style={{fontSize: 14, color: appColors.white}}>
                Chuyên khoa
              </Text>
              <ExpandInWhite width={15} height={15} />
            </View>
          </View>
        </View>
      </View>

      {initNumber === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      )}

      <FlatList
        data={doctors}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{width: '100%'}}
        initialNumToRender={initNumber}
        onEndReached={e => {
          console.log('Load more');

          // Add LoadmoreItem to the end of the list
          // setDoctors
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F1F9FC',
  },
  header: {
    paddingTop: 30,
    marginBottom: 20,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 24,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bodyHeard: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#AAAAAA',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    flexDirection: 'row',
    gap: 8,
  },
});

export default ChooseDoctorsScreen;
