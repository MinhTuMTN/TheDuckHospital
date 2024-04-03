import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';

interface DepartmentStatisticsItemComponentProps {
  departmentItem: any;
  index: number;
}

function DepartmentStatisticsItemComponent(
  props: DepartmentStatisticsItemComponentProps,
) {
  const {departmentItem, index} = props;

  return (
    <ContainerComponent style={styles.departmentContainer}>
      <FlexComponent
        direction="row"
        alignItems="center"
        justifyContent="center">
        <View
          style={{
            backgroundColor: appColors.gray,
            borderRadius: 10,
          }}>
          <TextComponent bold fontSize={18} style={{padding: 5}}>
            {`#${index + 1}`}
          </TextComponent>
        </View>

        <ContainerComponent paddingTop={0} style={{paddingLeft: 15}}>
          <TextComponent bold fontSize={20} style={{paddingBottom: 5}}>
            {departmentItem.departmentName}
          </TextComponent>

          <TextComponent italic fontSize={16}>
            {departmentItem.headDoctorName === null
              ? 'Chưa cập nhật'
              : departmentItem.headDoctorName}
          </TextComponent>
        </ContainerComponent>

        <TextComponent
          fontSize={
            16
          }>{`${departmentItem.totalPatients} lượt khám`}</TextComponent>
      </FlexComponent>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  departmentContainer: {
    width: '100%',
    paddingTop: 15,
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    marginRight: 5,
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

export default DepartmentStatisticsItemComponent;
