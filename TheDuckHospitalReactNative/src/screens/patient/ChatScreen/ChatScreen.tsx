import React, {useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {ContainerComponent, Header, TextComponent} from '../../../components';
import ChatMessageComponent from '../../../components/patient/chatScreen/ChatMessageComponent';
import InputChatComponent from '../../../components/patient/chatScreen/InputChatComponent';
import {appColors} from '../../../constants/appColors';
import {appInfo} from '../../../constants/appInfo';
import {useToast} from '../../../hooks/ToastProvider';
import {getMessages, sendMessage} from '../../../services/chatServices';
import {AppNotification} from '../../../utils/appNotification';

const ChatScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [conversation, setConversation] = React.useState<any>({
    minSequenceNumber: 1,
    maxSequenceNumber: 0,
  });
  const flatListRef = useRef<FlatList>(null);

  const _renderItem = useCallback(({item}: {item: any}) => {
    return <ChatMessageComponent item={item} />;
  }, []);
  const _keyExtractor = useCallback(
    (item: any, index: number) => `chat-message-${index}`,
    [],
  );
  const _footerComponent = useCallback(() => {
    if (isLoading)
      return (
        <View
          style={[
            styles.loading,
            conversation === null && {
              height: appInfo.size.height,
            },
          ]}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      );
    else if (conversation?.minSequenceNumber === 1) {
      return (
        <View style={styles.loading}>
          <TextComponent color={appColors.textDescription}>
            Không còn tin nhắn nào để hiển thị
          </TextComponent>
        </View>
      );
    }
    return null;
  }, [isLoading, conversation]);
  const loadMore = useCallback(async () => {
    if (isLoading || conversation.minSequenceNumber === 1) return;

    setIsLoading(true);
    const response = await getMessages(
      conversation.minSequenceNumber,
      'previous',
    );
    setIsLoading(false);
    setMessages((prev: any) => [...prev, ...response.data.data.messages]);
    setConversation((prev: any) => {
      return {
        ...prev,
        minSequenceNumber:
          response.data.data.messages[response.data.data.messages.length - 1]
            ?.sequenceNumber,
      };
    });
  }, [conversation, isLoading]);
  const toast = useToast();
  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev: any) => [
      {
        message,
        supportAgent: false,
        sequenceNumber: prev.maxSequenceNumber + 1,
      },
      ...prev,
    ]);
    setConversation((prev: any) => {
      const newConversation = {...prev};
      newConversation.maxSequenceNumber += 1;
      return newConversation;
    });
    const response = await sendMessage(message);

    if (!response.success) toast.showToast('Gửi tin nhắn thất bại');
  }, []);

  useEffect(() => {
    AppNotification.subscribeToNotification(data => {
      const newSequenceNumber = conversation.maxSequenceNumber + 1;
      setConversation((prev: any) => {
        const newConversation = {...prev};
        newConversation.maxSequenceNumber = newSequenceNumber;
        return newConversation;
      });
      setMessages((prev: any) => [
        {
          message: data.data.body,
          supportAgent: true,
          sequenceNumber: newSequenceNumber,
        },
        ...prev,
      ]);
    });

    return () => AppNotification.unsubscribeToNotification();
  }, [conversation]);

  useEffect(() => {
    const handleGetMessage = async () => {
      setIsLoading(true);
      const response = await getMessages(-1, 'previous');
      setIsLoading(false);

      if (response.success) {
        const listMessages = response.data.data.messages;
        if (!listMessages || listMessages.length === 0) return;
        setMessages(listMessages);
        setConversation({
          ...response.data.data.conversation,
          minSequenceNumber:
            listMessages[listMessages.length - 1].sequenceNumber,
        });
      }
    };

    handleGetMessage();
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title="Hỗ trợ"
        noBackground
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#ffffff',
        }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          initialNumToRender={15}
          onEndReachedThreshold={0.1}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          inverted
          onEndReached={loadMore}
          ListFooterComponent={_footerComponent}
        />
      </View>
      <InputChatComponent
        onSend={(message: string) => {
          handleSendMessage(message);
        }}
      />
    </ContainerComponent>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 24,
  },
});
