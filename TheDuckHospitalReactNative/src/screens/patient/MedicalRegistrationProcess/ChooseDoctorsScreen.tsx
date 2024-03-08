import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounce} from 'use-debounce';
import {Filter} from '../../../assets/svgs';
import {
  InputComponent,
  NotFoundComponent,
  SelectComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import {searchDoctor} from '../../../services/dotorSevices';
import {navigationProps} from '../../../types';
import DoctorInfoComponent from '../../../components/patient/chooseDoctorsScreen/DoctorInfoComponent';
import {getAllDepartment} from '../../../services/bookingServices';

const degreeData = [
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

const ChooseDoctorsScreen = () => {
  const [doctors, setDoctors] = React.useState<any>([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 6,
    totalPages: 0,
  });
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState<any>(null);
  const [selectedDegree, setSelectedDegree] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);

  // Animation Filter
  const offsetValue = useSharedValue(-100);
  const displayValue = useSharedValue<'none' | 'flex' | undefined>('none');
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offsetValue.value}],
      display: displayValue.value,
    };
  });
  const handleFilterClick = () => {
    if (offsetValue.value === -100) {
      offsetValue.value = withSpring(0, {
        duration: 1000,
      });
      displayValue.value = 'flex';
    } else {
      offsetValue.value = withSpring(-100, {
        duration: 500,
      });
      displayValue.value = 'none';
    }
  };
  // End Animation Filter

  const navigation = useNavigation<navigationProps>();
  const renderItem = useCallback(({item}: {item: any}) => {
    return <DoctorInfoComponent item={item} />;
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: number) => `doctor-${item.id}-${index}`,
    [],
  );
  const listFooterComponent = useMemo(() => {
    let _renderUI;
    let _renderHeight: DimensionValue | undefined;
    if (isLoadingAPI) {
      _renderUI = <ActivityIndicator size="large" color={appColors.primary} />;
    } else if (doctors.length === 0) {
      _renderUI = (
        <NotFoundComponent
          imageSrc={require('../../../assets/images/animal.png')}
          desc="Không tìm thấy kết quả phù hợp"
          descStyle={{
            fontWeight: '400',
          }}
        />
      );
      _renderHeight = appInfo.size.height * 0.7;
    } else if (pagination.page === pagination.totalPages) {
      _renderUI = (
        <TextComponent
          fontSize={14}
          fontWeight="400"
          color={appColors.black}
          textAlign="center">
          Không còn dữ liệu để hiển thị
        </TextComponent>
      );
    } else {
      _renderUI = null;
    }
    return (
      <View
        style={{
          height: _renderHeight,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        {_renderUI}
      </View>
    );
  }, [isLoadingAPI, doctors, pagination.page, pagination.totalPages]);

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPagination((prevState: any) => ({
      ...prevState,
      page: 1,
    }));
  };
  const handleSearchDoctor = useCallback(async () => {
    setIsLoadingAPI(true);
    const response = await searchDoctor(
      debouncedSearchText,
      selectedDepartment?.departmentId,
      selectedDegree?.id,
      pagination.page,
      pagination.limit,
    );
    setIsLoadingAPI(false);

    if (response.success) {
      if (pagination.page === 1) {
        setDoctors(response.data.data.items);
      } else {
        setDoctors((prevState: any) => [
          ...prevState,
          ...response.data.data.items,
        ]);
      }
      setPagination({
        ...pagination,
        totalPages: response.data.data.totalPages,
      });
    } else {
      console.log('Error: ', response.error);
    }
  }, [
    debouncedSearchText,
    selectedDepartment,
    selectedDegree,
    pagination.page,
    pagination.limit,
  ]);

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
    handleSearchDoctor();
  }, [handleSearchDoctor]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.mainHeader}>
          <Icon
            name="chevron-back"
            size={30}
            color={appColors.black}
            onPress={() => navigation.goBack()}
          />
          <TextComponent
            fontSize={18}
            fontWeight="700"
            color={appColors.black}
            textAlign="center"
            uppercase>
            Chọn bác sĩ
          </TextComponent>
          <Filter width={30} height={30} onPress={handleFilterClick} />
        </View>
        <Animated.View style={[styles.bodyHeard, animatedStyles]}>
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
              options={degreeData}
              keyTitle="degree"
              value={selectedDegree}
              size="md"
              onChange={selectedDegree => {
                setSelectedDegree(selectedDegree);
                setPagination((prevState: any) => ({
                  ...prevState,
                  page: 1,
                }));
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
                setPagination((prevState: any) => ({
                  ...prevState,
                  page: 1,
                }));
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
        </Animated.View>
      </View>

      <FlatList
        data={doctors}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{width: '100%'}}
        initialNumToRender={5}
        onEndReached={e => {
          if (pagination.page < pagination.totalPages) {
            setPagination({
              ...pagination,
              page: pagination.page + 1,
            });
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooterComponent}
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
