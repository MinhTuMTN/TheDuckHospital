import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface FormControlComponentProps {
  children: any;
  onErrors?: (errors: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const FormControlComponent = (props: FormControlComponentProps) => {
  const {
    children,
    containerStyle = {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  } = props;

  React.useEffect(() => {
    let hasError = false;
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) return;

      if ((element.props as {error?: any})?.error) {
        hasError = true;
        return;
      }
    });

    props.onErrors?.(hasError);
  }, [children]);

  return <View style={containerStyle}>{children}</View>;
};

export default FormControlComponent;
