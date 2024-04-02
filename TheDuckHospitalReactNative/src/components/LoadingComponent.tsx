import {
  View,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
import {appColors} from '../constants/appColors';

interface LoadingComponentProps {
  children?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const LoadingComponent = (props: LoadingComponentProps) => {
  const {children, styles} = props;
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      <ActivityIndicator size="large" color={appColors.primary} />
    </View>
  ) : (
    <View style={styles}>{children}</View>
  );
};

export default LoadingComponent;
