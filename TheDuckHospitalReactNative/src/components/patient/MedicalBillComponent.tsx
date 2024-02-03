import {Box, Flex, Text, View} from 'native-base';
import React from 'react';
import {Pressable} from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../../constants/appColors';
import {useTranslation} from 'react-i18next';

interface RowProps {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  uppercase?: boolean;
  fontWeight?: number | string;
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
    <Flex
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Flex direction="row" alignItems={'center'}>
        {icon}
        <Text color={textColor} fontWeight={fontWeight}>
          {uppercase ? text.toUpperCase() : text}
        </Text>
      </Flex>

      {button}
    </Flex>
  );
};

interface Profile {
  name: string;
  phone: string;
  dob: string;
  address: string;
}

interface MedicalBillComponentProps {
  profile: Profile;
  onPress?: () => void;
}

const MedicalBillComponent = (props: MedicalBillComponentProps) => {
  const {profile, onPress} = props;

  const {t} = useTranslation();
  return (
    <View style={{paddingBottom: 10}}>
      <Box borderWidth={4} borderColor={appColors.gray} rounded={'md'} p={5}>
        <Flex
          style={{
            rowGap: 10,
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
                onPress={() => {}}>
                <Text color={appColors.white} bold>
                  {t('medicalRecord.item.details')}
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
        </Flex>
      </Box>
    </View>
  );
};

export default MedicalBillComponent;
