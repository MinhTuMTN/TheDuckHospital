import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {appColors} from '../constants/appColors';
import {Text} from '@gluestack-ui/themed';

interface ButtonComponentProps {
  children: React.ReactNode | string;
  backgroundColor?: string;
  borderRadius?: number;
  textColor?: string;
  textAlignment?: 'center' | 'left' | 'right';
  fontSize?: number;
  fontWeight?:
    | '$black'
    | (string & {})
    | '$normal'
    | '$bold'
    | '$light'
    | '$hairline'
    | '$thin'
    | '$medium'
    | '$semibold'
    | '$extrabold'
    | '$extraBlack'
    | undefined;
  bold?: boolean;
  italic?: boolean;
  padding?: number;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  enabled?: boolean;
  onPress?: () => void | any;
  isLoading?: boolean;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    children,
    backgroundColor = appColors.primary,
    borderRadius = 5,
    textColor = 'white',
    textAlignment = 'center',
    fontSize = 15,
    fontWeight = '$normal',
    bold = false,
    italic = false,
    padding = 10,
    containerStyles,
    textStyles,
    enabled = true,
    onPress,
    isLoading,
  } = props;
  return (
    <View
      style={
        enabled
          ? [
              {
                backgroundColor,
                borderRadius,
                padding,
              },
              containerStyles,
            ]
          : [
              containerStyles,
              {
                ...styles.disableStyle,
                padding,
              },
            ]
      }>
      <TouchableOpacity
        onPress={() => {
          if (!isLoading && enabled && onPress) onPress();
        }}
        disabled={!enabled}>
        <View style={isLoading && styles.loadingStyle}>
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
          <Text
            style={textStyles}
            color={textColor}
            textAlign={textAlignment}
            bold={bold}
            italic={italic}
            fontSize={fontSize}
            fontWeight={fontWeight}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  disableStyle: {
    backgroundColor: appColors.gray,
    borderRadius: 20,
  },
  loadingStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
});

export default ButtonComponent;
