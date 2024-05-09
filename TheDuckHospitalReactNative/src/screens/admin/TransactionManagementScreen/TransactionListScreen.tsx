import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
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
import TransactionItemComponent from '../../../components/admin/transactionManagementScreen/TransactionItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import Popover from 'react-native-popover-view';
import {Filter} from 'lucide-react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import {useDebounce} from 'use-debounce';
import {getPaginationTransactions} from '../../../services/transactionServices';

function TransactionListScreen() {
  const [showPopover, setShowPopover] = useState(false);
  const [selected, setSelected] = useState('ALL');
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [transactions, setTransactions] = useState<any>([]);
  const [paginationParams, setPaginationParams] = useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const listFooterComponent = useMemo(() => {
    let _renderUI = (
      <ActivityIndicator size="large" color={appColors.primary} />
    );

    return <View style={{opacity: isLoadingAPI ? 1 : 0}}>{_renderUI}</View>;
  }, [isLoadingAPI, transactions, paginationParams.page]);

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };

  const handleGetTransactions = async () => {
    if (
      paginationParams.page + 1 > paginationParams.totalPages &&
      paginationParams.totalPages !== 0
    )
      return;

    let transactionStatus: string[] = [];
    if (selected === 'ALL') {
      transactionStatus = ['PENDING', 'SUCCESS', 'FAILED'];
    } else {
      transactionStatus = [selected];
    }

    setIsLoadingAPI(true);
    const response = await getPaginationTransactions(
      debouncedSearchText.trim(),
      paginationParams.limit,
      paginationParams.page,
      [],
      transactionStatus,
    );
    setIsLoadingAPI(false);

    if (response.success) {
      if (paginationParams.page === 0) {
        setTransactions(response.data?.data.transactions);
      } else {
        setTransactions((prev: any) => [
          ...prev,
          ...response.data.data.transactions,
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
    handleGetTransactions();
  }, [
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
      {!isKeyboardVisible && (
        <ContainerComponent style={styles.container}>
          <TextComponent bold fontSize={32} style={styles.listLabel}>
            Danh sách thanh toán
          </TextComponent>
        </ContainerComponent>
      )}

      {/* <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm thanh toán..."
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
                  selected === 'SUCCESS' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('SUCCESS');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'SUCCESS'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Thành công
                </TextComponent>
              </ButtonComponent>
              <ButtonComponent
                containerStyles={
                  selected === 'FAILED' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('FAILED');
                  setShowPopover(false);
                  handleResetList();
                }}>
                <TextComponent
                  style={
                    selected === 'FAILED'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Thất bại
                </TextComponent>
              </ButtonComponent>
            </FlexComponent>
          </Popover>
        </ContainerComponent>
      </ContainerComponent> */}

      {!isKeyboardVisible && (
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={transactions}
            keyExtractor={(item: any, index: number) =>
              `transaction-${item.transactionId}-${index}`
            }
            extraData={transactions}
            refreshing={true}
            renderItem={({item}) => (
              <TransactionItemComponent transaction={item} />
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
    borderRadius: 30,
  },
  searchContainer: {
    flex: 1,
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

export default TransactionListScreen;
