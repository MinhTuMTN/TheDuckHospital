import React from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  SectionComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import LineInfoComponent from '../../components/LineInfoComponent';
import {
  Barcode,
  CalendarDays,
  ClipboardPlus,
  Copy,
  Pill,
  Stethoscope,
} from 'lucide-react-native';
import HorizontalLineComponent from '../../components/HorizontalLineComponent';
import Clipboard from '@react-native-clipboard/clipboard';
import {getMedicalRecordDetail} from '../../services/medicalRecordServices';
import PrescriptionItemComponent from '../../components/patient/medicalExaminationHistoryScreen/PrescriptionItemComponent';

const MedicalExaminationHistoryScreen = ({route}: {route: any}) => {
  const [medicalRecord, setMedicalRecord] = React.useState<any>();
  const {medicalRecordId} = route.params || 1;

  React.useEffect(() => {
    const handleGetMedicalRecordDetail = async () => {
      const response = await getMedicalRecordDetail(medicalRecordId);

      if (response.success) {
        setMedicalRecord(response.data?.data);
      }
    };

    handleGetMedicalRecordDetail();
  }, []);

  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header
        title={'Lịch sử khám bệnh'}
        noBackground
        paddingTop={40}
        titleColor={appColors.textDarker}
        titleSize={19}
        backButtonColor={appColors.textDarker}
      />

      <ScrollView>
        <ContainerComponent style={styles.detailContainer}>
          <LineInfoComponent
            label="Ngày khám:"
            value={medicalRecord?.date || '21/02/2024'}
            labelColor={appColors.textDescription}
            valueColor={'#4F4F4F'}
            flexLabel={1}
            flexValue={1}
            valueStyles={{
              fontWeight: '700',
              fontSize: 17,
            }}
            labelStyles={{
              fontWeight: '700',
              fontSize: 17,
            }}
            containerStyles={{paddingTop: 5}}
            startIcon={
              <CalendarDays
                size={20}
                color={appColors.textDescription}
                style={{marginRight: 5}}
              />
            }
          />
          <FlexComponent direction="row">
            <LineInfoComponent
              label="Mã phiếu khám:"
              value={medicalRecordId || 'F5F470FC8737'}
              labelColor={appColors.textDescription}
              valueColor={'#4F4F4F'}
              flexLabel={1}
              flexValue={1}
              containerFlex={1}
              valueStyles={{
                fontWeight: '700',
                fontSize: 17,
              }}
              labelStyles={{
                fontWeight: '700',
                fontSize: 17,
              }}
              containerStyles={{paddingTop: 5, paddingBottom: 10}}
              startIcon={
                <Barcode
                  size={20}
                  color={appColors.textDescription}
                  style={{marginRight: 5}}
                />
              }
              endIcon={
                <TouchableOpacity
                  onPress={() => Clipboard.setString('F5F470FC8737')}>
                  <Copy size={19} color={appColors.black} />
                </TouchableOpacity>
              }
            />
          </FlexComponent>
        </ContainerComponent>

        <HorizontalLineComponent
          borderWidth={5}
          lineColor={'#EEEEEE'}
          paddingTop={10}
          marginLeft={30}
          marginRight={30}
        />

        <ContainerComponent style={styles.detailContainer}>
          <SectionComponent
            title="Thông tin bệnh nhân"
            paddingTop={20}
            startIcon={
              <ClipboardPlus
                size={24}
                color={appColors.black}
                style={{marginBottom: 10, marginRight: 5}}
              />
            }>
            <LineInfoComponent
              label="Họ tên:"
              value={medicalRecord?.patientProfile.fullName || 'Nguyễn Văn A'}
              valueColor={appColors.textPrimary}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Ngày sinh:"
              value={medicalRecord?.patientProfile.dateOfBirth || '01/01/1999'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Giới tính:"
              value={
                (medicalRecord?.patientProfile.gender === "MALE" ? 'Nam' : 'Nữ') ||
                'Nam'
              }
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Địa chỉ:"
              value={
                medicalRecord
                  ? `${medicalRecord?.patientProfile.streetName}, ${medicalRecord?.patientProfile.ward?.wardName}, ${medicalRecord?.patientProfile.district?.districtName}, ${medicalRecord?.patientProfile.province?.provinceName}`
                  : '01 Võ Văn Ngân, Linh Chiểu, TP Thủ Đức, Tp. HCM'
              }
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Mã bệnh nhân:"
              value={medicalRecord?.patientProfile.patientCode || 'BN12345678'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />
          </SectionComponent>
        </ContainerComponent>

        <HorizontalLineComponent
          borderWidth={5}
          lineColor={'#EEEEEE'}
          paddingTop={10}
          marginLeft={30}
          marginRight={30}
        />

        <ContainerComponent style={styles.detailContainer}>
          <SectionComponent
            title="Thông tin khám bệnh"
            paddingTop={20}
            startIcon={
              <Stethoscope
                size={24}
                color={appColors.black}
                style={{marginBottom: 10, marginRight: 5}}
              />
            }>
            <LineInfoComponent
              label="Bác sĩ điều trị:"
              value={medicalRecord?.doctorName || 'Nguyễn Văn D'}
              valueColor={appColors.textPrimary}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Chuyên khoa:"
              value={medicalRecord?.departmentName || 'Răng - hàm - mặt'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Triệu chứng:"
              value={medicalRecord?.symptom || 'Đau răng, sưng nướu'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Chuẩn đoán:"
              value={medicalRecord?.diagnosis || 'Sâu răng'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />

            <LineInfoComponent
              label="Tái khám:"
              value={medicalRecord?.reExaminationDate || '31/03/2024'}
              valueColor={appColors.textGray}
              flexLabel={1}
              flexValue={1}
              valueStyles={styles.lineInfo}
              labelStyles={styles.lineInfo}
              containerStyles={{paddingTop: 10}}
            />
          </SectionComponent>
        </ContainerComponent>

        <HorizontalLineComponent
          borderWidth={5}
          lineColor={'#EEEEEE'}
          paddingTop={10}
          marginLeft={30}
          marginRight={30}
        />

        <ContainerComponent style={styles.detailContainer}>
          <SectionComponent
            title="Toa thuốc"
            paddingTop={20}
            startIcon={
              <Pill
                size={24}
                color={appColors.black}
                style={{marginBottom: 10, marginRight: 5}}
              />
            }>
            {/* <FlexComponent style={styles.prescriptionItemContainer}>
              <FlexComponent>
                <TextComponent fontWeight="600" fontSize={18}>
                  {prescriptionItem?.medicine.medicineName || "Clinozpam"}
                </TextComponent>
                <TextComponent italic fontSize={16}>
                  {prescriptionItem?.dosageInstruction || "Sáng 1v, trưa 1v, tối 1v"}
                </TextComponent>
              </FlexComponent>
              <TextComponent fontWeight="600" fontSize={16}>
                {`${prescriptionItem?.quantity} ${prescriptionItem?.medicine.unit}` || "90 viên"}
              </TextComponent>
            </FlexComponent>

            <FlexComponent style={styles.prescriptionItemContainer}>
              <FlexComponent>
                <TextComponent fontWeight="600" fontSize={18}>
                  Stodal
                </TextComponent>
                <TextComponent fontSize={16}>Sáng 1v, trưa 1v</TextComponent>
              </FlexComponent>
              <TextComponent fontWeight="600" fontSize={16}>
                2 chai
              </TextComponent>
            </FlexComponent>

            <FlexComponent style={styles.prescriptionItemContainer}>
              <FlexComponent>
                <TextComponent
                  fontWeight="600"
                  fontSize={18}
                  style={{flex: 0.4}}>
                  Paracetamol 5mg
                </TextComponent>
                <TextComponent fontSize={16} style={{flex: 0.6}}>
                  Sáng 1v, trưa 1v, tối 1v
                </TextComponent>
              </FlexComponent>
              <TextComponent fontWeight="600" fontSize={16}>
                90 viên
              </TextComponent>
            </FlexComponent> */}

            <FlatList
              showsVerticalScrollIndicator={false}
              data={medicalRecord?.prescriptionItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <PrescriptionItemComponent prescriptionItem={item} />
              )}
            />
          </SectionComponent>
        </ContainerComponent>
      </ScrollView>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailContainer: {
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  prescriptionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: appColors.gray,
  },
  lineInfo: {
    fontWeight: '600',
    fontSize: 19,
  },
});

export default MedicalExaminationHistoryScreen;
