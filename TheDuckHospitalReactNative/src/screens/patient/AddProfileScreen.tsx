import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  InputComponent,
  SelectComponent,
  TextComponent,
} from '../../components';
import ContentComponent from '../../components/ContentComponent';
import {appColors} from '../../constants/appColors';
import {useNavigation} from '@react-navigation/native';
import {CalendarDays, ChevronDownIcon} from 'lucide-react-native';
import {ScrollView} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import FormControlComponent from '../../components/FormControlComponent';
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from '../../services/addressServices';
import {getAllNations} from '../../services/nationServices';
import {createPatientProfile} from '../../services/patientProfileServices';
import LoadingComponent from '../../components/LoadingComponent';

const genders = [
  {
    genderId: 0,
    genderName: 'Nam',
  },
  {
    genderId: 1,
    genderName: 'Nữ',
  },
];

const AddProfileScreen = () => {
  const {t} = useTranslation();
  const [datePickerLoading, setDatePickerLoading] = React.useState(false);
  const [patientProfile, setPatientProfile] = React.useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    identity: '',
    dateOfBirth: new Date(),
    address: '',
  });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [nations, setNations] = React.useState([]);
  const [provinces, setProvinces] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [selectedGender, setSelectedGender] = React.useState({
    genderId: '',
    genderName: '',
  });
  const [selectedNation, setSelectedNation] = React.useState({
    nationId: '',
    nationName: '',
  });
  const [selectedProvince, setSelectedProvince] = React.useState({
    provinceId: '',
    provinceName: '',
  });
  const [selectedDistrict, setSelectedDistrict] = React.useState({
    districtId: '',
    districtName: '',
  });
  const [selectedWard, setSelectedWard] = React.useState({
    wardId: '',
    wardName: '',
  });
  const [error, setError] = React.useState(false);
  const [firstClick, setFirstClick] = React.useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    const handlegetAllNations = async () => {
      const response = await getAllNations();

      if (response.success) {
        setNations(response.data?.data);
      }
    };
    handlegetAllNations();
  }, []);

  React.useEffect(() => {
    const handlegetAllProvinces = async () => {
      const response = await getAllProvinces();

      if (response.success) {
        setProvinces(response.data?.data);
      }
    };

    if (selectedProvince.provinceId === '') handlegetAllProvinces();
  }, [selectedProvince]);

  React.useEffect(() => {
    const handlegetAllDistricts = async () => {
      var provinceId: number = +selectedProvince.provinceId;
      const response = await getAllDistricts(provinceId);

      if (response.success) {
        setSelectedDistrict({districtId: '', districtName: ''});
        setDistricts(response.data?.data);
      }
    };

    if (selectedProvince.provinceId !== '') handlegetAllDistricts();
  }, [selectedProvince]);

  React.useEffect(() => {
    const handlegetAllWards = async () => {
      var districtId: number = +selectedDistrict.districtId;
      const response = await getAllWards(districtId);

      if (response.success) {
        setSelectedWard({wardId: '', wardName: ''});
        setWards(response.data?.data);
      }
    };

    if (selectedDistrict.districtId !== '') handlegetAllWards();
  }, [selectedDistrict]);

  const handleCreatePatientProfile = async () => {
    if (!firstClick) setFirstClick(true);
    if (error) {
      return;
    }

    let genderId: number = +selectedGender.genderId;
    let wardId: number = +selectedWard.wardId;
    let nationId: number = +selectedNation.nationId;
    const data = {
      fullName: patientProfile.fullName,
      phoneNumber: patientProfile.phoneNumber,
      dateOfBirth: dayjs(patientProfile.dateOfBirth).toISOString(),
      gender: genderId,
      wardId: wardId,
      streetName: patientProfile.address,
      email: patientProfile.email,
      identityNumber: patientProfile.identity,
      nationId: nationId,
    };
    const response = await createPatientProfile(data);
    if (response.success) {
      navigation.navigate('ProfileScreen' as never);
    }
  };

  return (
    <ContainerComponent paddingTop={0}>
      <Header title={'Tạo hồ sơ khám bệnh'} titleSize={19} />
      <ContentComponent>
        <LoadingComponent>
          <ScrollView>
            <ContainerComponent style={styles.container}>
              <FlexComponent
                style={{flexDirection: 'row', justifyContent: 'center'}}>
                <EntypoIcon
                  name={'info-with-circle'}
                  size={24}
                  color={appColors.black}
                />
                <TextComponent bold style={{paddingLeft: 10}}>
                  Vui lòng nhập chính xác thông tin bên dưới
                </TextComponent>
              </FlexComponent>
              <ContainerComponent style={styles.formContainer}>
                <FormControlComponent onErrors={error => setError(error)}>
                  <InputComponent
                    label="Họ và tên *"
                    labelStyle={styles.labelInput}
                    size="md"
                    error={
                      patientProfile.fullName.length <= 0 ||
                      patientProfile.fullName.trim() === ''
                    }
                    errorMessage={'Họ tên không hợp lệ'}
                    value={patientProfile.fullName}
                    onChangeText={text =>
                      setPatientProfile({
                        ...patientProfile,
                        fullName: text,
                      })
                    }
                    placeholder="VD: Nguyễn Văn ..."
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputFocusContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                  />

                  <InputComponent
                    label="Số điện thoại *"
                    labelStyle={styles.labelInput}
                    size="md"
                    keyboardType="numeric"
                    placeholder="VD: 09xxxxxxxxx..."
                    value={patientProfile.phoneNumber}
                    onChangeText={text =>
                      setPatientProfile({
                        ...patientProfile,
                        phoneNumber: text,
                      })
                    }
                    error={
                      patientProfile.phoneNumber.length != 10 ||
                      !patientProfile.phoneNumber.startsWith('0')
                    }
                    errorMessage={'Số điện thoại không hợp lệ'}
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputFocusContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                  />

                  <InputComponent
                    label="Email"
                    labelStyle={styles.labelInput}
                    size="md"
                    placeholder="VD: email@..."
                    value={patientProfile.email}
                    onChangeText={text =>
                      setPatientProfile({
                        ...patientProfile,
                        email: text,
                      })
                    }
                    error={
                      (patientProfile.email.length > 0 ||
                        patientProfile.email.trim() !== '') &&
                      !patientProfile.email.includes('@')
                    }
                    errorMessage={'Địa chỉ email không hợp lệ'}
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputFocusContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                  />

                  <InputComponent
                    label="CCCD/CMND"
                    labelStyle={styles.labelInput}
                    size="md"
                    keyboardType="numeric"
                    placeholder="Nhập CCCD/CMND"
                    value={patientProfile.identity}
                    onChangeText={text =>
                      setPatientProfile({
                        ...patientProfile,
                        identity: text,
                      })
                    }
                    error={
                      patientProfile.identity.length != 0 &&
                      patientProfile.identity.length != 9 &&
                      patientProfile.identity.length != 12
                    }
                    errorMessage={'CMND/CCCD không hợp lệ'}
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputFocusContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                  />

                  <InputComponent
                    editabled={false}
                    label="Ngày sinh *"
                    labelStyle={styles.labelInput}
                    size="md"
                    placeholder="DD/MM/YYYY"
                    value={dayjs(patientProfile.dateOfBirth).format(
                      'DD/MM/YYYY',
                    )}
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                    endIcon={
                      <Pressable onPress={() => setShowDatePicker(true)}>
                        <CalendarDays size={24} color={appColors.black} />
                      </Pressable>
                    }
                  />

                  <DatePicker
                    modal
                    open={showDatePicker}
                    mode="date"
                    date={patientProfile.dateOfBirth}
                    title={'Chọn ngày sinh'}
                    maximumDate={new Date()}
                    onConfirm={date => {
                      setShowDatePicker(false);
                      setPatientProfile({
                        ...patientProfile,
                        dateOfBirth: date,
                      });
                    }}
                    onLayout={() => {}}
                    onCancel={() => {
                      setShowDatePicker(false);
                    }}
                  />

                  <FlexComponent style={{flexDirection: 'row'}}>
                    <ContainerComponent style={styles.selectContainer}>
                      <TextComponent bold style={{paddingBottom: 5}}>
                        Giới tính *
                      </TextComponent>
                      <SelectComponent
                        options={genders}
                        keyTitle="genderName"
                        value={selectedGender.genderName}
                        selectInputStyle={{paddingHorizontal: 10}}
                        placeholderColor={appColors.darkGray}
                        title="Chọn giới tính"
                        error={selectedGender.genderId === '' && firstClick}
                        errorMessage="Giới tính không được để trống"
                        onChange={value => setSelectedGender(value)}
                        selectTextColor={'black'}
                        placeholder="Giới tính"
                        marginRight={8}
                        selectInputIcon={
                          <ChevronDownIcon color={appColors.black} size={20} />
                        }
                      />
                    </ContainerComponent>

                    <ContainerComponent style={styles.selectContainer}>
                      <TextComponent bold style={{paddingBottom: 5}}>
                        Dân tộc *
                      </TextComponent>
                      <SelectComponent
                        options={nations}
                        keyTitle="nationName"
                        value={selectedNation.nationName}
                        title="Chọn dân tộc"
                        selectInputStyle={{paddingHorizontal: 10}}
                        placeholderColor={appColors.darkGray}
                        enableSearch={true}
                        width={'100%'}
                        error={selectedNation.nationId === '' && firstClick}
                        errorMessage="Dân tộc không được để trống"
                        onChange={value => setSelectedNation(value)}
                        placeholder="Dân tộc..."
                        placeholderSearch="Tìm kiếm dân tộc"
                        selectInputIcon={
                          <ChevronDownIcon color={appColors.black} size={20} />
                        }
                      />
                    </ContainerComponent>
                  </FlexComponent>

                  <ContainerComponent style={{paddingTop: 15}}>
                    <TextComponent bold style={{paddingBottom: 5}}>
                      Tỉnh thành *
                    </TextComponent>
                    <SelectComponent
                      options={provinces}
                      keyTitle="provinceName"
                      value={selectedProvince.provinceName}
                      onChange={value => setSelectedProvince(value)}
                      error={
                        selectedProvince.provinceId.length <= 0 && firstClick
                      }
                      errorMessage="Tỉnh thành không được để trống"
                      title="Chọn tỉnh thành"
                      selectInputStyle={{paddingHorizontal: 10}}
                      placeholderColor={appColors.darkGray}
                      enableSearch={true}
                      width={'100%'}
                      placeholder="Tỉnh thành..."
                      placeholderSearch="Tìm kiếm tỉnh thành"
                      selectInputIcon={
                        <ChevronDownIcon color={appColors.black} size={20} />
                      }
                    />
                  </ContainerComponent>

                  <FlexComponent
                    style={{
                      flexDirection: 'row',
                      paddingTop: 15,
                      paddingBottom: 15,
                    }}>
                    <ContainerComponent style={styles.selectContainer}>
                      <TextComponent bold style={{paddingBottom: 5}}>
                        Quận huyện *
                      </TextComponent>
                      <SelectComponent
                        options={districts}
                        keyTitle="districtName"
                        value={selectedDistrict.districtName}
                        onChange={value => setSelectedDistrict(value)}
                        isDisabled={selectedProvince.provinceId === ''}
                        error={
                          selectedDistrict.districtId.length <= 0 && firstClick
                        }
                        errorMessage="Quận huyện không được để trống"
                        enableSearch={true}
                        title="Chọn quận huyện"
                        selectInputStyle={{paddingHorizontal: 10}}
                        placeholderColor={appColors.darkGray}
                        selectTextColor={'black'}
                        placeholder="Quận huyện..."
                        placeholderSearch="Tìm kiếm quận huyện"
                        marginRight={8}
                        selectInputIcon={
                          <ChevronDownIcon color={appColors.black} size={20} />
                        }
                      />
                    </ContainerComponent>

                    <ContainerComponent style={styles.selectContainer}>
                      <TextComponent bold style={{paddingBottom: 5}}>
                        Phường xã *
                      </TextComponent>
                      <SelectComponent
                        options={wards}
                        keyTitle="wardName"
                        value={selectedWard.wardName}
                        onChange={value => setSelectedWard(value)}
                        isDisabled={selectedDistrict.districtId === ''}
                        error={selectedWard.wardId.length <= 0 && firstClick}
                        errorMessage="Phường xã không được để trống"
                        title="Chọn phường xã"
                        enableSearch={true}
                        width={'100%'}
                        selectInputStyle={{paddingHorizontal: 10}}
                        placeholderColor={appColors.darkGray}
                        placeholder="Phường xã..."
                        placeholderSearch="Tìm kiếm phường xã"
                        selectInputIcon={
                          <ChevronDownIcon color={appColors.black} size={20} />
                        }
                      />
                    </ContainerComponent>
                  </FlexComponent>

                  <InputComponent
                    label="Địa chỉ thường trú *"
                    labelStyle={styles.labelInput}
                    size="md"
                    value={patientProfile.address}
                    error={patientProfile.address.length <= 0}
                    errorMessage="Địa chỉ không được để trống"
                    onChangeText={text =>
                      setPatientProfile({
                        ...patientProfile,
                        address: text,
                      })
                    }
                    placeholder="Nhập chính xác địa chỉ hiện tại..."
                    inputContainerStyle={styles.inputContainer}
                    inputContainerFocusStyle={styles.inputFocusContainer}
                    inputStyle={{
                      paddingLeft: 10,
                    }}
                    inputFocusStyle={{
                      paddingLeft: 10,
                    }}
                  />

                  <View style={styles.buttonConfirm}>
                    <ButtonComponent
                      enabled={!error}
                      backgroundColor={appColors.darkerBlue}
                      borderRadius={15}
                      containerStyles={{paddingVertical: 12}}
                      textStyles={{
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        fontSize: 16,
                      }}
                      onPress={handleCreatePatientProfile}>
                      Xác nhận
                    </ButtonComponent>
                  </View>
                </FormControlComponent>
              </ContainerComponent>
            </ContainerComponent>
          </ScrollView>
        </LoadingComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    paddingTop: 0,
  },
  formContainer: {
    paddingTop: 10,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  labelInput: {
    color: appColors.black,
    fontWeight: 'bold',
  },
  buttonConfirm: {
    width: '100%',
    paddingBottom: 20,
  },
  inputContainer: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },
  inputFocusContainer: {
    backgroundColor: appColors.white,
    borderColor: appColors.primary,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },
});

export default AddProfileScreen;
