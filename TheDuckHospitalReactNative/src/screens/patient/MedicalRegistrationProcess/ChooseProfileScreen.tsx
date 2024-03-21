import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList} from 'react-native';
import {useAuth} from '../../../auth/AuthProvider';
import {ContainerComponent, Header, PatientProfile} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {appColors} from '../../../constants/appColors';
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

const ChooseProfileScreen = ({route}: {route: any}) => {
  const {t} = useTranslation();
  const {timeSlots} = route.params;
  const [patientProfiles, setPatientProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const auth = useAuth();
  const navigation = useNavigation<navigationProps>();

  const handleNavigateToBillInfoScreen = (profile: any) => {
    navigation.navigate('BillingInformationScreen', {
      timeSlots: timeSlots,
      profile: profile,
    });
  };

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
        title="Chọn hồ sơ bệnh nhân"
        paddingStart={26}
        noBackground
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
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
            renderItem={({item}) => (
              <PatientProfile
                profile={item}
                onPress={() => {
                  handleNavigateToBillInfoScreen(item);
                }}
              />
            )}
          />
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default ChooseProfileScreen;
