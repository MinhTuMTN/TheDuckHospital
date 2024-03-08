import React from 'react';
import {StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';

interface ScheduleItemComponentProps {
  morning?: boolean;
}

const ScheduleItemComponent = (props: ScheduleItemComponentProps) => {
  const {morning} = props;

  return (
    <ContainerComponent style={styles.scheduleItemContainer}>
      <FlexComponent style={[styles.scheduleInfoContainer]}>
        <TextComponent bold fontSize={21}>
          {morning ? 'Buổi sáng' : 'Buổi chiều'}
        </TextComponent>
      </FlexComponent>

      <FlexComponent style={[styles.scheduleInfoContainer]}>
        <TextComponent fontSize={18}>Khoa tai mũi họng</TextComponent>
        <TextComponent fontSize={18}>Phòng A302</TextComponent>
      </FlexComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  scheduleItemContainer: {
    flex: 1,
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
  scheduleInfoContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
});

export default ScheduleItemComponent;
