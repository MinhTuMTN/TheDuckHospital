import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {English, Vietnamese} from '../../../assets/svgs';
import {ContainerComponent, FlexComponent} from '../../../components';
import ContentComponent from '../../../components/ContentComponent';
import ChangeLanguage from '../../../components/patient/accountScreen/ChangeLanguage';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {Text} from '@gluestack-ui/themed';
import ButtonComponent from '../../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';

const languages = [
  {
    id: 'vietnamese',
    code: 'vi',
    name: 'Tiếng Việt',
    icon: <Vietnamese width={30} height={30} />,
  },
  {
    id: 'english',
    code: 'en',
    name: 'English',
    icon: <English width={30} height={30} />,
  },
];

const AccountScreen = () => {
  const bottomModalRef = React.useRef<BottomSheetModal>(null);

  const {i18n} = useTranslation();
  const navigation = useNavigation();

  const handleBtnLoginClick = () => {
    navigation.navigate('LoginScreen' as never);
  };
  return (
    <ContainerComponent paddingTop={50}>
      <ButtonComponent onPress={handleBtnLoginClick}>Đăng nhập</ButtonComponent>
      <Pressable
        onPress={() => {
          bottomModalRef.current?.close();
        }}
        style={{
          flex: 1,
        }}>
        <ContentComponent>
          <ChangeLanguage
            onPress={() => {
              bottomModalRef.current?.present();
            }}
          />
        </ContentComponent>
      </Pressable>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomModalRef}
            index={0}
            snapPoints={['40%']}
            backgroundStyle={{
              borderColor: 'rgba(0,0,0,.5)',
              borderWidth: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View style={{backgroundColor: 'white', paddingHorizontal: 15}}>
              {languages.map(language => (
                <Pressable
                  key={language.id}
                  onPress={() => {
                    bottomModalRef.current?.close();
                    i18n.changeLanguage(language.code);
                  }}>
                  <FlexComponent
                    direction="row"
                    alignItems={'center'}
                    style={{paddingVertical: 7}}>
                    {language.icon}
                    <Text
                      paddingLeft={3}
                      fontSize={18}
                      color={
                        i18n.language === language.code
                          ? appColors.primary
                          : '#000000'
                      }>
                      {language.name}
                    </Text>
                  </FlexComponent>
                </Pressable>
              ))}
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ContainerComponent>
  );
};

export default AccountScreen;
