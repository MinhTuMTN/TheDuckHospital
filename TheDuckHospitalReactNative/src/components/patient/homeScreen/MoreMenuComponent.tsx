import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {TextComponent} from '../..';
import {appInfo} from '../../../constants/appInfo';
import MoreMenuItemComponent from './MoreMenuItemComponent';
import {X} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native';

interface MoreMenuComponentProps {
  onClose: () => void;
  show: boolean;
}

const items = [
  {
    text: 'Đặt khám theo bác sĩ',
    image: require('../../../assets/images/appointment.png'),
  },
  {
    text: 'Tra cứu kết quả khám bệnh',
    image: require('../../../assets/images/loupe.png'),
  },
  {
    text: 'Thanh toán viện phí',
    image: require('../../../assets/images/payment.png'),
  },
  {
    text: 'Đặt lịch uống thuốc',
    image: require('../../../assets/images/animal.png'),
  },
  {
    text: 'Hỗ trợ nhanh',
    image: require('../../../assets/images/chat.png'),
  },
  {
    text: 'Hướng dẫn đặt khám',
    image: require('../../../assets/images/instructions.png'),
  },
  {
    text: 'Đặt khám qua tổng đài 1900-1234',
    image: require('../../../assets/images/customer-support.png'),
  },
];

const MoreMenuComponent = (props: MoreMenuComponentProps) => {
  const {onClose, show} = props;
  return (
    show && (
      <View style={styles.container}>
        {items.map((item, index) => {
          return (
            <MoreMenuItemComponent
              key={index}
              text={item.text}
              image={item.image}
            />
          );
        })}

        <TouchableOpacity
          onPress={onClose}
          style={{
            marginTop: 16,
          }}>
          <X size={50} color={'#fff'} />
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: 'rgba(95, 95, 95, 0.8)',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: appInfo.size.width,
    height: appInfo.size.height,
  },
});

export default MoreMenuComponent;
