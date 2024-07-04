import React from 'react';
import {StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';

interface StatisticsItemComponentProps {
  marginLeft: any;
  icon: any;
  label: string;
  value: any;
}

const StatisticsItemComponent = (props: StatisticsItemComponentProps) => {
  const {marginLeft, icon, label, value} = props;

  return (
    <ContainerComponent
      style={[styles.cardStatistics, {marginLeft: marginLeft}]}>
      <FlexComponent alignItems="center" justifyContent="center">
        <FlexComponent
          alignItems="center"
          justifyContent="center"
          style={{
            padding: 10,
            borderBottomWidth: 5,
            borderColor: appColors.gray,
            width: '100%',
          }}>
          {icon && icon}
          <TextComponent color={appColors.darkGray} fontSize={18}>
            {label}
          </TextComponent>
        </FlexComponent>
        <TextComponent fontSize={28}>{value}</TextComponent>
      </FlexComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  cardStatistics: {
    paddingTop: 5,
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 10,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StatisticsItemComponent;
