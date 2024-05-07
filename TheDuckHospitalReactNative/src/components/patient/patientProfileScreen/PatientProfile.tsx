import {Card, Text} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, View} from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {navigationProps} from '../../../types';
import {formatDate} from '../../../utils/dateUtils';

interface RowProps {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  uppercase?: boolean;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  button?: React.ReactNode;
}

const Row = (props: RowProps) => {
  const {
    icon,
    text,
    textColor = appColors.textGray,
    uppercase = false,
    fontWeight = 'normal',
    button,
  } = props;

  return (
    <FlexComponent
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      style={{paddingBottom: 10, overflow: 'hidden'}}>
      <FlexComponent direction="row" alignItems={'center'} flex={2}>
        {icon}
        <TextComponent
          color={textColor}
          fontWeight={fontWeight}
          flex={1}
          textAlign="justify">
          {uppercase ? text.toUpperCase() : text}
        </TextComponent>
      </FlexComponent>

      {button && <FlexComponent>{button}</FlexComponent>}
    </FlexComponent>
  );
};

interface PatientProfileProps {
  profile: any;
  onPress?: () => void;
}

const PatientProfile = (props: PatientProfileProps) => {
  const {profile, onPress} = props;

  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();

  const handleViewDetailsClick = () => {
    navigation.navigate('DetailsProfileScreen', {
      profile: profile,
    });
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
          text={profile.fullName}
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
              onPress={onPress ? onPress : handleViewDetailsClick}>
              <Text color={appColors.white} bold>
                {onPress ? 'Tiếp tục' : t('patientProfile.item.details')}
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
          text={profile.phoneNumber}
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
          text={formatDate(profile.dateOfBirth)}
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
          text={`${profile.streetName}, ${profile.ward?.wardName}, ${profile.district?.districtName}, ${profile.province?.provinceName}`}
        />
      </Card>
    </View>
  );
};

export default PatientProfile;
