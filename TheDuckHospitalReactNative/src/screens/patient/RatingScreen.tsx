import {AirbnbRating} from 'react-native-ratings';
import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {
  ContainerComponent,
  ContentComponent,
  FlexComponent,
  Header,
  Space,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {addRating} from '../../services/ratingServices';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../types';
import HorizontalLineComponent from '../../components/HorizontalLineComponent';
import {Info} from 'lucide-react-native';
import {formatDate} from '../../utils/dateUtils';
import {useToast} from '../../hooks/ToastProvider';

const rate = [
  {ratingPoint: 1, ratingLabel: 'Rất tệ'},
  {ratingPoint: 2, ratingLabel: 'Tệ'},
  {ratingPoint: 3, ratingLabel: 'Bình thường'},
  {ratingPoint: 4, ratingLabel: 'Tốt'},
  {ratingPoint: 5, ratingLabel: 'Rất tốt'},
];

const RatingScreen = ({route}: {route: any}) => {
  const {medicalBill, onGoBack} = route.params;
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [rating, setRating] = useState(
    medicalBill.rating.rated ? medicalBill.rating.rating : 5,
  );
  const [ratingLabel, setRatingLabel] = useState<any>(
    medicalBill.rating.rated
      ? rate.find(rate => medicalBill.rating.rating === rate.ratingPoint)
          ?.ratingLabel
      : 'Rất tốt',
  );
  const [review, setReview] = useState(
    medicalBill.rating.rated ? medicalBill.rating.review : '',
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const navigation = useNavigation<navigationProps>();
  const toast = useToast();

  const handleAddRating = async () => {
    const data = {
      rating: rating,
      review: review,
      bookingId: medicalBill.bookingId,
      patientCode: medicalBill.patientCode,
    };
    setIsLoadingAPI(true);
    const response = await addRating(data);
    setIsLoadingAPI(false);

    if (response.success) {
      toast.showToast('Đánh giá thành công!');
      onGoBack();
      navigation.goBack();
    } else {
      console.log('Error: ', response.error);
    }
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={
          medicalBill.rating.rated ? `Xem lại đánh giá` : `Đánh giá phiên khám`
        }
        noBackground
        backgroundColor={appColors.primaryDark}
      />
      <ContentComponent
        style={{backgroundColor: appColors.white, paddingTop: 0}}>
        <View style={{paddingTop: 15}}>
          {!isKeyboardVisible && (
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
                    uri: medicalBill.doctorAvatar
                      ? medicalBill.doctorAvatar
                      : 'https://i.vietgiaitri.com/2021/6/23/mua-2-moi-chieu-hospital-playlist-da-tinh-den-chuyen-lam-mua-3-nhung-1-nhan-vat-khong-hai-long-e9d-5841612.jpg',
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
                  {`${medicalBill.doctorDegree}. ${medicalBill.doctorName}`}
                </TextComponent>

                <View style={{flexDirection: 'row'}}>
                  <TextComponent fontWeight="500" flex={2}>
                    Chuyên khoa:
                  </TextComponent>
                  <TextComponent fontWeight="500" flex={3}>
                    {medicalBill.departmentName}
                  </TextComponent>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <TextComponent fontWeight="500" flex={2}>
                    Ngày khám:
                  </TextComponent>
                  <TextComponent fontWeight="500" flex={3}>
                    {formatDate(medicalBill.date)}
                  </TextComponent>
                </View>
              </View>
            </FlexComponent>
          )}
        </View>

        {!isKeyboardVisible && (
          <>
            <Space paddingBottom={10} />
            <HorizontalLineComponent marginLeft={-15} marginRight={-15} />
            <Space paddingBottom={10} />
          </>
        )}

        <FlexComponent
          direction="row"
          justifyContent="space-around"
          alignItems="center">
          <TextComponent
            flex={3}
            color={appColors.textDescription}
            fontSize={19}
            italic>
            Chất lượng phiên khám
          </TextComponent>
          <AirbnbRating
            isDisabled={medicalBill.rating.rated}
            showRating={false}
            defaultRating={
              medicalBill.rating.rated ? medicalBill.rating.rating : 5
            }
            count={5}
            size={30}
            starContainerStyle={{
              width: '100%',
              justifyContent: 'space-between',
            }}
            onFinishRating={(rating: number) => {
              setRatingLabel(
                rate.find(rate => rate.ratingPoint === rating)?.ratingLabel,
              );
              setRating(rating);
            }}
            ratingContainerStyle={{
              flex: 5,
            }}
          />
          <TextComponent
            bold
            flex={2}
            style={{color: '#C4B426'}}
            fontSize={19}
            textAlign="center">
            {ratingLabel}
          </TextComponent>
        </FlexComponent>

        <Space paddingBottom={10} />

        <TextInput
          value={review}
          onChangeText={text => setReview(text)}
          placeholder="Hãy chia sẻ nhận xét về bác sĩ này bạn nhé!"
          style={styles.textInput}
          multiline
          numberOfLines={5}
        />
        <Space paddingBottom={10} />
        {!medicalBill.rating.rated && (
          <ButtonComponent
            isLoading={isLoadingAPI}
            containerStyles={{marginBottom: 20}}
            backgroundColor={appColors.primaryDark}
            borderRadius={10}
            onPress={handleAddRating}
            textStyles={{
              textTransform: 'uppercase',
              fontWeight: '700',
            }}>
            Đánh giá
          </ButtonComponent>
        )}
      </ContentComponent>

      {!isKeyboardVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <View>
            <Info size={36} color={appColors.textDescription} />
          </View>
          <View style={{flex: 1, paddingLeft: 10}}>
            <TextComponent
              fontSize={14}
              color={appColors.textDescription}
              textAlign="justify">
              Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi. Nếu có bất cứ vấn đề
              gì, xin hãy liên hệ qua hotline (123-345-7890) để được phục vụ
              nhanh nhất.
            </TextComponent>
          </View>
        </View>
      )}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: appColors.backgroundGray,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 18,
    textAlignVertical: 'top',
  },
});

export default RatingScreen;
