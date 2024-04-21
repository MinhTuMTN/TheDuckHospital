import React, {useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import DepartmentItemComponent from '../../../components/admin/departmentManagementScreen/DepartmentItemComponent';
import DepartmentDialogComponent from '../../../components/admin/departmentManagementScreen/DepartmentDialogComponent';
import {getPaginationDepartments} from '../../../services/departmentServices';
import {SafeAreaView} from 'react-native';
import {useDebounce} from 'use-debounce';
import {useSelector} from 'react-redux';
import {RootState} from '../../../types';

function DepartmentListScreen() {
  const [departments, setDepartments] = React.useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paginationParams, setPaginationParams] = React.useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [refreshList, setRefreshList] = React.useState(false);

  const refreshListDetailChanged = useSelector(
    (state: RootState) => state.refreshList.refreshList,
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const listFooterComponent = useMemo(() => {
    let _renderUI;
    if (isLoadingAPI) {
      _renderUI = <ActivityIndicator size="large" color={appColors.primary} />;
    } else {
      _renderUI = null;
    }
    return <View>{_renderUI}</View>;
  }, [isLoadingAPI, departments, paginationParams.page]);

  const handleGetDepartments = async () => {
    if (
      paginationParams.page + 1 > paginationParams.totalPages &&
      paginationParams.totalPages !== 0
    )
      return;
    setIsLoadingAPI(true);
    const response = await getPaginationDepartments(
      debouncedSearchText.trim(),
      paginationParams.limit,
      paginationParams.page,
    );
    setIsLoadingAPI(false);

    console.log(response);

    if (response.success) {
      if (paginationParams.page === 0) {
        setDepartments(response.data?.data.departments);
      } else {
        setDepartments((prev: any) => [
          ...prev,
          ...response.data.data.departments,
        ]);
      }
      setPaginationParams({
        ...paginationParams,
        totalPages: Math.ceil(
          response.data.data.total / paginationParams.limit,
        ),
      });
      // console.log(paginationParams.totalPages);
      // console.log(paginationParams.page);
    }
  };

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };

  React.useEffect(() => {
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  }, [refreshList]);

  React.useEffect(() => {
    try {
      console.log(refreshListDetailChanged);
      
      handleGetDepartments();
    } catch (error) {
      console.log(error);
    }
  }, [
    debouncedSearchText,
    paginationParams.page,
    paginationParams.limit,
    refreshListDetailChanged,
  ]);

  return (
    <ContainerComponent>
      <ContainerComponent style={styles.container}>
        <TextComponent bold fontSize={32} style={styles.listLabel}>
          Danh sách khoa
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

      <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm khoa..."
          startIcon={
            <Icon name="search1" size={20} color={appColors.primary} />
          }
          containerStyle={{
            paddingHorizontal: 20,
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
      </ContainerComponent>

      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={departments}
          keyExtractor={(item: any, index: number) =>
            `department-${item.id}-${index}`
          }
          extraData={departments}
          refreshing={true}
          renderItem={({item}) => (
            <DepartmentItemComponent
              refreshList={refreshList}
              setRefreshList={setRefreshList}
              department={item}
            />
          )}
          style={{width: '100%'}}
          initialNumToRender={5}
          onEndReached={e => {
            console.log(paginationParams.page);
            console.log(paginationParams.totalPages);
            if (
              paginationParams.page < paginationParams.totalPages - 1 &&
              !isLoadingAPI
            ) {
              console.log(paginationParams.page);
              console.log(paginationParams.totalPages);

              setPaginationParams((prevState: any) => ({
                ...prevState,
                page: prevState.page + 1,
              }));
            }
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={listFooterComponent}
        />
      </SafeAreaView>

      <DepartmentDialogComponent
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  searchContainer: {
    flex: 1,
    paddingTop: 0,
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 8,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
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

export default DepartmentListScreen;
