import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Fontisto from 'react-native-vector-icons/Fontisto';

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
        <View style={styles.noteContainer}>
          <Image
            source={require('../../../assets/images/information.png')}
            style={{width: 50, height: 50}}
          />
          <View style={styles.noteText}>
            <TextComponent
              uppercase
              fontWeight="500"
              color={appColors.darkRed}
              fontSize={15}>
              Lưu ý:
            </TextComponent>
            <TextComponent
              color={appColors.darkRed}
              fontSize={13}
              textAlign="justify">
              Vui lòng nhập chính xác mã hồ sơ bệnh nhân!
            </TextComponent>
          </View>
        </View>
        <View style={styles.searchView}>
          <InputComponent
            containerStyle={{
              flex: 1,
            }}
            startIcon={<Fontisto name="search" color={appColors.grayLight} />}
            placeholder="Nhập mã hồ sơ để tra cứu"
            placeholderTextColor={appColors.grayLight}
          />
        </View>
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
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  noteText: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
  },
  searchView: {
    //backgroundColor: appColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
