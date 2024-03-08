import Barcode from '@kichiyaki/react-native-barcode-generator';
import React, {useEffect} from 'react';
import {
  ContentComponent,
  ContentLoaderComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../..';
import {appInfo} from '../../../constants/appInfo';
import {formatDate} from '../../../utils/dateUtils';

interface DetailsInfomationProps {
  editabled?: boolean;
  info: any;
}

const DetailsInfomation = (props: DetailsInfomationProps) => {
  const {editabled = false, info} = props;
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <ContentComponent>
      <SectionComponent title="Thông tin chính">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <InputComponent label="Họ và tên" value={info.fullName} disabled />
            <InputComponent
              label="Ngày sinh"
              value={formatDate(info.dateOfBirth)}
              disabled
            />
            <InputComponent
              label="Giới tính"
              value={info.gender === 'MALE' ? 'Nam' : 'Nữ'}
              disabled
            />
            <InputComponent
              label="CCCD/CMND"
              placeholder="Nhập số CCCD/CMND"
              value={info.identityNumber}
              disabled
            />
            <InputComponent
              label="Dân tộc"
              value={info.nation?.nationName}
              disabled
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
              label="Số điện thoại"
              value={info.phoneNumber}
              editabled={false}
            />
            <InputComponent
              label="Email"
              placeholder="Nhập email"
              value={info.email}
              editabled={false}
            />
          </>
        )}
      </SectionComponent>
      <SectionComponent title="Địa chỉ">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <InputComponent
              label="Tỉnh/Thành phố"
              value={info.province?.provinceName}
              editabled={false}
            />
            <InputComponent
              label="Quận/Huyện"
              value={info.district?.districtName}
              editabled={false}
            />
            <InputComponent
              label="Phường/Xã"
              value={info.ward?.wardName}
              editabled={false}
            />
            <InputComponent
              label="Địa chỉ cụ thể"
              value={info.streetName}
              editabled={false}
            />
          </>
        )}
      </SectionComponent>
      <SectionComponent title="Mã bệnh nhân">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            {info.patientCode ? (
              <Barcode
                value={info.patientCode}
                text={info.patientCode}
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

export default DetailsInfomation;
