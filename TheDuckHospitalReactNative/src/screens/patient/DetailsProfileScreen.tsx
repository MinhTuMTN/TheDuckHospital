import React from 'react';
import {ScrollView} from 'react-native';
import {
  AvatarProfile,
  ContainerComponent,
  DetailsInfomation,
} from '../../components';

const DetailsProfileScreen = ({route}: {route: any}) => {
  const [firstClick, setFirstClick] = React.useState(true);
  const [editProfile, setEditProfile] = React.useState({
    fullName: '',
    fullPhoneNumber: '',
    email: '',
    identity: '',
    dateOfBirth: new Date(),
    streetName: '',
    genderId: '',
    nationId: '',
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

  const {profile} = route.params;

  React.useEffect(() => {
    setEditProfile(profile);
    setSelectedProvince(profile.province);
    setSelectedDistrict(profile.district);
    setSelectedWard(profile.ward);
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <ScrollView>
        <AvatarProfile
          firstClick={firstClick}
          setFirstClick={setFirstClick}
          editProfile={editProfile}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWard={selectedWard}
        />
        <DetailsInfomation
          firstClick={firstClick}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWard={selectedWard}
          setSelectedProvince={setSelectedProvince}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedWard={setSelectedWard}
        />
      </ScrollView>
    </ContainerComponent>
  );
};

export default DetailsProfileScreen;
