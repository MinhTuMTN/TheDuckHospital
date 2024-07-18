import Barcode from '@kichiyaki/react-native-barcode-generator';
import React, {useEffect} from 'react';
import {
  ContainerComponent,
  ContentComponent,
  ContentLoaderComponent,
  FlexComponent,
  InputComponent,
  SectionComponent,
  SelectComponent,
  TextComponent,
} from '../..';
import {appInfo} from '../../../constants/appInfo';
import {formatDate} from '../../../utils/dateUtils';
import {
  getAllDistricts,
  getAllProvinces,
  getAllWards,
} from '../../../services/addressServices';
import {appColors} from '../../../constants/appColors';
import {ChevronDownIcon} from 'lucide-react-native';
import {StyleSheet} from 'react-native';

interface DetailsInfomationProps {
  editabled?: boolean;
  editProfile: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  setEditProfile: any;
  setSelectedProvince: any;
  setSelectedDistrict: any;
  setSelectedWard: any;
  firstClick: boolean;
}

const DetailsInfomation = (props: DetailsInfomationProps) => {
  const {
    editabled = false,
    editProfile,
    setEditProfile,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
    firstClick,
  } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const [provinces, setProvinces] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [isDefaultProvince, setIsDefaultProvince] = React.useState(true);
  const [isDefaultDistrict, setIsDefaultDistrict] = React.useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(id);
  }, []);

  React.useEffect(() => {
    const handlegetAllProvinces = async () => {
      const response = await getAllProvinces();

      if (response.success) {
        if (!isDefaultProvince) {
          setSelectedWard({wardId: '', wardName: ''});
          setSelectedDistrict({districtId: '', districtName: ''});
        }
        setProvinces(response.data?.data);
      }
    };
    handlegetAllProvinces();
  }, []);

  React.useEffect(() => {
    setSelectedDistrict({districtId: '', districtName: ''});
    setSelectedWard({wardId: '', wardName: ''});
  }, [isDefaultProvince]);

  React.useEffect(() => {
    const handlegetAllDistricts = async () => {
      var provinceId: number = selectedProvince?.provinceId;

      const response = await getAllDistricts(provinceId);

      if (response.success) {
        if (!isDefaultDistrict) {
          setSelectedWard({wardId: '', wardName: ''});
        }
        setDistricts(response.data?.data);
      }
    };

    if (selectedProvince?.provinceId !== '') handlegetAllDistricts();
  }, [selectedProvince]);

  React.useEffect(() => {
    setSelectedWard({wardId: '', wardName: ''});
  }, [isDefaultDistrict]);

  React.useEffect(() => {
    const handlegetAllWards = async () => {
      var districtId: number = +selectedDistrict?.districtId;
      const response = await getAllWards(districtId);

      if (response.success) {
        setWards(response.data?.data);
      }
    };
    if (selectedDistrict?.districtId !== '') handlegetAllWards();
  }, [selectedDistrict]);

  return (
    <ContentComponent>
      <SectionComponent title="Thông tin chính">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <InputComponent
              label="Họ và tên"
              value={editProfile.fullName}
              disabled
              editabled={false}
              _inputContainerStyle={{
                borderColor: appColors.grayLight,
              }}
            />
            <InputComponent
              label="Ngày sinh"
              value={formatDate(editProfile.dateOfBirth)}
              disabled
              editabled={false}
              _inputContainerStyle={{
                borderColor: appColors.grayLight,
              }}
            />
            <InputComponent
              label="Giới tính"
              value={editProfile.gender === 'MALE' ? 'Nam' : 'Nữ'}
              disabled
              editabled={false}
              _inputContainerStyle={{
                borderColor: appColors.grayLight,
              }}
            />
            <InputComponent
              label="CCCD/CMND"
              placeholder="Nhập số CCCD/CMND"
              value={editProfile.identityNumber}
              disabled
              editabled={false}
              _inputContainerStyle={{
                borderColor: appColors.grayLight,
              }}
            />
            <InputComponent
              label="Dân tộc"
              value={editProfile.nation?.nationName}
              disabled
              editabled={false}
              _inputContainerStyle={{
                borderColor: appColors.grayLight,
              }}
            />
          </>
        )}
      </SectionComponent>

      <SectionComponent title="Thông tin liên hệ">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <InputComponent
              label="Số điện thoại *"
              value={editProfile.fullPhoneNumber}
              keyboardType="numeric"
              placeholder="VD: 09xxxxxxxxx..."
              onChangeText={text => {
                setEditProfile({
                  ...editProfile,
                  fullPhoneNumber: text,
                });
              }}
              error={
                editProfile.fullPhoneNumber.length != 10 ||
                !editProfile.fullPhoneNumber.startsWith('0')
              }
              errorMessage={'Số điện thoại không hợp lệ'}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={[
                styles.inputContainer,
                {
                  borderColor: appColors.primary,
                },
              ]}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
            />

            <InputComponent
              label="Email"
              placeholder="Nhập email"
              value={editProfile.email}
              onChangeText={text => {
                setEditProfile({
                  ...editProfile,
                  email: text,
                });
              }}
              error={
                editProfile.email?.length > 0 &&
                !editProfile.email?.includes('@theduckhospital.onmicrosoft.com')
              }
              errorMessage={'Địa chỉ không hợp lệ'}
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={[
                styles.inputContainer,
                {
                  borderColor: appColors.primary,
                },
              ]}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
            />
          </>
        )}
      </SectionComponent>
      <SectionComponent title="Địa chỉ">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <ContainerComponent style={{paddingTop: 5}}>
              <TextComponent
                color={appColors.textDescription}
                fontWeight="600"
                style={{paddingBottom: 5}}>
                Tỉnh/Thành phố *
              </TextComponent>
              <SelectComponent
                options={provinces}
                keyTitle="provinceName"
                value={selectedProvince.provinceName}
                onChange={value => {
                  setSelectedProvince(value);
                  setIsDefaultProvince(false);
                }}
                error={selectedProvince.provinceName.length <= 0 && !firstClick}
                errorMessage="Tỉnh thành không được để trống"
                title="Chọn tỉnh thành"
                selectInputStyle={{paddingHorizontal: 10}}
                placeholderColor={appColors.darkGray}
                enableSearch={true}
                width={'100%'}
                placeholder="Tỉnh thành..."
                placeholderSearch="Tìm kiếm tỉnh thành"
                borderColor={'#d2d2d2'}
                selectInputIcon={
                  <ChevronDownIcon color={'#d2d2d2'} size={20} />
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
                <TextComponent
                  color={appColors.textDescription}
                  fontWeight="600"
                  style={{paddingBottom: 5}}>
                  Quận/Huyện *
                </TextComponent>
                <SelectComponent
                  options={districts}
                  keyTitle="districtName"
                  value={selectedDistrict.districtName}
                  onChange={value => {
                    setSelectedDistrict(value);
                    setIsDefaultDistrict(false);
                  }}
                  error={
                    selectedDistrict.districtName.length <= 0 && !firstClick
                  }
                  isDisabled={selectedProvince?.provinceId === ''}
                  errorMessage="Quận huyện không được để trống"
                  enableSearch={true}
                  title="Chọn quận huyện"
                  selectInputStyle={{paddingHorizontal: 10}}
                  placeholderColor={appColors.darkGray}
                  selectTextColor={'black'}
                  placeholder="Quận huyện..."
                  placeholderSearch="Tìm kiếm quận huyện"
                  marginRight={8}
                  borderColor={'#d2d2d2'}
                  selectInputIcon={
                    <ChevronDownIcon color={'#d2d2d2'} size={20} />
                  }
                />
              </ContainerComponent>

              <ContainerComponent style={styles.selectContainer}>
                <TextComponent
                  color={appColors.textDescription}
                  fontWeight="600"
                  style={{paddingBottom: 5}}>
                  Phường/Xã *
                </TextComponent>
                <SelectComponent
                  options={wards}
                  keyTitle="wardName"
                  value={selectedWard.wardName}
                  onChange={value => {
                    setSelectedWard(value);
                  }}
                  error={selectedWard.wardName.length <= 0 && !firstClick}
                  errorMessage="Phường xã không được để trống"
                  title="Chọn phường xã"
                  isDisabled={selectedDistrict?.districtId === ''}
                  enableSearch={true}
                  width={'100%'}
                  selectInputStyle={{paddingHorizontal: 10}}
                  placeholderColor={appColors.darkGray}
                  placeholder="Phường xã..."
                  placeholderSearch="Tìm kiếm phường xã"
                  borderColor={'#d2d2d2'}
                  selectInputIcon={
                    <ChevronDownIcon color={'#d2d2d2'} size={20} />
                  }
                />
              </ContainerComponent>
            </FlexComponent>

            <InputComponent
              label="Địa chỉ cụ thể *"
              size="md"
              value={editProfile.streetName}
              onChangeText={text => {
                setEditProfile({
                  ...editProfile,
                  streetName: text,
                });
              }}
              placeholder="Nhập chính xác địa chỉ hiện tại..."
              error={editProfile.streetName.length <= 0}
              errorMessage="Địa chỉ không được để trống"
              inputContainerStyle={styles.inputContainer}
              inputContainerFocusStyle={[
                styles.inputContainer,
                {
                  borderColor: appColors.primary,
                },
              ]}
              inputStyle={{
                paddingLeft: 10,
              }}
              inputFocusStyle={{
                paddingLeft: 10,
              }}
            />
          </>
        )}
      </SectionComponent>
      <SectionComponent title="Mã bệnh nhân">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            {editProfile.patientCode ? (
              <Barcode
                value={editProfile.patientCode}
                text={editProfile.patientCode}
                textStyle={{color: 'black'}}
                maxWidth={appInfo.size.width * 0.7}
                width={appInfo.size.width * 0.7}
                height={70}
                format="CODE128"
              />
            ) : (
              <TextComponent
                textAlign="center"
                style={{
                  paddingVertical: 8,
                }}>
                Chưa cập nhật mã bệnh nhân
              </TextComponent>
            )}
          </>
        )}
      </SectionComponent>
    </ContentComponent>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    paddingTop: 0,
  },
  inputContainer: {
    backgroundColor: appColors.white,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
  },
});

export default DetailsInfomation;
