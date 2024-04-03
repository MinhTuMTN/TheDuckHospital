import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, FlatList} from 'react-native';
import {ContainerComponent, Header, PatientProfile} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import {appColors} from '../../../constants/appColors';
import {getAllPatientProfile} from '../../../services/patientProfileServices';
import {useNavigation} from '@react-navigation/native';
import {RootState, navigationProps} from '../../../types';
import {useSelector} from 'react-redux';

const ChooseProfileScreen = ({route}: {route: any}) => {
  const {t} = useTranslation();
  const {timeSlots} = route.params;
  const [patientProfiles, setPatientProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation<navigationProps>();
  const token = useSelector((state: RootState) => state.auth.token);

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

    if (token) handleGetAllPatientProfile();
  }, [token]);

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
