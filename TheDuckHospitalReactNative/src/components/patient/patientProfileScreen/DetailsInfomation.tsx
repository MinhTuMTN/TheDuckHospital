import React from 'react';
import {ContentComponent, InputComponent, SectionComponent} from '../..';

interface DetailsInfomationProps {
  editabled?: boolean;
}

const DetailsInfomation = (props: DetailsInfomationProps) => {
  const {editabled = false} = props;
  return (
    <ContentComponent>
      <SectionComponent title="Thông tin chính">
        <InputComponent label="Họ và tên" value="Nguyễn Minh Tú" disabled />
        <InputComponent label="Ngày sinh" value="09/12/2000" disabled />
        <InputComponent label="Giới tính" value="Nam" disabled />
        <InputComponent label="CMND/CCCD" value="080012345678" disabled />
        <InputComponent label="Dân tộc" value="Kinh" disabled />
      </SectionComponent>
      <SectionComponent title="Thông tin liên hệ">
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
      </SectionComponent>
      <SectionComponent title="Địa chỉ">
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
      </SectionComponent>
    </ContentComponent>
  );
};

export default DetailsInfomation;
