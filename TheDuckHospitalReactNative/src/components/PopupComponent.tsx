// Create Popup Component use Modal
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {Space, TextComponent} from '.';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PopupComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closeButton?: boolean;
  children?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  variant?: 'default' | 'float';
}

const PopupComponent = (props: PopupComponentProps) => {
  const {
    visible,
    onClose,
    title,
    closeButton,
    children,
    titleStyle,
    variant = 'float',
  } = props;
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      visible={visible}>
      <View
        style={
          variant === 'float'
            ? globalStyles.containerModal
            : globalStyles.containetModalDefault
        }>
        <View
          style={[
            styles.modalView,
            variant === 'default' && styles.modalViewDefault,
          ]}>
          {closeButton && (
            <Pressable
              style={{
                position: 'absolute',
                right: 25,
                top: 25,
              }}
              onPress={onClose}>
              <AntDesign
                name="closecircle"
                size={24}
                color={appColors.grayLight}
              />
            </Pressable>
          )}
          {title && (
            <TextComponent
              textAlign="center"
              fontWeight="600"
              fontSize={16}
              style={titleStyle}>
              {title}
            </TextComponent>
          )}
          <Space paddingTop={4} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewDefault: {
    borderRadius: 0,
    marginBottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default PopupComponent;
