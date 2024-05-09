import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {
  ContainerComponent,
  ContentLoaderComponent,
  FlexComponent,
  Header,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DoctorItemComponent from '../../../components/admin/departmentManagementScreen/DoctorItemComponent';
import {Info} from 'lucide-react-native';
import HeadDoctorAlertDialogComponent from '../../../components/admin/departmentManagementScreen/HeadDoctorAlertDialogComponent';
import DoctorDialogComponent from '../../../components/admin/departmentManagementScreen/DoctorDialogComponent';
import {useRoute} from '@react-navigation/native';
import {getDepartmentById} from '../../../services/departmentServices';

function DepartmentDetailScreen() {
  const route = useRoute();
  const {departmentId} = route.params as {departmentId: number};
  const [department, setDepartment] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showHeadDoctorAlertDialog, setShowHeadDoctorAlertDialog] =
    useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const handleGetDepartmentDetail = async () => {
      const response = await getDepartmentById(departmentId);
      setLoading(false);
      if (response.success) {
        setDepartment(response.data.data);
      } else {
        console.log(response);
      }
    };

    handleGetDepartmentDetail();
  }, [refreshList]);

  return (
    <ContainerComponent style={{paddingTop: 0}}>
      <Header title={'Thông tin chi tiết khoa'} paddingTop={40} />
      <ContainerComponent style={styles.container}>
        <Info size={32} color={appColors.black} />
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Thông tin cơ bản
        </TextComponent>
      </ContainerComponent>

      {loading ? (
        <ContentLoaderComponent />
      ) : (
        <>
          <ContainerComponent style={styles.detailContainer}>
            <FlexComponent style={styles.departmentInfoContainer}>
              <TextComponent bold fontSize={20} style={{flex: 0.35}}>
                Tên khoa:
              </TextComponent>
              <TextComponent fontSize={20} style={{flex: 0.65}}>
                {department?.departmentName}
              </TextComponent>
            </FlexComponent>

            <FlexComponent style={styles.departmentInfoContainer}>
              <TextComponent bold fontSize={20} style={{flex: 0.35}}>
                Trưởng khoa:
              </TextComponent>
              <FlexComponent
                style={{
                  flexDirection: 'row',
                  flex: department?.headDoctor ? 0.45 : 0.65,
                  alignItems: 'center',
                }}>
                <TextComponent fontSize={20}>
                  {department?.headDoctorName}
                </TextComponent>
                {department?.headDoctor ? (
                  <ButtonComponent
                    containerStyles={styles.deleteButtonContainer}
                    onPress={() => setShowHeadDoctorAlertDialog(true)}>
                    <View>
                      <TextComponent
                        bold
                        fontSize={16}
                        color={appColors.darkRed}>
                        Xóa
                      </TextComponent>
                    </View>
                  </ButtonComponent>
                ) : (
                  <TextComponent fontSize={20}>Chưa cập nhật</TextComponent>
                )}
              </FlexComponent>
            </FlexComponent>

            <FlexComponent style={styles.departmentInfoContainer}>
              <TextComponent bold fontSize={20} style={{flex: 0.35}}>
                Mô tả:
              </TextComponent>
              <TextComponent fontSize={20} style={{flex: 0.65}}>
                {department?.description
                  ? department?.description
                  : 'Chưa cập nhật'}
              </TextComponent>
            </FlexComponent>
          </ContainerComponent>
        </>
      )}
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

      {loading ? (
        <ContentLoaderComponent />
      ) : (
        <SafeAreaView style={styles.scrollViewContainer}>
          <FlatList
            data={department?.doctors}
            keyExtractor={(item: any, index: number) =>
              `doctor-${item.id}-${index}`
            }
            extraData={department?.doctors}
            refreshing={true}
            renderItem={({item}) => (
              <DoctorItemComponent
                departmentId={departmentId}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                doctor={item}
              />
            )}
            style={{width: '100%'}}
          />
        </SafeAreaView>
      )}
      <DoctorDialogComponent
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        departmentId={department?.departmentId}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <HeadDoctorAlertDialogComponent
        staffId={department?.headDoctorId}
        setDepartmentDetail={setDepartment}
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
    flex: 0.35,
    paddingTop: 0,
    justifyContent: 'space-around',
    paddingLeft: 40,
  },
  scrollViewContainer: {
    flex: 0.65,
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
    height: 50,
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
