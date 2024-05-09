import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import RoomItemComponent from '../../../components/admin/roomManagementScreen/RoomItemComponent';
import RoomDialogComponent from '../../../components/admin/roomManagementScreen/RoomDialogComponent';
import {useDebounce} from 'use-debounce';
import {getPaginationRooms} from '../../../services/roomServices';

function RoomListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [rooms, setRooms] = React.useState<any>([]);
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
  }, [isLoadingAPI, rooms, paginationParams.page]);

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

  const handleGetRooms = async () => {
    if (
      paginationParams.page + 1 > paginationParams.totalPages &&
      paginationParams.totalPages !== 0
    )
      return;
    setIsLoadingAPI(true);
    const response = await getPaginationRooms(
      debouncedSearchText.trim(),
      paginationParams.limit,
      paginationParams.page,
    );
    setIsLoadingAPI(false);

    console.log(response);

    if (response.success) {
      if (paginationParams.page === 0) {
        setRooms(response.data?.data.rooms);
      } else {
        setRooms((prev: any) => [...prev, ...response.data.data.rooms]);
      }
      setPaginationParams({
        ...paginationParams,
        totalPages: Math.ceil(
          response.data.data.total / paginationParams.limit,
        ),
      });
    }
  };

  React.useEffect(() => {
    setSearchText('');
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  }, [refreshList]);

  React.useEffect(() => {
    handleGetRooms();
  }, [debouncedSearchText, paginationParams.page, paginationParams.limit]);

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
            Danh sách phòng
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
          placeholder="Tìm kiếm phòng..."
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

      {(!isKeyboardVisible || isEditing) && (
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={rooms}
            keyExtractor={(item: any, index: number) =>
              `room-${item.roomId}-${index}`
            }
            extraData={rooms}
            refreshing={true}
            renderItem={({item}) => (
              <RoomItemComponent
                setIsEditing={setIsEditing}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                room={item}
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

      <RoomDialogComponent
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

export default RoomListScreen;
