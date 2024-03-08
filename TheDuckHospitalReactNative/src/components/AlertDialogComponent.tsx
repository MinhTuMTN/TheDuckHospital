import React from 'react';
import {ColorValue, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonGroup,
  Heading,
} from '@gluestack-ui/themed';
import {appColors} from '../constants/appColors';
import {FlexComponent, TextComponent} from '.';
import ButtonComponent from './ButtonComponent';

interface AlertDialogComponentProps {
  showAlertDialog?: boolean;
  headerBackgroundColor?: string;
  headerIcon?: any;
  headerLabel?: string;
  bodyTextSize?: number | undefined;
  bodyText?: string;
  acceptButtonStyles?: StyleProp<ViewStyle>;
  acceptButtonText?: string;
  acceptButtonTextColor?: ColorValue | undefined;
  onClose?: () => void;
  onAccept?: () => void;
}

const AlertDialogComponent = (props: AlertDialogComponentProps) => {
  const {
    showAlertDialog,
    headerBackgroundColor,
    headerIcon,
    headerLabel,
    bodyTextSize,
    bodyText,
    acceptButtonStyles,
    acceptButtonText,
    acceptButtonTextColor,
    onClose,
    onAccept,
  } = props;

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader backgroundColor={headerBackgroundColor}>
          <FlexComponent style={{flexDirection: 'row', alignItems: 'center'}}>
            {headerIcon}
            <Heading
              fontSize={24}
              color={appColors.white}
              style={{
                marginLeft: 10,
              }}>
              {headerLabel}
            </Heading>
          </FlexComponent>
          <AlertDialogCloseButton>
            <Icon name="close" size={24} color={appColors.white} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <TextComponent fontSize={bodyTextSize}>{bodyText}</TextComponent>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <ButtonComponent
              onPress={onAccept}
              containerStyles={acceptButtonStyles}>
              <TextComponent bold color={acceptButtonTextColor}>
                {acceptButtonText}
              </TextComponent>
            </ButtonComponent>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
