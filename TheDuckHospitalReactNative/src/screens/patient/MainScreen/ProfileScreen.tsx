import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../../auth/AuthProvider';
import {ContainerComponent, Header, PatientProfile} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {appColors} from '../../../constants/appColors';
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const [patientProfiles, setPatientProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const auth = useAuth();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const handleGetAllPatientProfile = async () => {
      const response = await getAllPatientProfile();

      if (response.success) {
        setPatientProfiles(response.data.data);
      } else console.log('Error: ', response.error);
    };

    if (auth.token && isFocused) handleGetAllPatientProfile();
  }, [auth.token, isFocused]);

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
