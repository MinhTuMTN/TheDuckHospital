import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

interface FormControlComponentProps {
  children: any;
  onErrors?: (errors: boolean) => void;
}

const FormControlComponent = (props: FormControlComponentProps) => {
  const {children} = props;

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

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
};

export default FormControlComponent;
