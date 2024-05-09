import {AirbnbRating} from 'react-native-ratings';
import React from 'react';
import {View} from 'react-native';
import {FlexComponent, Space, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import HorizontalLineComponent from '../../HorizontalLineComponent';
import {formatDate} from '../../../utils/dateUtils';
import {Avatar, AvatarFallbackText} from '@gluestack-ui/themed';

interface RatingItemComponentProps {
  rating: any;
}

const RatingItemComponent = (props: RatingItemComponentProps) => {
  const {rating} = props;

  return (
    <>
      <Space paddingBottom={10} paddingTop={10} />
      <FlexComponent
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <View style={{flex: 1}}>
          <Avatar size="md">
            <AvatarFallbackText>{rating.patientName}</AvatarFallbackText>
          </Avatar>
        </View>
        <View style={{flex: 1}}>
          <Space paddingBottom={10} />
        </View>
        <TextComponent flex={9} bold fontSize={18}>
          {rating.patientName}
        </TextComponent>
      </FlexComponent>
      <FlexComponent direction="row" alignItems="center">
        <View style={{flex: 1}}>
          <AirbnbRating
            isDisabled={true}
            showRating={false}
            defaultRating={rating.rating}
            count={5}
            size={15}
            starContainerStyle={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Space paddingBottom={10} />
        </View>
        <View style={{flex: 4}}>
          <TextComponent italic fontSize={16}>
            {formatDate(rating.ratedAt)}
          </TextComponent>
        </View>
      </FlexComponent>
      <Space paddingBottom={10} />
      <TextComponent fontSize={18}>{rating.review}</TextComponent>

      <Space paddingBottom={10} paddingTop={10} />
      <HorizontalLineComponent lineColor={appColors.grayLine} />
    </>
  );
};

export default RatingItemComponent;
