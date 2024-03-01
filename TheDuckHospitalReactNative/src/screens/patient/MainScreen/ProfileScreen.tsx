import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  ContainerComponent,
  ContentLoaderComponent,
  Header,
  PatientProfile,
} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {appColors} from '../../../constants/appColors';

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

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('patientProfile.title')}
        titleSize={19}
        icon={<Icon name="adduser" color={'white'} size={30} />}
      />
      <ContentComponent>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color={appColors.primary} />
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <PatientProfile profile={item} />}
          />
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default ProfileScreen;