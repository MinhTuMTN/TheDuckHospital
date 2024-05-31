import dayjs from 'dayjs';
import {ChevronDownIcon} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ContainerComponent,
  Header,
  InputComponent,
  SelectComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import InfoProfileSearchComponent from '../../../components/patient/lookUpMedicalResults/InfoProfileSearchComponent';
import {appColors} from '../../../constants/appColors';
import {getAllProvinces} from '../../../services/addressServices';
import {findProfileCode} from '../../../services/patientProfileServices';
import {set} from '@gluestack-style/react';
import FormControlComponent from '../../../components/FormControlComponent';
import {useToast} from '../../../hooks/ToastProvider';

const genders = [
  {
    genderId: 'MALE',
    genderName: 'Nam',
  },
  {
    genderId: 'FEMALE',
    genderName: 'Nữ',
  },
];

const FindProfileCodeScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [provices, setProvices] = React.useState([]);
  const [isFind, setIsFind] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [profileData, setProfileData] = React.useState<any>([]);

  const [selectedGender, setSelectedGender] = React.useState<any>({
    genderId: 'MALE',
    genderName: 'Nam',
  });
  const toast = useToast();
  const [fullName, setFullName] = React.useState('');
  const [selectedProvince, setSelectedProvince] = React.useState<any>(null);
  const [yearOfBirth, setYearOfBirth] = React.useState<number>(1985);

  const handleSearch = async () => {
    const data = {
      fullName: fullName,
      yearOfBirth: yearOfBirth,
      provinceId: selectedProvince.provinceId,
      gender: selectedGender.genderId,
    };

    setIsLoading(true);
    const response = await findProfileCode(data);
    setIsLoading(false);
    console.log(response.data?.data);

    if (response.success) {
      setProfileData(response.data?.data);
      if (response.data?.data.length > 0) {
        setIsFind(true);
      } else {
        toast.showToast('Không tìm thấy hồ sơ tương ứng');
      }
    } else {
      console.log(response.error);
    }
  };

  useEffect(() => {
    const handleGetAllProvices = async () => {
      const response = await getAllProvinces();

      if (response.success) {
        setProvices(response.data?.data);
      } else {
        console.log(response.error);
      }
    };

    handleGetAllProvices();
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <Header title="Tìm mã hồ sơ" paddingBottom={18} paddingTop={30} />
      <View style={styles.container}>
        <View style={styles.note}>
          <Entypo name="info-with-circle" size={17} color="black" />
          <TextComponent
            style={{marginLeft: 4}}
            color="black"
            fontSize={14}
            fontWeight="500">
            Vui lòng nhập chính xác các thông bên dưới
          </TextComponent>
        </View>
        <FormControlComponent onErrors={error => setError(error)}>
          <View style={styles.form}>
            <InputComponent
              label="Họ và tên"
              autoFocus
              onChangeText={text => setFullName(text)}
              labelStyle={{
                color: appColors.grayText,
                fontSize: 14,
                fontWeight: '500',
              }}
              containerStyle={{
                width: '100%',
              }}
              error={fullName === ''}
              errorMessage="Họ và tên không được để trống"
              placeholder="Nguyễn Văn A"
              inputStyle={{paddingHorizontal: 10}}
              _inputContainerStyle={{
                borderRadius: 10,
                borderColor: appColors.darkGray,
                paddingHorizontal: 4,
              }}
              inputFocusStyle={{
                paddingHorizontal: 10,
              }}
            />
            <View style={styles.line}>
              <View
                style={{
                  flex: 2,
                }}>
                <TextComponent
                  color={appColors.grayText}
                  fontSize={14}
                  fontWeight="500"
                  style={{paddingBottom: 5}}>
                  Giới tính
                </TextComponent>
                <SelectComponent
                  options={genders}
                  keyTitle="genderName"
                  size="lg"
                  borderColor={appColors.darkGray}
                  value={selectedGender.genderName}
                  selectInputStyle={{
                    paddingHorizontal: 12,
                  }}
                  placeholderColor={appColors.darkGray}
                  title="Chọn giới tính"
                  error={selectedGender.genderId === ''}
                  errorMessage="Giới tính không được để trống"
                  onChange={value => setSelectedGender(value)}
                  selectTextColor={'black'}
                  placeholder="Giới tính"
                  width="100%"
                  paddingRight={10}
                  selectInputIcon={
                    <ChevronDownIcon color={appColors.black} size={20} />
                  }
                />
              </View>

              <InputComponent
                label="Năm sinh"
                keyboardType="phone-pad"
                onChangeText={text => setYearOfBirth(parseInt(text))}
                labelStyle={{
                  color: appColors.grayText,
                  fontSize: 14,
                  fontWeight: '500',
                  paddingBottom: 5,
                }}
                placeholder="Năm sinh"
                error={yearOfBirth > dayjs().get('year') || yearOfBirth < 1900}
                errorMessage="Năm sinh không hợp lệ"
                inputStyle={{paddingHorizontal: 10}}
                _inputContainerStyle={{
                  borderRadius: 10,
                  borderColor: appColors.darkGray,
                  paddingHorizontal: 4,
                }}
                containerStyle={{flex: 3}}
                inputFocusStyle={{
                  paddingHorizontal: 10,
                }}
              />
            </View>

            <View>
              <TextComponent
                color={appColors.grayText}
                fontSize={14}
                fontWeight="500"
                style={{paddingBottom: 5}}>
                Tỉnh/Thành phố
              </TextComponent>
              <SelectComponent
                options={provices}
                keyTitle="provinceName"
                size="lg"
                borderColor={appColors.darkGray}
                value={selectedProvince?.provinceName}
                placeholderColor={appColors.darkGray}
                title="Tỉnh/Thành phố"
                error={selectedProvince?.provinceId === ''}
                errorMessage={'Tỉnh/Thành phố không được để trống'}
                onChange={value => setSelectedProvince(value)}
                selectTextColor={'black'}
                placeholder="Tỉnh/Thành phố"
                width={'100%'}
                selectInputStyle={{
                  paddingHorizontal: 10,
                }}
                selectInputIcon={
                  <ChevronDownIcon color={appColors.black} size={20} />
                }
              />
            </View>
            <ButtonComponent
              isLoading={isLoading}
              enabled={!error}
              onPress={handleSearch}
              borderRadius={15}
              backgroundColor={appColors.primaryDark}
              containerStyles={{
                marginTop: 16,
              }}
              textStyles={{
                fontSize: 16,
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
              Tìm kiếm
            </ButtonComponent>
            {isFind && (
              <View style={styles.info}>
                <TextComponent
                  style={{
                    letterSpacing: 0.5,
                  }}
                  fontSize={18}
                  fontWeight="600"
                  color={appColors.primaryDark}>
                  Kết quả tra cứu:
                </TextComponent>
                {profileData.map((item: any, index: number) => (
                  <InfoProfileSearchComponent key={index} info={item} />
                ))}
              </View>
            )}
          </View>
        </FormControlComponent>
      </View>
    </ContainerComponent>
  );
};

export default FindProfileCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingHorizontal: 20,
    rowGap: 16,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexDirection: 'column',
    rowGap: 12,
    width: '100%',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    borderTopColor: appColors.primaryDark,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    marginTop: 16,
    paddingTop: 10,
    width: '100%',
  },
});
