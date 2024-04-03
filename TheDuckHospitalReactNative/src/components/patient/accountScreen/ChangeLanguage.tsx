import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColors';
import {AccountScreenRowComponent, FlexComponent} from '../..';
import {Text} from '@gluestack-ui/themed';
import {appInfo} from '../../../constants/appInfo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {English, Vietnamese} from '../../../assets/svgs';
import LoadingComponent from '../../LoadingComponent';

interface ChangeLanguageProps {}

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

const ChangeLanguage = (props: ChangeLanguageProps) => {
  const [zIndex, setZIndex] = React.useState(-1);

  const {t, i18n} = useTranslation();
  const bottomModalRef = React.useRef<BottomSheetModal>(null);

  const handleChangeLanguageClick = () => {
    bottomModalRef.current?.present();
    setZIndex(1);
  };
  return (
    <>
      <AccountScreenRowComponent
        title={t('account.language')}
        icon={<Icon name="language-outline" size={20} color={'black'} />}
        onPress={handleChangeLanguageClick}
      />
      <GestureHandlerRootView
        style={{
          height: appInfo.size.height,
          width: appInfo.size.width,
          position: 'absolute',
          zIndex: zIndex,
          left: -16,
          top: -260,
        }}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomModalRef}
            backdropComponent={() => (
              <Pressable
                style={{backgroundColor: 'rgba(0,0,0,.5)', flex: 1}}
                onPress={() => bottomModalRef.current?.close()}
              />
            )}
            onDismiss={() => {
              setZIndex(-1);
            }}
            index={0}
            snapPoints={['20%']}
            backgroundStyle={{
              borderColor: 'rgba(0,0,0,.5)',
              borderWidth: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <LoadingComponent>
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
            </LoadingComponent>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  changeLanguageButton: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default ChangeLanguage;
