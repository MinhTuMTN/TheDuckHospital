import {Rating} from 'react-native-ratings';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  Space,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import HorizontalLineComponent from '../../components/HorizontalLineComponent';
import RatingItemComponent from '../../components/patient/doctorInformationScreen/RatingItemComponent';

const DoctorInformationScreen = ({route}: {route: any}) => {
  const {doctor, dayOfWeek} = route.params;

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={`Thông tin bác sĩ`}
        noBackground
        backgroundColor={appColors.primaryDark}
      />
      <ContentComponent
        style={{backgroundColor: appColors.white, paddingTop: 0}}>
        <View style={{paddingTop: 15}}>
          <FlexComponent direction="row" justifyContent="space-between">
            <View
              style={{
                height: 90,
                width: 90,
                borderRadius: 45,
                shadowColor: appColors.black,
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.58,
                shadowRadius: 28,
                elevation: 10,
              }}>
              <Image
                source={{
                  uri: doctor.avatar
                    ? doctor.avatar
                    : 'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/2/1/1299808/Parkshinhye.jpeg',
                }}
                height={90}
                width={90}
                style={{
                  borderRadius: 45,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Space paddingBottom={10} />
            </View>
            <View style={{flex: 8, rowGap: 6}}>
              <TextComponent bold fontSize={22}>
                {`${doctor.degree}. ${doctor.doctorName}`}
              </TextComponent>

              <View style={{flexDirection: 'row'}}>
                <TextComponent fontWeight="500" flex={2}>
                  Chuyên khoa:
                </TextComponent>
                <TextComponent fontWeight="500" flex={3}>
                  {doctor.department.departmentName}
                </TextComponent>
              </View>

              <View style={{flexDirection: 'row'}}>
                <TextComponent fontWeight="500" flex={2}>
                  Ngày khám:
                </TextComponent>
                <TextComponent fontWeight="500" flex={3}>
                  {dayOfWeek}
                </TextComponent>
              </View>
            </View>
          </FlexComponent>
        </View>

        <Space paddingBottom={10} />
        <HorizontalLineComponent marginLeft={-15} marginRight={-15} />
        <Space paddingBottom={10} />

        <FlexComponent
          direction="row"
          justifyContent="space-around"
          alignItems="center">
          <TextComponent
            flex={2}
            color={appColors.textDescription}
            fontSize={19}
            italic textAlign='center'>
            Chất lượng dịch vụ
          </TextComponent>
          <Rating
            readonly={true}
            showRating={false}
            startingValue={doctor.rating}
            jumpValue={0.1}
            ratingCount={5}
          />
          <TextComponent
            bold
            flex={1}
            style={{color: '#C4B426'}}
            fontSize={32}
            textAlign="center">
            {doctor.rating}
          </TextComponent>
        </FlexComponent>

        <Space paddingBottom={10} paddingTop={10} />

        <HorizontalLineComponent lineColor={appColors.grayLine} />

        <ScrollView>
          {doctor.ratings?.map((item: any, index: number) => (
            <RatingItemComponent rating={item} key={index} />
          ))}
        </ScrollView>
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DoctorInformationScreen;
