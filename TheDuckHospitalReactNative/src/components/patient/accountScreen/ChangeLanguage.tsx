import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../../constants/appColors';
import {FlexComponent} from '../..';
import {Text} from '@gluestack-ui/themed';

interface ChangeLanguageProps {
  onPress: () => void;
}

const ChangeLanguage = (props: ChangeLanguageProps) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlexComponent
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}>
        <FlexComponent direction="row" alignItems={'center'}>
          <Icon
            name="language-outline"
            size={20}
            color={'black'}
            style={{paddingEnd: 10}}
          />
          <Text color={'black'} fontSize={17}>
            {t('account.language')}
          </Text>
        </FlexComponent>

        <Pressable style={styles.changeLanguageButton} onPress={props.onPress}>
          <Text color={'white'}>
            {i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
          </Text>
        </Pressable>
      </FlexComponent>
    </View>
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
