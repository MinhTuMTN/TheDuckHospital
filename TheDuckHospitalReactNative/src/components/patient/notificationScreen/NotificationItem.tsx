import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {Card, set} from '@gluestack-ui/themed';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NotificationItemProps {
  title?: string;
  content?: string;
  time?: string;
  onRightActionOpen?: () => void;
  onRightActionClose?: () => void;
  onRightActionPress?: () => void;
  ref?: React.LegacyRef<Swipeable> | undefined;
}

const NotificationItem = (props: NotificationItemProps) => {
  const {
    title,
    content,
    time,
    onRightActionOpen,
    onRightActionClose,
    onRightActionPress,
    ref,
  } = props;
  const [isOpenRightAction, setIsOpenRightAction] = useState(false);
  const renderRightActions = () => {
    return (
      <Card
        style={[
          styles.container,
          {
            marginLeft: -10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: '#fc5f51',
          },
        ]}>
        <Pressable
          onPress={() => {
            onRightActionPress && onRightActionPress();
          }}>
          <OcticonIcon name="trash" size={25} color={appColors.white} />
        </Pressable>
      </Card>
    );
  };
  return (
    <Swipeable
      ref={ref}
      onSwipeableClose={() => {
        setIsOpenRightAction(false);
        onRightActionClose && onRightActionClose();
      }}
      onSwipeableOpen={() => {
        setIsOpenRightAction(true);
        onRightActionOpen && onRightActionOpen();
      }}
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
        <Icon name="notifications" size={30} color={appColors.primary} />
        <View style={{flex: 1}}>
          <TextComponent color={appColors.black} bold fontSize={18}>
            {title || 'Thông báo'}
          </TextComponent>
          <TextComponent textAlign="justify" color={appColors.textDescription}>
            {content || 'Nội dung thông báo'}
          </TextComponent>
          <TextComponent color={appColors.textPrimary} fontSize={15}>
            {time || 'Thời gian'}
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
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 7,
  },
});

export default NotificationItem;
