import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputComponent from '../../InputComponent';
import {Send} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';

const InputChatComponent = () => {
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
        />
        <Pressable style={styles.sendButton}>
          <Send size={24} color={appColors.white} />
        </Pressable>
      </View>
    </View>
  );
};

export default InputChatComponent;

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
