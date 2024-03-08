import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {globalStyles} from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

function TransactionItemComponent() {
  const navigation = useNavigation();

  const handleDetailsClick = () => {
    navigation.navigate('TransactionDetailScreen' as never);
  };
  return (
    <Pressable onPress={handleDetailsClick}>
      <ContainerComponent style={styles.transactionItemContainer}>
        <FlexComponent style={[styles.transactionInfoContainer, {flex: 0.6}]}>
          <TextComponent bold fontSize={21}>
            Lý Minh Thông
          </TextComponent>
          <TextComponent fontSize={16}>01/01/2024</TextComponent>
        </FlexComponent>

        <FlexComponent
          style={[
            styles.transactionInfoContainer,
            {alignItems: 'flex-end', flex: 0.4},
          ]}>
          <TextComponent bold fontSize={18}>
            200.000 VNĐ
          </TextComponent>
          <FlexComponent style={styles.statusContainer}>
            <EntypoIcon name="dot-single" size={20} color={appColors.green} />
            <TextComponent bold fontSize={12} color={appColors.green}>
              Thành công
            </TextComponent>
          </FlexComponent>
        </FlexComponent>
      </ContainerComponent>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transactionItemContainer: {
    flex: 0.6,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.gray,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    shadowColor: globalStyles.shadow.shadowColor,
    shadowOffset: globalStyles.shadow.shadowOffset,
    shadowOpacity: globalStyles.shadow.shadowOpacity,
    elevation: globalStyles.shadow.elevation,
  },
  transactionInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TransactionItemComponent;
