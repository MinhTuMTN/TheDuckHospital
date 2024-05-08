import {useNavigation} from '@react-navigation/native';
import {CircleX, Delete} from 'lucide-react-native';
import React, {memo, useEffect} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {checkPinCode} from '../../../services/walletServices';
import {navigationProps} from '../../../types';
import PopupComponent from '../../PopupComponent';
import {useTranslation} from 'react-i18next';

interface RequestPinCodeComponentProps {
  visible?: boolean;
  onSucess?: (pinCode: string) => Promise<void>;
  onClosed?: () => void;
  children?: React.ReactNode;
}

const RequestPinCodeComponent = (props: RequestPinCodeComponentProps) => {
  const {children, visible = true, onSucess, onClosed} = props;

  const [modalVisible, setModalVisible] = React.useState(visible);
  const [pinCode, setPinCode] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<navigationProps>();
  const {t, i18n} = useTranslation();

  const handleForgotPinCode = () => {
    const message = t('wallet.forgotPinCodeMessage');
    setMessage(message);
  };
  const handleOnClose = () => {
    setModalVisible(false);
    if (onClosed) {
      onClosed();
    } else {
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    const handleCheckPinCode = async () => {
      setLoading(true);
      const response = await checkPinCode(pinCode);
      setLoading(false);

      if (!response.success) {
        setMessage('Đã xảy ra lỗi, vui lòng thử lại sau');
        return;
      }

      if (!response.data.data) {
        setMessage('Mã PIN không chính xác');
        setPinCode('');
        return;
      }

      if (onSucess) {
        await onSucess(pinCode);
      } else {
        setModalVisible(false);
      }
    };

    if (pinCode.length === 6) {
      handleCheckPinCode();
    }
  }, [pinCode]);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <>
      {children}
      <PopupComponent
        visible={modalVisible}
        onClose={handleOnClose}
        title={t('wallet.enterPinCode')}>
        <View style={styles.container}>
          <View style={styles.pinCodeContainer}>
            {[0, 1, 2, 3, 4, 5].map((item, index) => (
              <View
                key={index}
                style={[
                  styles.pinCode,
                  pinCode.at(index)
                    ? {backgroundColor: appColors.grayLight}
                    : {},
                ]}
              />
            ))}

            <CircleX
              size={20}
              color={appColors.grayLight}
              onPress={() => {
                setPinCode('');
              }}
              style={{
                position: 'absolute',
                right: 10,
              }}
            />
          </View>
          {message && (
            <TextComponent
              textAlign="center"
              style={{maxWidth: '80%'}}
              color={appColors.error}
              fontWeight="500"
              fontSize={15}>
              {message}
            </TextComponent>
          )}
          {loading && (
            <ActivityIndicator size="small" color={appColors.primary} />
          )}

          <Pressable style={styles.forgotPinCode} onPress={handleForgotPinCode}>
            <TextComponent color={appColors.textDarker} fontWeight="500">
              {t('wallet.forgotPinCode')}
            </TextComponent>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              columnGap: 12,
              rowGap: 6,
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2].map((item, index) =>
              item === -1 ? (
                <View key={`button-${index}`} style={{width: '30%'}} />
              ) : item === -2 ? (
                <Pressable
                  key={`button-${index}`}
                  style={styles.button}
                  onPress={() => {
                    setMessage('');
                    setPinCode(prev => prev.slice(0, -1));
                  }}>
                  <Delete size={24} color={appColors.black} />
                </Pressable>
              ) : (
                <Pressable
                  key={`button-${index}`}
                  style={styles.button}
                  onPress={() => {
                    if (pinCode.length < 6) {
                      setMessage('');
                      setPinCode(prev => prev + item.toString());
                    }
                  }}>
                  <TextComponent fontWeight="500">{item}</TextComponent>
                </Pressable>
              ),
            )}
          </View>
        </View>
      </PopupComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  pinCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: appColors.grayLight,
    borderRadius: 32,
    marginBottom: 8,
    marginTop: 12,
  },
  forgotPinCode: {
    paddingVertical: 12,
    marginBottom: 12,
  },
  pinCode: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#cdcdcd',
    margin: 5,
  },
  button: {
    flexBasis: '30%',
    backgroundColor: '#cdcdcd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
  },
});

export default memo(RequestPinCodeComponent);
