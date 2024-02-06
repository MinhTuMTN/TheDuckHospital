import React from 'react';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ContainerComponent,
  Header,
  MedicalBillComponent,
  PatientProfileComponent,
} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const data = [
    {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      dob: '01/01/1990',
      address: '123 Đường ABC, Quận XYZ, TP HCM',
    },
    {
      name: 'Nguyễn Văn B',
      phone: '0123456789',
      dob: '01/01/1990',
      address: '123 Đường ABC, Quận XYZ, TP HCM',
    },
    {
      name: 'Nguyễn Văn C',
      phone: '0123456789',
      dob: '01/01/1990',
      address: '123 Đường ABC, Quận XYZ, TP HCM',
    },
    {
      name: 'Nguyễn Văn D',
      phone: '0123456789',
      dob: '01/01/1990',
      address: '123 Đường ABC, Quận XYZ, TP HCM',
    },
    {
      name: 'Nguyễn Văn E',
      phone: '0123456789',
      dob: '01/01/1990',
      address: '123 Đường ABC, Quận XYZ, TP HCM',
    },
  ];

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('patientProfile.title')}
        titleSize={19}
        icon={<Icon name="adduser" color={'white'} size={30} />}
      />
      <ContentComponent>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <PatientProfileComponent profile={item} />}
        />
      </ContentComponent>
    </ContainerComponent>
  );
};

export default ProfileScreen;
