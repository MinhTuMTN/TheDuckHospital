import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {TextComponent} from '.';
import {appColors} from '../constants/appColors';

interface NotFoundComponentProps {
  style?: StyleProp<ViewStyle>;
  imageSrc?: any;
  imgStyle?: StyleProp<ImageStyle>;
  desc?: string;
  descStyle?: StyleProp<TextStyle>;
}

const NotFoundComponent = (props: NotFoundComponentProps) => {
  const {style, imageSrc, desc, imgStyle} = props;
  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        style,
      ]}>
      <Image
        source={imageSrc || require('../assets/images/chat.png')}
        style={[{width: 200, height: 200}, imgStyle]}
      />
      <TextComponent
        color={appColors.textDescription}
        fontSize={15}
        bold
        style={props.descStyle}>
        {desc || 'Không thể tìm thấy kết quả phù hợp'}
      </TextComponent>
    </View>
  );
};

export default NotFoundComponent;
