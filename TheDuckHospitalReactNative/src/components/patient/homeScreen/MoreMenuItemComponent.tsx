import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {useToast} from '../../../hooks/ToastProvider';

interface MoreMenuItemComponentProps {
  text: string;
  image: any;
  screenNavigate?: string;
}

const MoreMenuItemComponent = (props: MoreMenuItemComponentProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();
  return (
    <Pressable
      onPress={() => {
        if (props.screenNavigate) {
          navigation.navigate(props.screenNavigate);
        }
        toast.showToast('Tính năng đang được phát triển. Hẹn sớm gặp lại bạn!');
      }}
      style={[styles.container]}>
      <Image
        source={props.image}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <TextComponent
        fontSize={18}
        style={{
          maxWidth: '80%',
        }}>
        {t(props.text)}
      </TextComponent>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    width: '80%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    zIndex: 1,
    elevation: 1,

    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,

    marginBottom: 8,
  },
});

export default MoreMenuItemComponent;
