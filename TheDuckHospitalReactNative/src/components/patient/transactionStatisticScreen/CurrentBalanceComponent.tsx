import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FlexComponent from '../../FlexComponent';
import TextComponent from '../../TextComponent';
import {useSelector} from 'react-redux';
import {AuthState} from '../../../store/authSlice';
import {Eye, EyeOff} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';
import {formatCurrency} from '../../../utils/currencyUtils';
import {RootState} from '../../../types';

const CurrentBalanceComponent = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [showBalance, setShowBalance] = React.useState(false);

  return (
    <View style={styles.container}>
      <FlexComponent direction="row" alignItems="center" columnGap={8}>
        <TextComponent color={appColors.textDescription} fontSize={18}>
          Số dư khả dụng
        </TextComponent>
        {showBalance ? (
          <EyeOff
            size={18}
            fontWeight={400}
            color={appColors.textDescription}
            onPress={() => setShowBalance(false)}
          />
        ) : (
          <Eye
            size={18}
            fontWeight={400}
            color={appColors.textDescription}
            onPress={() => setShowBalance(true)}
          />
        )}
      </FlexComponent>
      <TextComponent
        style={[
          styles.balance,
          {
            letterSpacing: showBalance ? 0.5 : 6,
          },
        ]}>
        {showBalance
          ? formatCurrency(
              userInfo.balance ? userInfo.balance.toString() : '0',
            ) + ' VND'
          : '*******'}
      </TextComponent>
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
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: appColors.black,
  },
});

export default CurrentBalanceComponent;
