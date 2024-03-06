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
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import {useAuth} from '../../../auth/AuthProvider';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [patientProfiles, setPatientProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const auth = useAuth();

  React.useEffect(() => {
    const handleGetAllPatientProfile = async () => {
      const response = await getAllPatientProfile();

      if (response.success) {
        setPatientProfiles(response.data.data);
      } else console.log('Error: ', response.error);
    };

    if (auth.token) handleGetAllPatientProfile();
  }, [auth.token]);

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
            data={patientProfiles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <PatientProfile profile={item} />}
          />
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default ProfileScreen;
