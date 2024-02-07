import Barcode from '@kichiyaki/react-native-barcode-generator';
import React, {useEffect} from 'react';
import {
  ContentComponent,
  ContentLoaderComponent,
  InputComponent,
  SectionComponent,
} from '../..';
import {appInfo} from '../../../constants/appInfo';

interface DetailsInfomationProps {
  editabled?: boolean;
}

const DetailsInfomation = (props: DetailsInfomationProps) => {
  const {editabled = false} = props;
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <ContentComponent>
      <SectionComponent title="Thông tin chính">
        {isLoading ? (
          <ContentLoaderComponent />
        ) : (
          <>
            <InputComponent label="Họ và tên" value="Nguyễn Minh Tú" disabled />
            <InputComponent label="Ngày sinh" value="09/12/2000" disabled />
            <InputComponent label="Giới tính" value="Nam" disabled />
            <InputComponent label="CMND/CCCD" value="080012345678" disabled />
            <InputComponent label="Dân tộc" value="Kinh" disabled />
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
              value="0987655321"
              editabled={false}
            />
            <InputComponent
              label="Email"
              value="nguyenminhtu@gmail.com"
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
              value="TP Hồ Chí Minh"
              editabled={false}
            />
            <InputComponent
              label="Quận/Huyện"
              value="Tp Thủ Đức"
              editabled={false}
            />
            <InputComponent
              label="Phường/Xã"
              value="Phường Linh Trung"
              editabled={false}
            />
            <InputComponent
              label="Địa chỉ cụ thể"
              value="1 Võ Văn Ngân"
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
            <Barcode
              value="123456789"
              text="123456789"
              textStyle={{color: 'black'}}
              maxWidth={appInfo.size.width * 0.7}
              width={appInfo.size.width * 0.7}
              height={70}
              format="CODE128"
            />
          </>
        )}
      </SectionComponent>
    </ContentComponent>
  );
};

export default DetailsInfomation;
