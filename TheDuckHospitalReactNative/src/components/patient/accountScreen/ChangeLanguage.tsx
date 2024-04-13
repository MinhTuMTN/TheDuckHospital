import {Text} from '@gluestack-ui/themed';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AccountScreenRowComponent, FlexComponent} from '../..';
import {English, Vietnamese} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';
import PopupComponent from '../../PopupComponent';

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
  const [modalVisible, setModalVisible] = React.useState(false);

  const {t, i18n} = useTranslation();

  const handleChangeLanguageClick = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <AccountScreenRowComponent
        title={t('account.language')}
        icon={<Icon name="language-outline" size={20} color={'black'} />}
        onPress={handleChangeLanguageClick}
      />
      <PopupComponent
        title={t('account.changeLanguage')}
        titleStyle={{
          color: appColors.textDarker,
          fontSize: 20,
          fontWeight: 'bold',
        }}
        variant="default"
        onClose={handleModalClose}
        visible={modalVisible}
        closeButton>
        <View style={{width: '100%'}}>
          {languages.map(language => (
            <Pressable
              key={language.id}
              onPress={() => {
                handleModalClose();
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
      </PopupComponent>
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
