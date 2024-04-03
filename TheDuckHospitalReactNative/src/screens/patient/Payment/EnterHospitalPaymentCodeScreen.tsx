import React, {useEffect} from 'react';
import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  InputComponent,
  Space,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {appInfo} from '../../../constants/appInfo';
import {Keyboard, Zap} from 'lucide-react-native';
import {QRScan} from '../../../assets/svgs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const EnterHospitalPaymentCodeScreen = () => {
  const [profileCode, setProfileCode] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const top = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: top.value}],
    };
  });
  const handleSearch = () => {
    console.log('search');
  };
  useEffect(() => {
    top.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);
  }, []);
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
          onEndIconPress={() => {
            setModalVisible(true);
          }}
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
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View
          style={[
            globalStyles.containerModal,
            {paddingHorizontal: 0, paddingVertical: 0},
          ]}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeModalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <View style={styles.content}>
              <QRCodeScanner
                containerStyle={styles.content}
                cameraStyle={{
                  width: '100%',
                  borderRadius: 20,
                }}
                onRead={e => {
                  setProfileCode(e.data);
                  setModalVisible(false);
                }}
                topContent={
                  <View style={styles.topContent}>
                    <TextComponent bold fontSize={20}>
                      Quét mã QR
                    </TextComponent>
                    <Space paddingTop={4} />
                    <TextComponent
                      fontSize={15}
                      textAlign="center"
                      fontWeight="500"
                      color={appColors.textDescription}>
                      Đưa camera vào mã QR để quét. Vui lòng giữ camera ổn định
                      để có kết quả tốt nhất
                    </TextComponent>
                    <Space paddingTop={4} />
                  </View>
                }
                bottomContent={
                  <View style={styles.bottomContent}>
                    <TextComponent
                      color={appColors.textDescription}
                      fontWeight="600">
                      Đang quét mã...
                    </TextComponent>
                    <Space paddingTop={4} />
                    <FlexComponent
                      direction="row"
                      justifyContent="center"
                      columnGap={12}>
                      <Pressable
                        onPress={() => {
                          setModalVisible(false);
                        }}>
                        <Keyboard size={28} color={appColors.textDescription} />
                      </Pressable>
                      <Pressable>
                        <Zap size={28} color={appColors.textDescription} />
                      </Pressable>
                    </FlexComponent>
                  </View>
                }
              />
              <View style={styles.scanFrame}>
                <QRScan width={200} height={200} />
                <Animated.View style={[styles.indicator, animatedStyles]} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  modalView: {
    backgroundColor: appColors.white,
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  closeModalButton: {
    width: 60,
    height: 4,
    backgroundColor: appColors.grayLight,
    alignSelf: 'center',
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  topContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: appInfo.size.width - 16,
    marginLeft: -16,
    marginTop: -32,
  },
  bottomContent: {
    marginTop: 32,
  },
  scanFrame: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: '50%',
    left: '50%',
    marginLeft: -100,
    marginTop: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 200,
    height: 3,
    backgroundColor: appColors.primary,
    position: 'absolute',
    left: '50%',
    marginLeft: -100,
    marginTop: -1,
    top: 0,
  },
});
