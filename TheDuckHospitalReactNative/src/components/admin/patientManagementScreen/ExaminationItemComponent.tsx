import React, {useEffect, useState} from 'react';
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
import {formatDate} from '../../../utils/dateUtils';
import {formatCurrency} from '../../../utils/currencyUtils';
import PrescriptionItemComponent from './PrescriptionItemComponent';

interface ExaminationItemComponentProps {
  value: string;
  item: any;
  patient?: boolean;
}

const ExaminationItemComponent = (props: ExaminationItemComponentProps) => {
  const {value, item, patient = false} = props;
  const [medicalRecord, setMedicalRecord] = useState<any>();

  useEffect(() => {
    if (patient) {
      setMedicalRecord(item);
    } else {
      setMedicalRecord(item.medicalRecord);
    }
  }, []);

  return (
    <AccordionItem value={value} mt="$5">
      <AccordionHeader style={styles.examinaiontItemContainer}>
        <AccordionTrigger>
          {({isExpanded}) => {
            return (
              <>
                <FlexComponent flex={0.55}>
                  <TextComponent bold fontSize={18}>
                    {`${item.doctorSchedule.doctorDegree}. ${item.doctorSchedule.doctorName}`}
                  </TextComponent>
                  <TextComponent fontSize={16}>{`${
                    item.doctorSchedule.scheduleType === 'MORNING'
                      ? 'Buổi sáng'
                      : 'Buổi chiều'
                  } - Thứ ${item.doctorSchedule.dayOfWeek}`}</TextComponent>
                  <TextComponent fontSize={16}>
                    {formatDate(item.doctorSchedule.date)}
                  </TextComponent>
                </FlexComponent>

                <FlexComponent flex={0.45} alignItems="center">
                  <TextComponent bold fontSize={18}>
                    {`${formatCurrency(item.doctorSchedule.price)} VNĐ`}
                  </TextComponent>
                  <TextComponent
                    bold
                    fontSize={16}
                    color={
                      medicalRecord === null
                        ? appColors.yellow
                        : medicalRecord?.state === 'DONE'
                        ? appColors.green
                        : medicalRecord?.state === 'PROCESSING'
                        ? appColors.darkBlue
                        : appColors.yellow
                    }>
                    {medicalRecord === null
                      ? 'Đang chờ khám'
                      : medicalRecord?.state === 'DONE'
                      ? 'Đang hoàn thành'
                      : medicalRecord?.state === 'PROCESSING'
                      ? 'Đang khám'
                      : 'Đang chờ khám'}
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
              {item.doctorSchedule.doctorName}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Bằng cấp:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              {item.doctorSchedule.doctorDegree}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Giới tính:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              {item.doctorSchedule.doctor === 'MALE' ? 'Nam' : 'Nữ'}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Số điện thoại:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              {item.doctorSchedule.phoneNumber}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              CCCD/CMND:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              {item.doctorSchedule.identityNumber}
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
              {item.doctorSchedule.departmentName}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Phòng:
            </TextComponent>
            <TextComponent fontSize={18} style={{flex: 0.5}}>
              {item.doctorSchedule.roomName}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Triệu chứng:
            </TextComponent>
            <TextComponent
              fontSize={18}
              style={{flex: 0.5}}
              color={
                medicalRecord === null
                  ? appColors.black
                  : medicalRecord?.symptom === null
                  ? appColors.black
                  : appColors.darkRed
              }>
              {medicalRecord === null
                ? 'Chưa cập nhật'
                : medicalRecord?.symptom === null
                ? 'Chưa cập nhật'
                : medicalRecord?.symptom}
            </TextComponent>
          </FlexComponent>

          <FlexComponent style={styles.infoContainer}>
            <TextComponent bold fontSize={18} style={{flex: 0.5}}>
              Chuẩn đoán:
            </TextComponent>
            <TextComponent
              fontSize={18}
              style={{flex: 0.5}}
              color={
                medicalRecord === null
                  ? appColors.black
                  : medicalRecord?.diagnosis === null
                  ? appColors.black
                  : appColors.darkRed
              }>
              {medicalRecord === null
                ? 'Chưa cập nhật'
                : medicalRecord?.diagnosis === null
                ? 'Chưa cập nhật'
                : medicalRecord?.diagnosis}
            </TextComponent>
          </FlexComponent>
        </ContainerComponent>

        {medicalRecord?.prescription &&
          medicalRecord?.prescription.length > 0 && (
            <>
              <ContainerComponent style={styles.container}>
                <Pill size={24} color={appColors.black} />
                <TextComponent bold fontSize={24} style={styles.listLabel}>
                  Đơn thuốc
                </TextComponent>
              </ContainerComponent>

              <ContainerComponent style={styles.detailContainer}>
                {medicalRecord?.prescription.map((item: any, index: number) => (
                  <PrescriptionItemComponent item={item} key={index} />
                ))}

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
                    {`${formatCurrency(medicalRecord?.price)} VNĐ`}
                  </TextComponent>
                </FlexComponent>
              </ContainerComponent>
            </>
          )}
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
