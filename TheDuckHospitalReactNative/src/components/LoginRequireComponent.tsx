import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
import {RootState, navigationProps} from '../types';
import { useSelector } from 'react-redux';

interface LoginRequireComponentProps {
  children: React.ReactNode;
}

const LoginRequireComponent = (props: LoginRequireComponentProps) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const navigation = useNavigation<navigationProps>();
  const handleNavigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={globalStyles.container}>
      {props.children}
      {!token && (
        <View style={styles.dialogWrapper}>
          <View style={styles.dialog}>
            <TextComponent
              textAlign="center"
              style={{marginBottom: 8}}
              fontSize={18}>
              Vui lòng đăng nhập để sử dụng tính năng này
            </TextComponent>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleNavigateToLogin}>
              <TextComponent color={appColors.primary} fontSize={18}>
                Đăng nhập
              </TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dialogWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    maxWidth: '75%',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default LoginRequireComponent;
