import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import FlexComponent from '../../FlexComponent';
import {Clipboard} from '../../../assets/svgs';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';
import Space from '../../Space';
import NotFoundComponent from '../../NotFoundComponent';
import NotFoundTransaction from '../walletScreen/NotFoundTransaction';
import TransactionInfoComponent from '../walletScreen/TransactionInfoComponent';

interface DetailsTransactionProps {
  transactions?: any[];
}

const DetailsTransaction = (props: DetailsTransactionProps) => {
  const {transactions = []} = props;
  return (
    <View style={styles.container}>
      <FlexComponent direction="row" alignItems="center" columnGap={8}>
        <Clipboard width={32} height={32} />
        <TextComponent
          fontWeight="500"
          fontSize={18}
          color={appColors.textDarker}>
          Chi tiết giao dịch
        </TextComponent>
      </FlexComponent>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <TransactionInfoComponent
            key={transaction.transactionId}
            transaction={transaction}
          />
        ))
      ) : (
        <>
          <Space paddingTop={16} />
          <NotFoundTransaction />
          <Space paddingTop={16} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: appColors.white,
    elevation: 4,
    padding: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export default DetailsTransaction;
