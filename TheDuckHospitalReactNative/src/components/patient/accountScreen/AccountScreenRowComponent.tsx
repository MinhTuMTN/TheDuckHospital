import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlexComponent, TextComponent} from '../..';
import {ChevronRight} from 'lucide-react-native';
import {appColors} from '../../../constants/appColors';

interface AccountScreenRowComponentProps {
  icon?: any;
  title: string | React.ReactNode;
  onPress: () => void;
}

const AccountScreenRowComponent = (props: AccountScreenRowComponentProps) => {
  const {icon, title, onPress} = props;
  return (
    <TouchableOpacity
      style={{backgroundColor: 'white', paddingVertical: 4}}
      onPress={onPress}>
      <FlexComponent
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}>
        <FlexComponent
          flex={1}
          direction="row"
          alignItems={'center'}
          justifyContent="space-between">
          <FlexComponent direction="row" alignItems={'center'}>
            {icon && <View style={{paddingEnd: 10}}>{icon}</View>}
            <TextComponent color={'black'} fontSize={17}>
              {title}
            </TextComponent>
          </FlexComponent>
          <ChevronRight color={appColors.black} />
        </FlexComponent>
      </FlexComponent>
    </TouchableOpacity>
  );
};

export default AccountScreenRowComponent;
