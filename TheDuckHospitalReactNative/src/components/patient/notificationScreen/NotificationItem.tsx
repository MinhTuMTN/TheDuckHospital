import {Card} from '@gluestack-ui/themed';
import {BellRing} from 'lucide-react-native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import {TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';

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
      onSwipeableWillClose={() => {
        setIsOpenRightAction(false);
        onRightActionClose && onRightActionClose();
      }}
      onSwipeableWillOpen={() => {
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
        <BellRing size={30} color={appColors.textDarker} />
        <View style={{flex: 1, rowGap: 2}}>
          <TextComponent color={appColors.textDarker} bold fontSize={18}>
            {title || 'Tiêu đề thông báo'}
          </TextComponent>
          <TextComponent
            textAlign="justify"
            color={appColors.black}
            fontSize={14}
            numberOfLines={2}>
            {content ||
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

export default NotificationItem;
