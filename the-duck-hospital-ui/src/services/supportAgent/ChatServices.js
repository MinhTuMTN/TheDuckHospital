import { del, get, post } from "../AxiosInstance";

export const getConversations = () => {
  return get("/chat/conversations");
};

export const getWaitingConversations = () => {
  return get("/chat/waiting-conversations");
};

export const acceptConversation = (conversationId) => {
  return post("/chat/accept-conversation", { conversationId });
};

export const getMessages = (conversationId, sequenceNumber, direction) => {
  return get(`/chat/messages`, {
    conversationId,
    sequenceNumber,
    direction,
  });
};

export const sendMessage = (conversationId, message) => {
  return post(
    "/chat/send-message",
    {
      conversationId,
      message,
    },
    {},
    5000
  );
};

export const closeConversation = (conversationId) => {
  return del(`/chat/${conversationId}`);
};

export const checkRefundBooking = (conversationId, bookingCode) => {
  return get(`/chat/${conversationId}/refund/check-booking/${bookingCode}`);
};

export const refundBooking = (conversationId, bookingCode, refundReason) => {
  return post(`/chat/${conversationId}/refund`, {
    bookingCode,
    refundReason,
  });
};
