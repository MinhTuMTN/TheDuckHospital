import {View, ImageBackground, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  Text,
} from '@gluestack-ui/themed';
import {FlexComponent} from '../..';

interface AvatarProfileProps {
  profile: any;
}
const AvatarProfile = (props: AvatarProfileProps) => {
  const {profile} = props;
  const navigation = useNavigation();
  return (
    <View>
      {/* Cover Image */}
      <ImageBackground
        style={styles.avatarContainer}
        source={require('../../../assets/images/cover-image.jpg')}></ImageBackground>

      {/* Avatar and Name */}
      <View style={styles.avatarText}>
        <Avatar size={'lg'} style={styles.avatar}>
          <AvatarFallbackText>{profile.fullName}</AvatarFallbackText>
          <AvatarBadge bg="green" />
        </Avatar>
        <Text bold fontSize={20} paddingTop={10} textTransform={'uppercase'}>
          {profile.fullName}
        </Text>
      </View>

      <FlexComponent direction="row" justifyContent={'center'}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name="home" size={30} color={appColors.primary} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Icon name="mode-edit-outline" size={30} color={appColors.primary} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Icon name="delete-outline" size={30} color={appColors.primary} />
        </Pressable>
      </FlexComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    height: 150,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarText: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: -40,
  },
  avatar: {
    backgroundColor: appColors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
});

export default AvatarProfile;
