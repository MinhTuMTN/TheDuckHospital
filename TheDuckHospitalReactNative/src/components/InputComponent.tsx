import {Input, InputField, InputIcon, InputSlot} from '@gluestack-ui/themed';
import React, {forwardRef} from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputTextInputEventData,
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
  _inputContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputContainerFocusStyle?: StyleProp<ViewStyle>;
  _inputStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputFocusStyle?: StyleProp<TextStyle>;
  type?: 'text' | 'password';
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: ColorValue | undefined;
  value?: string;
  textColor?: ColorValue;
  textSize?: number;
  onChangeText?: (text: string) => void;
  onTextInput?:
    | ((e: NativeSyntheticEvent<TextInputTextInputEventData>) => void)
    | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  variant?: 'outline' | 'rounded' | 'underlined' | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  startIcon?: any;
  endIcon?: any;
}

const InputComponent = forwardRef((props: InputComponentProps, ref: any) => {
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
    _inputContainerStyle,
    inputContainerStyle,
    inputContainerFocusStyle = {
      borderColor: appColors.primary,
    },
    _inputStyle,
    inputStyle,
    inputFocusStyle,
    type = 'text',
    placeholder,
    placeholderTextColor = appColors.textDescription,
    value,
    textColor = appColors.textGray,
    textSize = 16,
    autoCapitalize,
    onChangeText,
    onTextInput,
    onFocus,
    onBlur,
    size = 'md',
    variant = 'outline',
    keyboardType = 'default',
    startIcon,
    endIcon,
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
          {height: 45},
          !_inputContainerStyle
            ? isFocus
              ? inputContainerFocusStyle
              : inputContainerStyle
            : _inputContainerStyle,
        ]}>
        {startIcon && <InputSlot pl={'$3'}>{startIcon}</InputSlot>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={type === 'password'}
          value={value}
          style={[
            {
              flex: 1,
              color: textColor,
              fontSize: textSize,
            },
            _inputStyle ? _inputStyle : isFocus ? inputFocusStyle : inputStyle,
          ]}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onTextInput={onTextInput}
          onFocus={() => {
            setIsFocus(true);
            onFocus && onFocus();
          }}
          onBlur={() => {
            setIsFocus(false);
            onBlur && onBlur();
          }}
          ref={ref}
        />
        {endIcon && (
          <InputSlot pr={'$3'}>
            <InputIcon as={endIcon} />
          </InputSlot>
        )}
      </Input>
    </View>
  );
});

export default InputComponent;
