import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';

interface MoreMenuItemComponentProps {
  text: string;
  image: any;
}

const MoreMenuItemComponent = (props: MoreMenuItemComponentProps) => {
  return (
    <View style={[styles.container]}>
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
        {props.text}
      </TextComponent>
    </View>
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
