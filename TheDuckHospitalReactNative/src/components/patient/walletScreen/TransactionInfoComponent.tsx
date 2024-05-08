import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Down, Up} from '../../../assets/svgs';
import {appColors} from '../../../constants/appColors';
import {
  getTransactionAmount,
  getTransactionType,
} from '../../../utils/transactionUtils';
import TextComponent from '../../TextComponent';
import {useTranslation} from 'react-i18next';

interface TransactionInfoComponentProps {
  transaction: any;
  variant?: 'normal' | 'underline';
}

const TransactionInfoComponent = (props: TransactionInfoComponentProps) => {
  const {transaction, variant = 'normal'} = props;
  const {i18n} = useTranslation();
  return (
    <View style={variant === 'normal' ? styles.container : styles.container2}>
      <View style={styles.left}>
        {transaction?.paymentType === 'TOP_UP' ||
        transaction?.paymentType === 'REFUND' ? (
          <Up
            width={40}
            height={40}
            style={{marginRight: 8}}
            fill={appColors.green}
            fillRule="nonzero"
          />
        ) : (
          <Down width={40} height={40} style={{marginRight: 8}} />
        )}
        <View>
          <TextComponent
            color={appColors.textDarker}
            fontWeight="600"
            fontSize={18}>
            {getTransactionType(
              transaction?.paymentType,
              i18n.language as 'vi' | 'en',
            )}
          </TextComponent>
          <TextComponent color={appColors.grayText}>
            {dayjs(transaction?.createdAt).format('HH:mm')}
          </TextComponent>
        </View>
      </View>
      <View style={styles.right}>
        <TextComponent
          color={
            transaction?.paymentType === 'TOP_UP' ||
            transaction?.paymentType === 'REFUND'
              ? appColors.green
              : appColors.error
          }
          fontWeight="600"
          fontSize={18}>
          {getTransactionAmount(transaction?.paymentType, transaction?.amount)}
        </TextComponent>
        <TextComponent color={appColors.grayText}>
          {dayjs(transaction?.createdAt).format('DD/MM/YYYY')}
        </TextComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: appColors.white,
    elevation: 4,
    borderRadius: 8,
    marginVertical: 8,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: appColors.white,
    borderRadius: 8,
    marginVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: appColors.gray,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export default TransactionInfoComponent;
