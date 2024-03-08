import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import {appColors} from '../../../constants/appColors';
import {HeartPulse, Info, Pill} from 'lucide-react-native';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '@gluestack-ui/themed';

interface ExaminationItemComponentProps {
  value: string;
}

const ExaminationItemComponent = (props: ExaminationItemComponentProps) => {
  const {value} = props;

  return (
    <AccordionItem value={value} mt="$5">
      <AccordionHeader style={styles.examinaiontItemContainer}>
        <AccordionTrigger>
          {({isExpanded}) => {
            return (
              <>
                <FlexComponent>
                  <TextComponent bold fontSize={21}>
                    BS. Lâm Lục
                  </TextComponent>
                  <TextComponent fontSize={16}>Buổi sáng - Thứ 2</TextComponent>
                  <TextComponent fontSize={16}>31/01/2000</TextComponent>
                </FlexComponent>

                <FlexComponent>
                  <TextComponent bold fontSize={18}>
                    200.000 VNĐ
                  </TextComponent>
                  <TextComponent bold fontSize={18} color={appColors.green}>
                    Đã hoàn thành
                  </TextComponent>
                </FlexComponent>
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        mt="$0"
        sx={{
          backgroundColor: appColors.lightGray,
          borderWidth: 1,
          borderTopWidth: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <ContainerComponent style={styles.container}>
        <FontistoIcon name="doctor" size={24} color={appColors.black} />
          <TextComponent bold fontSize={24} style={styles.listLabel}>
            Thông tin bác sĩ
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.detailContainer}>
          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Họ tên:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              Trần Bát
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Bằng cấp:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              BS
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Giới tính:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              Nam
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Số điện thoại:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              0123456789
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              CCCD/CMND:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              123456789101
            </TextComponent>
          </FlexComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.container}>
          <HeartPulse size={24} color={appColors.black} />
          <TextComponent bold fontSize={24} style={styles.listLabel}>
            Thông tin khám bệnh
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.detailContainer}>
          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Khoa:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              Tai mũi họng
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Phòng:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              A302
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Triệu chứng:
            </TextComponent>
            <TextComponent
              fontSize={18}
              style={{flex: 0.5}}
              color={appColors.darkRed}>
              Ngứa họng, ho ra máu
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Chuẩn đoán:
            </TextComponent>
            <TextComponent
              fontSize={18}
              style={{flex: 0.5}}
              color={appColors.darkRed}>
              Ung thu vòm họng
            </TextComponent>
          </FlexComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.container}>
          <Pill size={24} color={appColors.black} />
          <TextComponent bold fontSize={24} style={styles.listLabel}>
            Đơn thuốc
          </TextComponent>
        </ContainerComponent>

        <ContainerComponent style={styles.detailContainer}>
          <FlexComponent style={styles.presciptionInfoContainer}>
            <TextComponent bold fontSize={18}>
              Paracetamol (x10 viên)
            </TextComponent>
            <TextComponent fontSize={18}>20.000 VNĐ</TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.presciptionInfoContainer}>
            <TextComponent bold fontSize={18}>
              Methorphan (x5 viên)
            </TextComponent>
            <TextComponent fontSize={18}>5.500 VNĐ</TextComponent>
          </FlexComponent>

          <View
            style={{
              borderBottomColor: appColors.black,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingVertical: 5,
            }}
          />

          <FlexComponent style={styles.presciptionInfoContainer}>
            <TextComponent bold fontSize={18}>
              Tổng cộng
            </TextComponent>
            <TextComponent bold fontSize={18}>
              25.500 VNĐ
            </TextComponent>
          </FlexComponent>
        </ContainerComponent>
      </AccordionContent>
    </AccordionItem>
  );
};

const styles = StyleSheet.create({
  examinaiontItemContainer: {
    borderWidth: 1,
  },
  container: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  listLabel: {
    marginLeft: 10,
  },
  infoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  presciptionInfoContainer: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  detailContainer: {
    flex: 2,
    paddingTop: 0,
    paddingLeft: 20,
    backgroundColor: 'transparent',
  },
});

export default ExaminationItemComponent;
