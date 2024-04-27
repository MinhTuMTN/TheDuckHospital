import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {appColors} from '../../../constants/appColors';
import TextComponent from '../../TextComponent';
import ButtonComponent from '../../ButtonComponent';
import {sendMessage} from '../../../services/chatServices';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';
import {useToast} from '../../../hooks/ToastProvider';
import dayjs from 'dayjs';
import {PartyPopper} from 'lucide-react-native';

interface RequestRefundBookingComponentProps {
  booking: any;
}

const RequestRefundBookingComponent = (
  props: RequestRefundBookingComponentProps,
) => {
  const {booking} = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation<navigationProps>();
  const toast = useToast();

  console.log();

  const handleRequestRefund = async () => {
    if (dayjs().diff(booking.date, 'day') > 7) {
      toast.showToast(
        'Không thể yêu cầu hoàn tiền cho phiếu khám đã quá 7 ngày',
      );
      return;
    }
    const bookingId = booking?.bookingId
      .toString()
      .slice(0, 13)
      .replace('-', '')
      .toUpperCase();
    setIsLoading(true);
    const response = await sendMessage(
      `Tôi muốn yêu cầu hoàn tiền cho phiếu khám ${bookingId}`,
    );
    setIsLoading(false);
    if (response.success) {
      navigation.navigate('ChatScreen');
    } else toast.showToast('Có lỗi xảy ra, vui lòng thử lại sau');
  };
  return (
    <View style={styles.container}>
      {booking.refunded ? (
        <>
          <PartyPopper size={24} color={appColors.primary} />
          <TextComponent
            flex={3}
            color={appColors.textDarker}
            fontWeight="500"
            fontSize={14}
            textAlign="justify">
            Bạn đã được hoàn tiền cho phiếu khám này.
          </TextComponent>
        </>
      ) : (
        <>
          <TextComponent
            flex={3}
            color={appColors.textDarker}
            fontWeight="500"
            fontSize={14}
            textAlign="justify">
            Phiếu khám đã bị huỷ do quá thời gian chờ. Bạn có thể yêu cầu hoàn
            tiền nếu có lý do chính đáng (tối đa 7 ngày sau khi phiếu khám bị
            huỷ).
          </TextComponent>
          <ButtonComponent
            isLoading={isLoading}
            onPress={handleRequestRefund}
            containerStyles={{
              flex: 1,
              backgroundColor:
                dayjs().diff(booking.date, 'day') > 7
                  ? appColors.disabled
                  : appColors.primary,
            }}>
            Yêu cầu
          </ButtonComponent>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    columnGap: 16,
    elevation: 4,
    backgroundColor: appColors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default RequestRefundBookingComponent;
