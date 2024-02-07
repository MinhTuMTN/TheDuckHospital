import React from 'react';
import {Pressable, View} from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../../constants/appColors';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {FlexComponent} from '../..';
import {Box, Card, Text} from '@gluestack-ui/themed';

interface RowProps {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  uppercase?: boolean;
  fontWeight?:
    | (string & {})
    | '$black'
    | '$bold'
    | '$light'
    | '$normal'
    | '$hairline'
    | '$thin'
    | '$medium'
    | '$semibold'
    | '$extrabold'
    | '$extraBlack'
    | undefined;
  button?: React.ReactNode;
}

const Row = (props: RowProps) => {
  const {
    icon,
    text,
    textColor = appColors.textGray,
    uppercase = false,
    fontWeight = '$normal',
    button,
  } = props;

  return (
    <FlexComponent
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      style={{paddingBottom: 10}}>
      <FlexComponent direction="row" alignItems={'center'}>
        {icon}
        <Text color={textColor} fontWeight={fontWeight}>
          {uppercase ? text.toUpperCase() : text}
        </Text>
      </FlexComponent>

      {button}
    </FlexComponent>
  );
};

interface Profile {
  name: string;
  phone: string;
  dob: string;
  address: string;
}

interface PatientProfileProps {
  profile: Profile;
  onPress?: () => void;
}

const PatientProfile = (props: PatientProfileProps) => {
  const {profile, onPress} = props;

  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleViewDetailsClick = () => {
    navigation.navigate('DetailsProfileScreen' as never);
  };
  return (
    <View style={{paddingBottom: 20, backgroundColor: '#00000000'}}>
      <Card
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderWidth: 2,
          borderColor: appColors.gray,
        }}>
        <Row
          icon={
            <Ionicons.default
              name="person-circle-outline"
              size={25}
              color={appColors.primary}
              style={{
                paddingEnd: 10,
              }}
            />
          }
          text={profile.name}
          uppercase
          textColor={appColors.textPrimary}
          fontWeight={'bold'}
          button={
            <Pressable
              style={{
                backgroundColor: appColors.primary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}
              onPress={handleViewDetailsClick}>
              <Text color={appColors.white} bold>
                {t('patientProfile.item.details')}
              </Text>
            </Pressable>
          }
        />
        <Row
          icon={
            <Icon
              name="phone-outline"
              size={25}
              color={appColors.primary}
              style={{
                paddingEnd: 10,
              }}
            />
          }
          text={profile.phone}
        />
        <Row
          icon={
            <Icon
              name="cake-variant-outline"
              size={25}
              color={appColors.primary}
              style={{
                paddingEnd: 10,
              }}
            />
          }
          text={profile.dob}
        />
        <Row
          icon={
            <Ionicons.default
              name="location-outline"
              size={25}
              color={appColors.primary}
              style={{
                paddingEnd: 10,
              }}
            />
          }
          text={profile.address}
        />
      </Card>
    </View>
  );
};

export default PatientProfile;
