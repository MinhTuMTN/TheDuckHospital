import {Input, InputField} from '@gluestack-ui/themed';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {appColors} from '../constants/appColors';
import {TextComponent} from '.';

interface InputComponentProps {
  editabled?: boolean;
  disabled?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputContainerFocusStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputFocusStyle?: StyleProp<ViewStyle>;
  type?: 'text' | 'password';
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  variant?: 'outline' | 'rounded' | 'underlined' | undefined;
}

const InputComponent = (props: InputComponentProps) => {
  const {
    editabled = true,
    disabled = false,
    label,
    labelStyle = {
      fontSize: 16,
      fontWeight: '600',
    },
    containerStyle = {
      display: 'flex',
      rowGap: 5,
      marginBottom: 10,
    },
    inputContainerStyle,
    inputContainerFocusStyle = {
      borderColor: appColors.primary,
    },
    inputStyle,
    inputFocusStyle,
    type = 'text',
    placeholder,
    value,
    onChangeText,
    onFocus,
    onBlur,
    size = 'md',
    variant = 'outline',
    keyboardType = 'default',
  } = props;

  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={containerStyle}>
      {label && (
        <TextComponent color={appColors.textDescription} style={labelStyle}>
          {label}
        </TextComponent>
      )}
      <Input
        isDisabled={disabled}
        isReadOnly={!editabled}
        size={size}
        variant={variant}
        style={[
          isFocus ? inputContainerFocusStyle : inputContainerStyle,
          {height: 45},
        ]}>
        <InputField
          placeholder={placeholder}
          type={type === 'password' ? 'password' : 'text'}
          value={value}
          style={isFocus ? inputFocusStyle : inputStyle}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocus(true);
            onFocus && onFocus();
          }}
          onBlur={() => {
            setIsFocus(false);
            onBlur && onBlur();
          }}
        />
      </Input>
    </View>
  );
};

export default InputComponent;
