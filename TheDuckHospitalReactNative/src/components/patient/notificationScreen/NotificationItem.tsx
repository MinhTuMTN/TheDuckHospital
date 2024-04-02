import {Card} from '@gluestack-ui/themed';
import {BellRing, Mail, MailOpen} from 'lucide-react-native';
import React, {memo, useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {NotificationState} from '../../../services/notificationServices';

interface NotificationItemProps {
  notification: any;
  onRightActionOpen?: () => void;
  onRightActionClose?: () => void;
  onRightActionPress?: () => void;
  onLeftActionPress?: () => void;
  ref?: React.LegacyRef<Swipeable> | undefined;
}

const NotificationItem = (props: NotificationItemProps) => {
  const {
    notification,
    onRightActionOpen,
    onRightActionClose,
    onRightActionPress,
    onLeftActionPress,
    ref,
  } = props;
  const [isOpenRightAction, setIsOpenRightAction] = useState(false);
  const {i18n} = useTranslation();

  const time = useMemo(() => {
    const distance = dayjs().diff(dayjs(notification?.createdAt), 'second');
    if (i18n.language === 'vi') {
      if (distance < 60) {
        return 'Vừa xong';
      } else if (distance < 3600) {
        return `${Math.floor(distance / 60)} phút trước`;
      } else if (distance < 86400) {
        return `${Math.floor(distance / 3600)} giờ trước`;
      } else {
        return `${Math.floor(distance / 86400)} ngày trước`;
      }
    } else {
      if (distance < 60) {
        return 'Just now';
      } else if (distance < 3600) {
        return `${Math.floor(distance / 60)} minutes ago`;
      } else if (distance < 86400) {
        return `${Math.floor(distance / 3600)} hours ago`;
      } else {
        return `${Math.floor(distance / 86400)} days ago`;
      }
    }
  }, [notification?.createdAt]);

  const renderRightActions = () => {
    return (
      <Card
        style={[
          styles.container,
          {
            marginLeft: -10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: '#ff4d4f',
          },
        ]}>
        <Pressable
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onRightActionPress && onRightActionPress();
          }}>
          <OcticonIcon name="trash" size={25} color={appColors.white} />
        </Pressable>
      </Card>
    );
  };
  const renderLeftActions = () => {
    return (
      <Card
        style={[
          styles.container,
          {
            marginRight: -10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: '#62bb7b',
          },
        ]}>
        <Pressable
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onLeftActionPress && onLeftActionPress();
          }}>
          {notification?.state === NotificationState.RECEIVED ? (
            <MailOpen size={25} color={appColors.white} />
          ) : (
            <Mail size={25} color={appColors.white} />
          )}
        </Pressable>
      </Card>
    );
  };

  return (
    <Swipeable
      ref={ref}
      onSwipeableWillClose={() => {
        setIsOpenRightAction(false);
        onRightActionClose && onRightActionClose();
      }}
      onSwipeableWillOpen={() => {
        setIsOpenRightAction(true);
        onRightActionOpen && onRightActionOpen();
      }}
      renderLeftActions={renderLeftActions}
      renderRightActions={(process, dragX) => {
        return renderRightActions();
      }}>
      <Card
        style={[
          styles.container,
          isOpenRightAction && {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}>
        <BellRing size={30} color={appColors.textDarker} />
        <View style={{flex: 1, rowGap: 2}}>
          <TextComponent color={appColors.textDarker} bold fontSize={18}>
            {notification?.title || 'Tiêu đề thông báo'}
          </TextComponent>
          <TextComponent
            textAlign="justify"
            color={appColors.black}
            fontSize={14}
            numberOfLines={2}>
            {notification?.content ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dolor enim, bibendum eu dolor vitae, eleifend dapibus arcu. Mauris dapibus.'}
          </TextComponent>
          <TextComponent color={appColors.textDescription} fontSize={14}>
            {time || '10 giờ trước'}
          </TextComponent>
        </View>
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
    marginBottom: 10,
    marginHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 15,
    elevation: 5,
  },
});

export default memo(NotificationItem);
