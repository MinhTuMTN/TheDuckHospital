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
import {Info} from 'lucide-react-native';
import {useRoute} from '@react-navigation/native';
import {getDepartmentById} from '../../../services/departmentServices';
import StaffDepartmentItemComponent from '../../../components/admin/departmentManagementScreen/StaffDepartmentItemComponent';
import {Text} from '@gluestack-ui/themed';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import AddNurseDialogComponent from '../../../components/admin/departmentManagementScreen/AddNurseDialogComponent';
import AddDoctorDialogComponent from '../../../components/admin/departmentManagementScreen/AddDoctorDialogComponent';
import HeadDoctorAlertDialogComponentComponent from '../../../components/admin/departmentManagementScreen/HeadDoctorAlertDialogComponent';
import HeadNurseAlertDialogComponent from '../../../components/admin/departmentManagementScreen/HeadNurseAlertDialogComponent';

function DepartmentDetailScreen() {
  const route = useRoute();
  const {departmentId} = route.params as {departmentId: number};
  const [department, setDepartment] = useState<any>({
    headNurse: null,
    headNurseId: null,
    headNurseName: null,
    headDoctor: null,
    headDoctorId: null,
    headDoctorName: null,
  });
  const [nurseModalVisible, setNurseModalVisible] = useState(false);
  const [doctorModalVisible, setDoctorModalVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showHeadDoctorAlertDialog, setShowHeadDoctorAlertDialog] =
    useState(false);
  const [showHeadNurseAlertDialog, setShowHeadNurseAlertDialog] =
    useState(false);

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
        <Info size={28} color={appColors.black} />
        <TextComponent bold fontSize={24} style={styles.listLabel}>
          Thông tin cơ bản
        </TextComponent>
      </ContainerComponent>

      {loading ? (
        <ContentLoaderComponent />
      ) : (
        <>
          <ContainerComponent style={styles.detailContainer}>
            <GestureHandlerRootView>
              <ScrollView>
                <FlexComponent style={styles.departmentInfoContainer}>
                  <TextComponent bold fontSize={18} style={{flex: 0.45}}>
                    Tên khoa:
                  </TextComponent>
                  <TextComponent fontSize={16} style={{flex: 0.55}}>
                    {department?.departmentName}
                  </TextComponent>
                </FlexComponent>

                <FlexComponent style={styles.departmentInfoContainer}>
                  <TextComponent bold fontSize={18} style={{flex: 0.45}}>
                    Trưởng khoa:
                  </TextComponent>
                  <FlexComponent
                    style={{
                      flexDirection: 'row',
                      flex: 0.55,
                      alignItems: 'center',
                    }}>
                    <TextComponent fontSize={16}>
                      {department?.headDoctorName}
                    </TextComponent>
                    {department?.headDoctor ? (
                      <Text
                        bold
                        fontSize={16}
                        color={appColors.darkRed}
                        onPress={() => {
                          setShowHeadDoctorAlertDialog(true);
                        }}>{` (Xóa)`}</Text>
                    ) : (
                      // <ButtonComponent
                      //   containerStyles={styles.deleteButtonContainer}
                      //   onPress={() => {
                      //     setShowHeadDepartmentAlertDialog(true);
                      //     setIsDoctor(true);
                      //   }}>
                      //   <View>
                      //     <TextComponent
                      //       bold
                      //       fontSize={16}
                      //       color={appColors.darkRed}>
                      //       Xóa
                      //     </TextComponent>
                      //   </View>
                      // </ButtonComponent>
                      <TextComponent fontSize={16}>Chưa cập nhật</TextComponent>
                    )}
                  </FlexComponent>
                </FlexComponent>

                <FlexComponent style={styles.departmentInfoContainer}>
                  <TextComponent bold fontSize={18} style={{flex: 0.45}}>
                    Điều dưỡng trưởng:
                  </TextComponent>
                  <FlexComponent
                    style={{
                      flexDirection: 'row',
                      flex: 0.55,
                      alignItems: 'center',
                    }}>
                    <TextComponent fontSize={16}>
                      {department?.headNurseName}
                    </TextComponent>
                    {department?.headNurse ? (
                      <Text
                        bold
                        fontSize={16}
                        color={appColors.darkRed}
                        onPress={() => {
                          setShowHeadNurseAlertDialog(true);
                        }}>{` (Xóa)`}</Text>
                    ) : (
                      // <ButtonComponent
                      //   containerStyles={styles.deleteButtonContainer}
                      //   onPress={() => {
                      //     setShowHeadDepartmentAlertDialog(true);
                      //     setIsDoctor(false);
                      //   }}>
                      //   <View>
                      //     <TextComponent
                      //       bold
                      //       fontSize={16}
                      //       color={appColors.darkRed}>
                      //       Xóa
                      //     </TextComponent>
                      //   </View>
                      // </ButtonComponent>
                      <TextComponent fontSize={16}>Chưa cập nhật</TextComponent>
                    )}
                  </FlexComponent>
                </FlexComponent>

                {/* <FlexComponent style={styles.departmentInfoContainer}>
                  <TextComponent bold fontSize={18} style={{flex: 0.45}}>
                    Mô tả:
                  </TextComponent>
                  <TextComponent fontSize={16} style={{flex: 0.55}}>
                    {department?.description
                      ? department?.description
                      : 'Chưa cập nhật'}
                  </TextComponent>
                </FlexComponent> */}
              </ScrollView>
            </GestureHandlerRootView>
          </ContainerComponent>
        </>
      )}
      <ContainerComponent style={styles.container}>
        <FontistoIcon name="doctor" size={28} color={appColors.black} />
        <TextComponent bold fontSize={24} style={styles.listLabel}>
          Danh sách bác sĩ
        </TextComponent>
        {!loading && (
          <ButtonComponent
            containerStyles={styles.addButtonContainer}
            onPress={() => {
              setDoctorModalVisible(!doctorModalVisible);
            }}>
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
        )}
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
              <StaffDepartmentItemComponent
                departmentId={departmentId}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                staff={item}
                isDoctor={true}
              />
            )}
            style={{width: '100%'}}
          />
        </SafeAreaView>
      )}

      <ContainerComponent style={styles.container}>
        <FontistoIcon name="nurse" size={28} color={appColors.black} />
        <TextComponent bold fontSize={24} style={styles.listLabel}>
          Danh sách điều dưỡng
        </TextComponent>
        {!loading && (
          <ButtonComponent
            containerStyles={styles.addButtonContainer}
            onPress={() => {
              setNurseModalVisible(!nurseModalVisible);
            }}>
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
        )}
      </ContainerComponent>

      {loading ? (
        <ContentLoaderComponent />
      ) : (
        <SafeAreaView style={styles.scrollViewContainer}>
          <FlatList
            data={department?.nurses}
            keyExtractor={(item: any, index: number) =>
              `nurse-${item.id}-${index}`
            }
            extraData={department?.nurses}
            refreshing={true}
            renderItem={({item}) => (
              <StaffDepartmentItemComponent
                departmentId={departmentId}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                staff={item}
                isDoctor={false}
              />
            )}
            style={{width: '100%'}}
          />
        </SafeAreaView>
      )}

      <AddNurseDialogComponent
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        departmentId={department?.departmentId}
        setModalVisible={setNurseModalVisible}
        modalVisible={nurseModalVisible}
      />

      <AddDoctorDialogComponent
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        departmentId={department?.departmentId}
        setModalVisible={setDoctorModalVisible}
        modalVisible={doctorModalVisible}
      />

      <HeadDoctorAlertDialogComponentComponent
        staffId={department?.headDoctorId}
        setShowAlertDialog={setShowHeadDoctorAlertDialog}
        showAlertDialog={showHeadDoctorAlertDialog}
      />

      <HeadNurseAlertDialogComponent
        staffId={department?.headNurseId}
        setShowAlertDialog={setShowHeadNurseAlertDialog}
        showAlertDialog={showHeadNurseAlertDialog}
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
    flex: 0.25,
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
