import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  DimensionValue,
  ActivityIndicator,
} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  NotFoundComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import DepartmentItemComponent from '../../../components/admin/departmentManagementScreen/DepartmentItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import DepartmentDialogComponent from '../../../components/admin/departmentManagementScreen/DepartmentDialogComponent';
import {getPaginationDepartments} from '../../../services/departmentServices';
import {appInfo} from '../../../constants/appInfo';
import {SafeAreaView} from 'react-native';

function DepartmentListScreen() {
  const [departments, setDepartments] = React.useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paginationParams, setPaginationParams] = React.useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);

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

  React.useEffect(() => {
    const handleGetDepartments = async () => {
      if (
        paginationParams.page + 1 >= paginationParams.totalPages &&
        paginationParams.totalPages !== 0
      )
        return;
      setIsLoadingAPI(true);
      console.log(paginationParams);
      const response = await getPaginationDepartments(
        '',
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
      }
    };

    handleGetDepartments();
  }, [paginationParams.page, paginationParams.limit]);

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
        />
      </ContainerComponent>

      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={departments}
          keyExtractor={(item: any, index: number) =>
            `department-${item.id}-${index}`
          }
          renderItem={({item}) => <DepartmentItemComponent department={item} />}
          style={{width: '100%'}}
          initialNumToRender={5}
          onEndReached={e => {
            if (paginationParams.page + 1 < paginationParams.totalPages) {
              setPaginationParams({
                ...paginationParams,
                page: paginationParams.page + 1,
              });
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={listFooterComponent}
        />
      </SafeAreaView>

      <DepartmentDialogComponent
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  searchContainer: {
    flex: 0.2,
    paddingTop: 0,
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 1,
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
