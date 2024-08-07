import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {Camera} from 'lucide-react-native';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../components';
import ButtonComponent from '../../components/ButtonComponent';
import {appColors} from '../../constants/appColors';
import {useAuth} from '../../hooks/AuthHooks';
import {useToast} from '../../hooks/ToastProvider';
import {updateProfile} from '../../services/authServices';
import {RootState, navigationProps} from '../../types';
import {useTranslation} from 'react-i18next';

const ChangeAccountInfoScreen = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [fullName, setFullName] = useState<string>(userInfo.fullName as string);
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();
  const toast = useToast();
  const navigation = useNavigation<navigationProps>();
  const {t, i18n} = useTranslation();

  const handleGetImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });

    if (result.assets) {
      setUploadImage(result.assets[0]);
    }
  }, []);

  const handleUpdateProfile = useCallback(async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    if (uploadImage) {
      formData.append('avatar', {
        name: uploadImage.fileName,
        type: uploadImage.type,
        uri: uploadImage.uri,
      });
    }

    setIsLoading(true);
    const response = await updateProfile(formData);
    setIsLoading(false);

    if (response.success) {
      auth.handleCheckToken();

      const message =
        i18n.language === 'en'
          ? 'Update successfully'
          : 'Cập nhật thông tin thành công';
      toast.showToast(message);
      navigation.goBack();
    }
  }, [uploadImage, fullName, auth]);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('changeAccountInfo.title')}
        showBackButton={true}
        paddingTop={0}
        noBackground
        backButtonColor={appColors.white}
        backgroundColor={appColors.darkerBlue}
        paddingBottom={0}
      />
      <ContentComponent style={styles.container} paddingTop={0}>
        <View style={styles.avatarContainer}>
          <Avatar size="lg">
            <Pressable style={styles.avatar} onPress={handleGetImage}>
              <AvatarFallbackText size="lg">
                {userInfo.fullName}
              </AvatarFallbackText>
              <View style={styles.cameraButton}>
                <Camera size={28} color={appColors.white} />
              </View>
              {(uploadImage || userInfo.avatar) && (
                <AvatarImage
                  alt="avatar"
                  source={{
                    uri:
                      uploadImage !== null ? uploadImage.uri : userInfo.avatar,
                  }}
                />
              )}
            </Pressable>
          </Avatar>

          <View>
            <TextComponent
              style={{marginTop: 8, color: appColors.textDarker}}
              fontSize={20}
              fontWeight="500">
              {userInfo.fullName}
            </TextComponent>
            <TextComponent style={{marginTop: 8, color: appColors.textDarker}}>
              {userInfo.phoneNumber}
            </TextComponent>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <InputComponent
            label={t('changeAccountInfo.fullName')}
            value={fullName}
            onChangeText={(text: string) => setFullName(text)}
            labelStyle={styles.labelStyle}
            _inputContainerStyle={styles.inputContainerStyle}
          />
          <InputComponent
            label={t('changeAccountInfo.phoneNumber')}
            value={userInfo.phoneNumber}
            disabled
            labelStyle={styles.labelStyle}
            _inputContainerStyle={styles.inputContainerStyle}
          />

          <InputComponent
            label={t('changeAccountInfo.numberOfCreatedProfiles')}
            value={
              userInfo.numberOfProfile
                ? userInfo.numberOfProfile.toString()
                : '0'
            }
            disabled
            labelStyle={styles.labelStyle}
            _inputContainerStyle={styles.inputContainerStyle}
          />

          <InputComponent
            label={t('changeAccountInfo.createdAt')}
            value={dayjs(userInfo.createdAt).format('DD/MM/YYYY HH:mm')}
            disabled
            labelStyle={styles.labelStyle}
            _inputContainerStyle={styles.inputContainerStyle}
          />
        </View>

        <ButtonComponent
          isLoading={isLoading}
          onPress={handleUpdateProfile}
          borderRadius={8}
          backgroundColor={appColors.darkerBlue}>
          {t('changeAccountInfo.save')}
        </ButtonComponent>
      </ContentComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: appColors.textDarker,
    fontWeight: '500',
  },
  inputContainerStyle: {
    width: '100%',
    paddingLeft: 6,
    borderRadius: 8,
  },
  contentContainer: {
    marginVertical: 16,
    rowGap: 16,
  },
  container: {
    marginTop: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    columnGap: 16,
  },
  avatar: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    right: -5,
    bottom: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // '#00000080
    padding: 4,
    borderRadius: 20,
    zIndex: 1,
  },
});
export default ChangeAccountInfoScreen;
