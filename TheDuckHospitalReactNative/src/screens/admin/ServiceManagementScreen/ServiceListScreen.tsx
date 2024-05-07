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
import ServiceItemComponent from '../../../components/admin/serviceManagementScreen/ServiceItemComponent';
import Popover from 'react-native-popover-view';
import {Filter} from 'lucide-react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import ServiceDialogComponent from '../../../components/admin/serviceManagementScreen/ServiceDialogComponent';
import {useDebounce} from 'use-debounce';
import {getPaginationMedMedicalServices} from '../../../services/medicalServiceServices';

function ServiceListScreen() {
  const [showPopover, setShowPopover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [selected, setSelected] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = React.useState<any>([]);
  const [paginationParams, setPaginationParams] = React.useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const listFooterComponent = useMemo(() => {
    let _renderUI = (
      <ActivityIndicator size="large" color={appColors.primary} />
    );

    return <View style={{opacity: isLoadingAPI ? 1 : 0}}>{_renderUI}</View>;
  }, [isLoadingAPI, services, paginationParams.page]);

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(true);
  };

  const handleGetServices = async () => {
    if (
      paginationParams.page + 1 > paginationParams.totalPages &&
      paginationParams.totalPages !== 0
    )
      return;

    let serviceTypes: string[] = [];
    if (selected === 'All') {
      serviceTypes = ['MedicalExamination', 'MedicalTest'];
    } else {
      serviceTypes = [selected];
    }

    console.log(serviceTypes);

    setIsLoadingAPI(true);
    const response = await getPaginationMedMedicalServices(
      debouncedSearchText.trim(),
      paginationParams.limit,
      paginationParams.page,
      serviceTypes,
    );
    setIsLoadingAPI(false);

    console.log(response);

    if (response.success) {
      if (paginationParams.page === 0) {
        setServices(response.data?.data.medicalServices);
      } else {
        setServices((prev: any) => [
          ...prev,
          ...response.data.data.medicalServices,
        ]);
      }
      setPaginationParams({
        ...paginationParams,
        totalPages: Math.ceil(
          response.data.data.total / paginationParams.limit,
        ),
      });
    }
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
    console.log(selected);

    handleGetServices();
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
          <TextComponent bold fontSize={32} style={styles.listLabel}>
            Danh sách dịch vụ
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
          placeholder="Tìm kiếm dịch vụ..."
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
            popoverStyle={{height: 80, width: 400}}
            arrowSize={{width: 0, height: 0}}
            from={
              <TouchableOpacity onPress={() => setShowPopover(true)}>
                <Filter size={22} color={appColors.black} />
              </TouchableOpacity>
            }>
            <FlexComponent style={styles.filterContainer}>
              <ButtonComponent
                containerStyles={
                  selected === 'All' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('All');
                  console.log(selected);
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'All'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Tất cả
                </TextComponent>
              </ButtonComponent>
              <ButtonComponent
                containerStyles={
                  selected === 'MedicalExamination'
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => {
                  setSelected('MedicalExamination');
                  console.log(selected);
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'MedicalExamination'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Khám
                </TextComponent>
              </ButtonComponent>
              <ButtonComponent
                containerStyles={
                  selected === 'MedicalTest'
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => {
                  setSelected('MedicalTest');
                  console.log(selected);
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'MedicalTest'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Xét nghiệm
                </TextComponent>
              </ButtonComponent>
            </FlexComponent>
          </Popover>
        </ContainerComponent>
      </ContainerComponent>

      {(!isKeyboardVisible || isEditing) && (
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={services}
            keyExtractor={(item: any, index: number) =>
              `service-${item.serviceId}-${index}`
            }
            extraData={services}
            refreshing={true}
            renderItem={({item}) => (
              <ServiceItemComponent
                setIsEditing={setIsEditing}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                service={item}
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

      <ServiceDialogComponent
        setIsEditing={setIsEditing}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    backgroundColor: appColors.white,
    flex: 0.3,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedButton: {
    borderRadius: 15,
    flex: 0.3,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: appColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  selectedButtonText: {
    color: appColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
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
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 7,
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

export default ServiceListScreen;
