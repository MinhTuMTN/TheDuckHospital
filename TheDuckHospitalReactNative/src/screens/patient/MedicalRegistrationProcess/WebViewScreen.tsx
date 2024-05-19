import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {useToast} from '../../../hooks/ToastProvider';

const WebViewScreen = ({route}: {route: any}) => {
  const {url} = route.params;
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();

  const handleNavigationStateChange = (event: any) => {
    const targetUrl = 'https://the-duck-hospital.web.app/payment';

    if (event.url.toString().includes(targetUrl)) {
      navigation.reset({
        index: 0,
        routes: [{name: 'PatientBottom'}],
      });

      toast.showToast('Thanh toán thành công');
    }
  };

  return (
    <WebView
      source={{uri: url || 'https://the-duck-hospital.web.app'}}
      style={styles.webView}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginTop: 32,
  },
});

export default WebViewScreen;
