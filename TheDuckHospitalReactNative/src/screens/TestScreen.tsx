import {ChevronDownIcon} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {
  ContainerComponent,
  FlexComponent,
  SelectComponent,
} from '../components';
import {appColors} from '../constants/appColors';

const initValue = -200;
const TestScreen = () => {
  const [departments, setDepartments] = React.useState<object[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>('');
  const [selectedGender, setSelectedGender] = React.useState<string>('');
  const [selectedDegree, setSelectedDegree] = React.useState<string>('');

  // const offsetValue = useSharedValue(initValue);
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateY: offsetValue.value}],
  //   };
  // });

  // useEffect(() => {
  //   offsetValue.value = withTiming(0, {duration: 400});
  // }, [offsetValue]);

  useEffect(() => {
    const options = [
      {
        departmentId: 1,
        departmentName: 'Nội tiết',
      },
      {
        departmentId: 2,
        departmentName: 'Nhi',
      },
      {
        deparmentId: 3,
        departmentName: 'Da liễu',
      },
      {
        departmentId: 4,
        departmentName: 'Tim mạch',
      },
    ];

    setTimeout(() => {
      setDepartments(options);
    }, 1000);
  }, []);

  return (
    <ContainerComponent style={{}}>
      {/* <Animated.View
        style={[
          {backgroundColor: appColors.primary, padding: 64},
          animatedStyles,
        ]}>
        <TextComponent>Test Screen</TextComponent>
      </Animated.View> */}
      <FlexComponent
        direction="row"
        style={{width: '100%', paddingHorizontal: 8}}>
        <SelectComponent
          options={departments}
          keyTitle="departmentName"
          value={selectedDepartment}
          title="Chọn chuyên khoa"
          enableSearch={true}
          onChange={value => {
            console.log('value', value);
            setSelectedDepartment(value);
          }}
          placeholder="Chuyên khoa"
          placeholderSearch="Tìm kiếm chuyên khoa"
          selectInputStyle={{backgroundColor: appColors.primary}}
          selectTextColor={appColors.white}
          placeholderColor={appColors.white}
          marginRight={8}
          flex={3}
          selectInputIcon={
            <ChevronDownIcon color={appColors.white} size={20} />
          }
        />
        <SelectComponent
          options={['Nam', 'Nữ']}
          value={selectedGender}
          title="Chọn giới tính"
          onChange={value => setSelectedGender(value)}
          selectTextColor={'black'}
          placeholder="Giới tính"
          flex={2}
          marginRight={8}
          selectInputIcon={
            <ChevronDownIcon color={appColors.black} size={20} />
          }
        />
        <SelectComponent
          options={[
            'Thạc sĩ',
            'Tiến sĩ',
            'Bác sĩ',
            'BSCKII',
            'BSCKI',
            'GS',
            'PGS',
            'PGS.TS',
          ]}
          value={selectedDegree}
          title="Học vấn"
          onChange={value => setSelectedDegree(value)}
          selectTextColor={'black'}
          placeholder="Học vấn"
          flex={3}
          selectInputIcon={
            <ChevronDownIcon color={appColors.black} size={20} />
          }
        />
      </FlexComponent>
    </ContainerComponent>
  );
};

export default TestScreen;
