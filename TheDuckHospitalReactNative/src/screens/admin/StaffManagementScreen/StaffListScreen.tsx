import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import StaffItemComponent from '../../../components/admin/staffManagementScreen/StaffItemComponent';
import Popover from 'react-native-popover-view';
import {Filter} from 'lucide-react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import StaffDialogComponent from '../../../components/admin/staffManagementScreen/StaffDialogComponent';
import {useDebounce} from 'use-debounce';
import {getPaginationStaffs} from '../../../services/staffServices';
import CreateStaffSuccessDialogComponent from '../../../components/admin/staffManagementScreen/CreateStaffSuccessDialogComponent';

function StaffListScreen() {
  const [showPopover, setShowPopover] = useState(false);
  const [selected, setSelected] = useState('ALL');
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [staffs, setStaffs] = useState<any>([]);
  const [paginationParams, setPaginationParams] = useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [createdStaff, setCreatedStaff] = useState({
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const listFooterComponent = useMemo(() => {
    let _renderUI = (
      <ActivityIndicator size="large" color={appColors.primary} />
    );

    return <View style={{opacity: isLoadingAPI ? 1 : 0}}>{_renderUI}</View>;
  }, [isLoadingAPI, staffs, paginationParams.page]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(true);
  };

  const handleGetStaffs = async () => {
    if (
      paginationParams.page + 1 > paginationParams.totalPages &&
      paginationParams.totalPages !== 0
    )
      return;

    let staffRole: string[] = [];
    if (selected === 'ALL') {
      staffRole = [
        'DOCTOR',
        'NURSE',
        'PHARMACIST',
        'CASHIER',
        'LABORATORY_TECHNICIAN',
      ];
    } else {
      staffRole = [selected];
    }
    
    setIsLoadingAPI(true);
    const response = await getPaginationStaffs(
      debouncedSearchText.trim(),
      paginationParams.limit,
      paginationParams.page,
      staffRole,
      [],
    );
    setIsLoadingAPI(false);

    console.log(response);

    if (response.success) {
      if (paginationParams.page === 0) {
        setStaffs(response.data?.data.staffs);
      } else {
        setStaffs((prev: any) => [...prev, ...response.data.data.staffs]);
      }
      setPaginationParams({
        ...paginationParams,
        totalPages: Math.ceil(
          response.data.data.total / paginationParams.limit,
        ),
      });
    }
  };

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };

  const handleResetList = () => {
    setSearchText('');
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };
  
  React.useEffect(() => {
    handleResetList();
  }, [refreshList]);

  React.useEffect(() => {

    handleGetStaffs();
  }, [
    debouncedSearchText,
    paginationParams.page,
    paginationParams.limit,
    selected,
  ]);

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
    <ContainerComponent>
      {(!isKeyboardVisible || isEditing) && (
        <ContainerComponent style={styles.container}>
          <TextComponent bold fontSize={28} style={styles.listLabel}>
            Danh sách nhân viên
          </TextComponent>
          <ButtonComponent
            containerStyles={styles.addButtonContainer}
            onPress={toggleModal}>
            <View style={styles.buttonContent}>
              <TextComponent
                bold
                fontSize={18}
                color={appColors.textPrimary}
                style={styles.addButtonText}>
                Thêm
              </TextComponent>
              <Icon name="plus" size={20} color={appColors.textPrimary} />
            </View>
          </ButtonComponent>
        </ContainerComponent>
      )}

      <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm nhân viên..."
          startIcon={
            <Icon name="search1" size={20} color={appColors.primary} />
          }
          containerStyle={{
            paddingLeft: 20,
            marginRight: 10,
            flex: 0.88,
          }}
          inputContainerStyle={{
            backgroundColor: appColors.white,
            borderColor: appColors.black,
          }}
          inputContainerFocusStyle={{
            backgroundColor: appColors.white,
            borderColor: appColors.primary,
          }}
          variant="rounded"
          value={searchText}
          onChangeText={handleChangedText}
        />

        <ContainerComponent style={styles.filterIcon}>
          <Popover
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
            backgroundStyle={{opacity: 0}}
            popoverStyle={{height: 120, width: 400}}
            arrowSize={{width: 0, height: 0}}
            from={
              <TouchableOpacity onPress={() => setShowPopover(true)}>
                <Filter size={22} color={appColors.black} />
              </TouchableOpacity>
            }>
            <FlexComponent style={styles.filterContainer}>
              <ButtonComponent
                containerStyles={
                  selected === 'ALL' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('ALL');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'ALL'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Tất cả
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'DOCTOR' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('DOCTOR');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'DOCTOR'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Bác sĩ
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'LABORATORY_TECHNICIAN'
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => {
                  setSelected('LABORATORY_TECHNICIAN');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'LABORATORY_TECHNICIAN'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Xét nghiệm
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'NURSE' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('NURSE');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'NURSE'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Điều dưỡng
                </TextComponent>
              </ButtonComponent>
            </FlexComponent>
          </Popover>
        </ContainerComponent>
      </ContainerComponent>

      {/* <ScrollView style={styles.scrollViewContainer}>
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
      </ScrollView> */}

      {(!isKeyboardVisible || isEditing) && (
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={staffs}
            keyExtractor={(item: any, index: number) =>
              `staff-${item.staffId}-${index}`
            }
            extraData={staffs}
            refreshing={true}
            renderItem={({item}) => (
              <StaffItemComponent
                setIsEditing={setIsEditing}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                staff={item}
              />
            )}
            style={{width: '100%'}}
            initialNumToRender={5}
            onEndReached={e => {
              if (
                paginationParams.page < paginationParams.totalPages - 1 &&
                !isLoadingAPI
              ) {
                setPaginationParams((prevState: any) => ({
                  ...prevState,
                  page: prevState.page + 1,
                }));
              }
            }}
            onEndReachedThreshold={0.7}
            ListFooterComponent={listFooterComponent}
          />
        </SafeAreaView>
      )}

      <StaffDialogComponent
        setIsEditing={setIsEditing}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        setModalVisible={setModalVisible}
        setConfirmModalVisible={setConfirmModalVisible}
        modalVisible={modalVisible}
        setCreatedStaff={setCreatedStaff}
      />

      <CreateStaffSuccessDialogComponent
        staff={createdStaff}
        setConfirmModalVisible={setConfirmModalVisible}
        confirmModalVisible={confirmModalVisible}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 15,
    backgroundColor: appColors.white,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '30%',
    marginTop: 15,
  },
  selectedButton: {
    borderRadius: 15,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '30%',
    marginTop: 15,
  },
  buttonText: {
    color: appColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  selectedButtonText: {
    color: appColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  filterIcon: {
    flex: 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: appColors.black,
    borderWidth: 1,
    paddingTop: 0,
    marginRight: 15,
    height: 45,
    width: 60,
    borderRadius: Dimensions.get('window').width * 0.5,
  },
  searchContainer: {
    flex: 1,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 8,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listLabel: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  addButtonContainer: {
    backgroundColor: appColors.white,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: appColors.primary,
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

export default StaffListScreen;
