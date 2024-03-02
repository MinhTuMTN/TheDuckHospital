import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import {ChevronDownIcon, ChevronRight, Search} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  SelectComponent,
  TextComponent,
} from '../components';
import {appColors} from '../constants/appColors';

const initValue = -200;
const TestScreen = () => {
  const [departments, setDepartments] = React.useState<string[]>([]);
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
      'Khoa tai mũi họng',
      'Khoa da liễu',
      'Khoa thần kinh',
      'Khoa nội tiết',
      'Khoa tim mạch',
      'Khoa phụ sản',
      'Khoa nhi',
      'Khoa ngoại',
      'Khoa nội',
      'Khoa sản',
      'Khoa mắt',
      'Khoa tai mũi họng', // Lưu ý rằng giá trị này lặp lại, hãy xóa nếu không cần thiết
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
          value={selectedDepartment}
          title="Chọn chuyên khoa"
          enableSearch={true}
          onChange={value => setSelectedDepartment(value)}
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
