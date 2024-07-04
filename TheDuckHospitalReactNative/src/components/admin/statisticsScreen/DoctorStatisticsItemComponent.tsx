import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {Rating} from 'react-native-ratings';
import {Image} from 'react-native';

interface DoctorStatisticsItemComponentProps {
  doctor: any;
  index: number;
}

function DoctorStatisticsItemComponent(
  props: DoctorStatisticsItemComponentProps,
) {
  const {doctor, index} = props;

  return (
    <ContainerComponent style={styles.doctorContainer}>
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

        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            marginHorizontal: 10,
          }}>
          <Image
            source={{
              uri: doctor.avatar
                ? doctor.avatar
                : 'https://cdn-icons-png.flaticon.com/512/194/194915.png',
            }}
            height={70}
            width={70}
            style={{
              borderRadius: 35,
            }}
          />
        </View>

        <ContainerComponent paddingTop={0} style={{paddingLeft: 5}}>
          <TextComponent bold fontSize={16} style={{paddingBottom: 5}}>
            {`${doctor.degree}. ${doctor.doctorName} ${
              doctor.isHeadDoctor ? `(Trưởng khoa)` : ``
            }`}
          </TextComponent>
        </ContainerComponent>

        <FlexComponent style={{paddingLeft: 15}}>
          <TextComponent
            fontSize={16}>{`${doctor.totalPatients} lượt khám`}</TextComponent>

          <Rating
            readonly={true}
            showRating={false}
            startingValue={doctor.rating}
            ratingCount={5}
            imageSize={16}
          />
        </FlexComponent>
      </FlexComponent>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  doctorContainer: {
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

export default DoctorStatisticsItemComponent;
