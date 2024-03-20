import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import {appInfo} from '../../../constants/appInfo';

const EnterProfileCode = () => {
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Nhập mã hồ sơ`}
        titleSize={20}
        paddingTop={45}
        paddingBottom={20}
      />
      <View style={styles.container}>
        <TextComponent>EnterProfileCode</TextComponent>
      </View>
    </ContainerComponent>
  );
};

export default EnterProfileCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    rowGap: 16,
  },
  buttonAddProfile: {
    position: 'absolute',
    width: appInfo.size.width,
    bottom: 32,
    paddingHorizontal: appInfo.size.width * 0.1,
  },
});
