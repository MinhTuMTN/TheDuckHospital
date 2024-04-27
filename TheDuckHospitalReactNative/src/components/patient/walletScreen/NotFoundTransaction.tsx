import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from '../../TextComponent';
import {appColors} from '../../../constants/appColors';

const NotFoundTransaction = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <TextComponent
        textAlign="center"
        fontSize={18}
        color={appColors.textGray}
        fontWeight="500">
        Không có giao dịch nào{'\n'}trong tháng này
      </TextComponent>
    </View>
  );
};

export default NotFoundTransaction;
