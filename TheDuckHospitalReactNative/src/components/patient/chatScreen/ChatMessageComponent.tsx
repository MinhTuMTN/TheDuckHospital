import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import TextComponent from '../../TextComponent';
import {Headset} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';

interface ChatMessageComponentProps {
  item: any;
}

const ChatMessageComponent = (props: ChatMessageComponentProps) => {
  const {item} = props;
  return (
    <View style={!item.supportAgent ? styles.wrapperMe : styles.wrapper}>
      {!item.supportAgent ? null : (
        <View style={styles.avatar}>
          <Headset size={24} color="white" />
        </View>
      )}
      <View style={!item.supportAgent ? styles.containerMe : styles.container}>
        <TextComponent
          style={!item.supportAgent ? styles.messageMe : styles.message}>
          {item.message}
        </TextComponent>
      </View>
    </View>
  );
};

export default memo(ChatMessageComponent);

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  wrapperMe: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: appColors.primaryDark,
    maxWidth: '70%',
    padding: 12,
    marginBottom: 8,
    marginRight: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
  },
  containerMe: {
    backgroundColor: '#f3f3f3',
    maxWidth: '70%',
    padding: 12,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 8,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 4,
  },
  message: {
    color: 'white',
  },
  messageMe: {
    color: 'black',
  },
});
