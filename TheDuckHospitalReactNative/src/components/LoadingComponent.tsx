import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {appColors} from '../constants/appColors';

interface LoadingComponentProps {
  children?: React.ReactNode;
}

const LoadingComponent = (props: LoadingComponentProps) => {
  const {children} = props;
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={appColors.primary} />
    </View>
  ) : (
    <View>{children}</View>
  );
};

export default LoadingComponent;
