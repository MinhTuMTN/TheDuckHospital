import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
const EnterHospitalPaymentCodeScreen = () => {
  const [profileCode, setProfileCode] = React.useState('');
  const handleSearch = () => {
    console.log('search');
  };
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Nhập mã hồ sơ`}
        titleSize={20}
        paddingTop={35}
        paddingBottom={20}
      />
      <View style={styles.container}>
        <View style={styles.noteContainer}>
          <Image
            source={require('../../../assets/images/information.png')}
            style={{width: 45, height: 45}}
          />
          <View style={styles.noteText}>
            <TextComponent
              color={appColors.darkRed}
              fontSize={13}
              textAlign="justify"
              fontWeight="500">
              Vui lòng kiểm tra kỹ mã thanh toán trước khi {'\n'}thực hiện thanh
              toán
            </TextComponent>
          </View>
        </View>

        <InputComponent
          inputContainerStyle={{
            borderColor: appColors.grayLight,
            borderRadius: 20,
          }}
          inputContainerFocusStyle={{
            borderColor: appColors.primaryDark,
            borderRadius: 20,
          }}
          value={profileCode}
          onChangeText={text => setProfileCode(text)}
          startIcon={
            <Fontisto
              name="search"
              color={appColors.grayLight}
              style={{
                color: appColors.primaryDark,
                fontSize: 18,
              }}
            />
          }
          placeholder="Nhập mã số hoá đơn"
          placeholderTextColor={appColors.grayLight}
          endIcon={
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={appColors.grayLight}
              style={{
                fontSize: 20,
                paddingEnd: 2,
              }}
            />
          }
        />
        <View style={styles.howToGetCode}>
          <TextComponent
            fontSize={16}
            fontWeight="600"
            textAlign="center"
            uppercase
            style={{
              letterSpacing: 0.5,
            }}>
            Gợi ý tìm mã vạch thanh toán
          </TextComponent>

          <Image
            source={require('../../../assets/images/ma-thanh-toan.png')}
            style={{width: 360, height: 180, marginTop: 20}}
          />
          <ButtonComponent
            onPress={handleSearch}
            backgroundColor={appColors.primaryDark}
            borderRadius={25}
            containerStyles={{
              paddingVertical: 12,
              width: '100%',
              marginTop: 30,
            }}
            fontWeight="500"
            fontSize={16}
            textStyles={{
              textTransform: 'uppercase',
            }}>
            thanh toán
          </ButtonComponent>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default EnterHospitalPaymentCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
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

  howToGetCode: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
