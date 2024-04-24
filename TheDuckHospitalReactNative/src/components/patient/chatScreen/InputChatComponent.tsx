import {Send} from 'lucide-react-native';
import React, {memo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {appColors} from '../../../constants/appColors';
import InputComponent from '../../InputComponent';

interface InputChatComponentProps {
  onSend?: (message: string) => void;
}

const InputChatComponent = (props: InputChatComponentProps) => {
  const {onSend} = props;
  const [message, setMessage] = useState<string>('');
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <InputComponent
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Nhập tin nhắn"
          containerStyle={styles.inputContainer}
          _inputContainerStyle={{borderWidth: 0}}
          returnKeyType="send"
          onSubmitEditing={() => {
            onSend && onSend(message);
            setMessage('');
          }}
        />
        <Pressable
          style={styles.sendButton}
          onPress={() => {
            onSend && onSend(message);
            setMessage('');
          }}>
          <Send size={24} color={appColors.white} />
        </Pressable>
      </View>
    </View>
  );
};

export default memo(InputChatComponent);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderWidth: 0,
    borderRadius: 20,
  },
  container: {
    borderRadius: 20,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    elevation: 4,
  },
  sendButton: {
    backgroundColor: appColors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
