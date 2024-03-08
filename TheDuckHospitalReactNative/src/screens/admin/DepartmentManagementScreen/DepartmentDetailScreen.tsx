import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DoctorItemComponent from '../../../components/admin/departmentManagementScreen/DoctorItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import {Info} from 'lucide-react-native';
import HeadDoctorAlertDialogComponent from '../../../components/admin/departmentManagementScreen/HeadDoctorAlertDialogComponent';
import DoctorDialogComponent from '../../../components/admin/departmentManagementScreen/DoctorDialogComponent';

function DepartmentDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const [showHeadDoctorAlertDialog, setShowHeadDoctorAlertDialog] =
    useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết khoa'} paddingTop={40} />
      <ContainerComponent style={styles.container}>
        <Info size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Thông tin cơ bản
        </TextComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.detailContainer}>
        <FlexComponent style={styles.departmentInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Tên khoa:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            Tai mũi họng
          </TextComponent>
        </FlexComponent>

        <FlexComponent style={styles.departmentInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Trưởng khoa:
          </TextComponent>
          <FlexComponent
            style={{flexDirection: 'row', flex: 0.6, alignItems: 'center'}}>
            <TextComponent fontSize={20}>Trương Tam</TextComponent>
            <ButtonComponent
              containerStyles={styles.deleteButtonContainer}
              onPress={() => setShowHeadDoctorAlertDialog(true)}>
              <View>
                <TextComponent bold fontSize={16} color={appColors.darkRed}>
                  Xóa
                </TextComponent>
              </View>
            </ButtonComponent>
          </FlexComponent>
        </FlexComponent>

        <FlexComponent style={styles.departmentInfoContainer}>
          <TextComponent bold fontSize={20} style={{flex: 0.4}}>
            Mô tả:
          </TextComponent>
          <TextComponent fontSize={20} style={{flex: 0.6}}>
            Khoa tai mũi họng của bệnh viện
          </TextComponent>
        </FlexComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.container}>
        <FontistoIcon name="doctor" size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Danh sách bác sĩ
        </TextComponent>
        <ButtonComponent
          containerStyles={styles.addButtonContainer}
          onPress={toggleModal}>
          <FlexComponent style={styles.buttonContent}>
            <TextComponent
              bold
              fontSize={16}
              color={appColors.textPrimary}
              style={styles.addButtonText}>
              Thêm
            </TextComponent>
            <AntDesignIcon
              name="plus"
              size={20}
              color={appColors.textPrimary}
            />
          </FlexComponent>
        </ButtonComponent>
      </ContainerComponent>
      <ScrollView style={styles.scrollViewContainer}>
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
        <DoctorItemComponent />
      </ScrollView>

      <DoctorDialogComponent
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <HeadDoctorAlertDialogComponent
        setShowAlertDialog={setShowHeadDoctorAlertDialog}
        showAlertDialog={showHeadDoctorAlertDialog}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  departmentInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flex: 0.45,
    paddingTop: 0,
    justifyContent: 'space-around',
    paddingLeft: 40,
  },
  scrollViewContainer: {
    flex: 0.5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listLabel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  deleteButtonContainer: {
    backgroundColor: appColors.white,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: appColors.darkRed,
    marginLeft: 10,
    height: 45,
  },
  addButtonContainer: {
    backgroundColor: appColors.white,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: appColors.primary,
    height: 45,
    width: '23%',
  },
  addButtonText: {
    marginRight: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DepartmentDetailScreen;
