import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {
  InputComponent,
  NotFoundComponent,
  SelectComponent,
  TextComponent,
} from '../../../components';
import DoctorInfoComponent from '../../../components/patient/chooseDoctorsScreen/DoctorInfoComponent';
import {StyleSheet} from 'react-native';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Expand, ExpandInWhite, Filter} from '../../../assets/svgs';
import {
  getAllDepartment,
  getAllDoctor,
} from '../../../services/bookingServices';
import {searchDoctor} from '../../../services/dotorSevices';
import {set} from '@gluestack-style/react';

const data = [
  {
    id: 'BS',
    degree: 'Bác sĩ',
  },
  {
    id: 'ThS',
    degree: 'Thạc sĩ',
  },
  {
    id: 'TS',
    degree: 'Tiến sĩ',
  },
  {
    id: 'PGS',
    degree: 'Phó giáo sư',
  },
  {
    id: 'GS',
    degree: 'Giáo sư',
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
  const [doctors, setDoctors] = React.useState([]);
  const [initNumber, setInitNumber] = React.useState(0);
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState<any>(null);
  const [selectedDegree, setSelectedDegree] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState('');
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);

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

  useEffect(() => {
    const handleGetAllDoctor = async () => {
      const respone = await getAllDoctor(2, 1);

      if (respone.success) {
        setDoctors(respone.data.data.items);
      } else {
        console.log('Error: ', respone.error);
      }
    };
    handleGetAllDoctor();
  }, []);

  useEffect(() => {
    const handleGetAllDepartment = async () => {
      const response = await getAllDepartment();
      if (response.success) {
        setDepartments(response.data.data);
      } else {
        console.log('Error: ', response.error);
      }
    };

    handleGetAllDepartment();
  }, []);

  useEffect(() => {
    const handleSearchDoctor = async () => {
      setIsLoadingAPI(true);
      const response = await searchDoctor(
        searchText,
        selectedDepartment?.departmentId,
        selectedDegree?.id,
      );
      setIsLoadingAPI(false);

      if (response.success) {
        setDoctors(response.data.data.items);
      } else {
        console.log('Error: ', response.error);
      }
    };

    handleSearchDoctor();
  }, [searchText, selectedDepartment, selectedDegree]);

  const handleChangedText = (text: string) => {
    setSearchText(text);
  };

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
            value={searchText}
            onChangeText={handleChangedText}
          />

          <View style={styles.filter}>
            <View style={styles.box}>
              <Filter width={18} height={18} />
              <Text style={{fontSize: 14, color: appColors.black}}>Bộ lọc</Text>
            </View>
            <SelectComponent
              options={data}
              keyTitle="degree"
              value={selectedDegree}
              size="md"
              onChange={selectedDegree => {
                setSelectedDegree(selectedDegree);
                console.log('Selected degree: ', selectedDegree);
              }}
              selectInputStyle={{
                backgroundColor: appColors.primary,
                paddingHorizontal: 8,
              }}
              marginRight={8}
              selectIconColor={appColors.white}
              selectTextColor={appColors.white}
              title="Họ hàm/Học vị"
              placeholder="Học hàm/vị"
              placeholderColor={appColors.white}
              selectTextSize={14}
            />
            <SelectComponent
              options={departments}
              keyTitle="departmentName"
              value={selectedDepartment}
              size="md"
              onChange={selectedDepartment => {
                setSelectedDepartment(selectedDepartment);
              }}
              selectInputStyle={{
                backgroundColor: appColors.primary,
                paddingHorizontal: 8,
              }}
              padding={0}
              width={150}
              flex={undefined}
              selectIconColor={appColors.white}
              selectTextColor={appColors.white}
              title="Chuyên khoa"
              placeholder="Chuyên khoa"
              placeholderSearch="Tìm kiếm chuyên khoa"
              enableSearch
              placeholderColor={appColors.white}
              selectTextSize={14}
            />
          </View>
        </View>
      </View>

      {initNumber === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      )}

      {isLoadingAPI ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      ) : doctors.length > 0 ? (
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
      ) : (
        <NotFoundComponent
          imageSrc={require('../../../assets/images/animal.png')}
          desc="Không tìm thấy kết quả phù hợp"
          descStyle={{
            fontWeight: '400',
          }}
        />
      )}
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
