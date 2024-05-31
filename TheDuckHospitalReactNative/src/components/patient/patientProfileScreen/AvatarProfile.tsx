import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
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
import DeleteProfileAlertComponent from './DeleteProfileAlertComponent';
import dayjs from 'dayjs';
import {updatePatientProfile} from '../../../services/patientProfileServices';

interface AvatarProfileProps {
  editProfile: any;
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  firstClick: boolean;
  setFirstClick: any;
}
const AvatarProfile = (props: AvatarProfileProps) => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  const {
    editProfile,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    firstClick,
    setFirstClick,
  } = props;
  const navigation = useNavigation();

  const handleUpdatePatientProfile = async () => {
    if (firstClick) setFirstClick(false);
    console.log(0);

    if (
      editProfile.fullPhoneNumber.length !== 10 ||
      !editProfile.fullPhoneNumber.startsWith('0')
    )
      return;

    if (
      editProfile.email.length > 0 &&
      !editProfile.email.includes('@theduckhospital.onmicrosoft.com')
    )
      return;

    if (selectedProvince.provinceName.length <= 0) return;
    if (selectedDistrict.districtName.length <= 0) return;
    if (selectedWard.wardName.length <= 0) return;
    if (editProfile.streetName.length <= 0) return;

    console.log(1);
    let wardId: number = +selectedWard?.wardId;
    const data = {
      fullName: editProfile.fullName,
      phoneNumber: editProfile.fullPhoneNumber,
      dateOfBirth: dayjs(editProfile.dateOfBirth).toISOString(),
      gender: editProfile.gender === 'Nam' ? 0 : 1,
      wardId: wardId,
      streetName: editProfile.streetName,
      email: editProfile.email,
      identityNumber: editProfile.identity,
      nationId: editProfile.nation?.nationId,
    };
    const response = await updatePatientProfile(
      editProfile.patientProfileId,
      data,
    );

    if (response.success) {
      if (!firstClick) setFirstClick(true);
      navigation.navigate('ProfileScreen' as never);
    }
  };

  const toggleAlert = () => {
    setShowAlertDialog(!showAlertDialog);
  };
  return (
    <View>
      {/* Cover Image */}
      <ImageBackground
        style={styles.avatarContainer}
        source={require('../../../assets/images/cover-image.jpg')}></ImageBackground>

      {/* Avatar and Name */}
      <View style={styles.avatarText}>
        <Avatar size={'lg'} style={styles.avatar}>
          <AvatarFallbackText>{editProfile.fullName}</AvatarFallbackText>
          <AvatarBadge bg="green" />
        </Avatar>
        <Text bold fontSize={20} paddingTop={10} textTransform={'uppercase'}>
          {editProfile.fullName}
        </Text>
      </View>

      <FlexComponent direction="row" justifyContent={'center'}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate('HomeScreen' as never)}>
          <Icon name="home" size={30} color={appColors.primary} />
        </Pressable>
        <TouchableOpacity
          disabled={
            editProfile.fullPhoneNumber.length !== 10 ||
            (editProfile.email.length > 0 &&
              !editProfile.email.includes(
                '@theduckhospital.onmicrosoft.com',
              )) ||
            !editProfile.fullPhoneNumber.startsWith('0') ||
            selectedProvince.provinceName.trim() === '' ||
            selectedDistrict.districtName.trim() === '' ||
            selectedWard.wardName.trim() === '' ||
            editProfile.streetName.trim() === ''
          }
          style={styles.iconButton}
          onPress={handleUpdatePatientProfile}>
          <Icon
            name="mode-edit-outline"
            size={30}
            color={
              editProfile.fullPhoneNumber.length !== 10 ||
              (editProfile.email.length > 0 &&
                !editProfile.email.includes(
                  '@theduckhospital.onmicrosoft.com',
                )) ||
              !editProfile.fullPhoneNumber.startsWith('0') ||
              selectedProvince.provinceName.trim() === '' ||
              selectedDistrict.districtName.trim() === '' ||
              selectedWard.wardName.trim() === '' ||
              editProfile.streetName.trim() === ''
                ? appColors.darkGray
                : appColors.primary
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleAlert}>
          <Icon name="delete-outline" size={30} color={appColors.primary} />
        </TouchableOpacity>
      </FlexComponent>

      <DeleteProfileAlertComponent
        patientProfileId={editProfile.patientProfileId}
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
      />
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
