import React from 'react';
import {appColors} from '../constants/appColors';
import {Center, Flex, Text} from 'native-base';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  titleSize?: number;
  showBackButton?: boolean;
  icon?: React.ReactNode;
}

const Header = (props: Props) => {
  const {title, titleSize = 19, showBackButton = true, icon} = props;

  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: appColors.primary,
        paddingTop: 35,
        paddingBottom: 15,
      }}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        direction="row"
        style={{
          paddingTop: 10,
          paddingHorizontal: 15,
        }}>
        <View>
          {showBackButton && (
            <Icon
              name="arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.goBack()}
            />
          )}
        </View>
        <Text
          style={{textTransform: 'uppercase'}}
          color={'white'}
          bold
          fontSize={titleSize}>
          {title}
        </Text>
        <View>{icon}</View>
      </Flex>
    </View>
  );
};

export default Header;
