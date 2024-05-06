import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  Header,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ButtonComponent from '../../../components/ButtonComponent';
import InfoProfileSearchComponent from '../../../components/patient/lookUpMedicalResults/InfoProfileSearchComponent';
import {getPatientProfileByPatientCode} from '../../../services/patientProfileServices';

const EnterProfileCode = () => {
  const [profileCode, setProfileCode] = React.useState('');
  const [haveFind, setHaveFind] = React.useState(false);
  const [profileData, setProfileData] = React.useState<any>([]);
  const handleSearch = async () => {
    const result = await getPatientProfileByPatientCode(profileCode);

    if (result.success) {
      setHaveFind(true);
      setProfileData(result.data.data);
    } else {
      setHaveFind(false);
      console.log('Không tìm thấy mã hồ sơ');
    }
  };

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Nhập mã hồ sơ`}
        titleSize={20}
        paddingTop={32}
        paddingStart={20}
        noBackground
        backgroundColor={appColors.darkBlue}
        titleColor={appColors.white}
        backButtonColor={appColors.white}
      />
      <View style={styles.container}>
        <View style={styles.noteContainer}>
          <Image
            source={require('../../../assets/images/information.png')}
            style={{width: 45, height: 45}}
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
            inputContainerStyle={{
              borderColor: appColors.primaryDark,
              borderRadius: 10,
            }}
            value={profileCode}
            autoFocus
            onChangeText={text => setProfileCode(text)}
            startIcon={
              <Fontisto
                name="search"
                color={appColors.grayLight}
                style={{
                  color: appColors.darkerBlue,
                  fontSize: 18,
                }}
              />
            }
            placeholder="Nhập mã hồ sơ để tra cứu"
            placeholderTextColor={appColors.grayLight}
          />

          <ButtonComponent
            onPress={handleSearch}
            backgroundColor={appColors.darkerBlue}
            borderRadius={10}
            fontWeight="600"
            containerStyles={{marginLeft: 10, paddingVertical: 12}}>
            Tra cứu
          </ButtonComponent>
        </View>
        {haveFind ? (
          <View style={styles.resultContainer}>
            <TextComponent
              style={{
                letterSpacing: 0.5,
              }}
              fontSize={18}
              fontWeight="600"
              color={appColors.primaryDark}>
              Kết quả tra cứu:
            </TextComponent>
            {profileData.map((item: any, index: number) => (
              <InfoProfileSearchComponent key={index} info={item} />
            ))}
          </View>
        ) : (
          <View style={styles.howToGetCode}>
            <TextComponent fontSize={16} fontWeight="600" textAlign="center">
              Nhập mã bệnh nhân trên toa thuốc
            </TextComponent>
            <TextComponent
              fontSize={15}
              fontWeight="400"
              textAlign="center"
              style={{
                marginTop: 4,
              }}>
              (Hoặc giấy tờ khám chữa bệnh)
            </TextComponent>

            <Image
              source={require('../../../assets/images/BienLai.png')}
              style={{width: 360, height: 180, marginTop: 10}}
            />
          </View>
        )}
      </View>
    </ContainerComponent>
  );
};

export default EnterProfileCode;

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
  searchView: {
    //backgroundColor: '#ee8282',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  howToGetCode: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  resultContainer: {
    flexDirection: 'column',
    borderTopColor: appColors.primaryDark,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    paddingTop: 10,
  },
});
