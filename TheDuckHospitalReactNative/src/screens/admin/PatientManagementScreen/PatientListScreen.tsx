import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import PatientItemComponent from '../../../components/admin/patientManagementScreen/PatientItemComponent';
import {useDebounce} from 'use-debounce';
import {getPaginationPatients} from '../../../services/patientServices';

function PatientListScreen() {
  const [patients, setPatients] = React.useState<any>([]);
  const [paginationParams, setPaginationParams] = React.useState({
    page: 0,
    limit: 5,
    totalPages: 0,
  });
  const [isLoadingAPI, setIsLoadingAPI] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const listFooterComponent = useMemo(() => {
    let _renderUI = (
      <ActivityIndicator size="large" color={appColors.primary} />
    );

    return <View style={{opacity: isLoadingAPI ? 1 : 0}}>{_renderUI}</View>;
  }, [isLoadingAPI, patients, paginationParams.page]);

  const handleChangedText = (text: string) => {
    setSearchText(text);
    setPaginationParams((prevState: any) => ({
      ...prevState,
      page: 0,
    }));
  };

  React.useEffect(() => {
    const handleGetPatients = async () => {
      if (
        paginationParams.page + 1 > paginationParams.totalPages &&
        paginationParams.totalPages !== 0
      )
        return;
      setIsLoadingAPI(true);
      const response = await getPaginationPatients(
        debouncedSearchText.trim(),
        paginationParams.limit,
        paginationParams.page,
      );
      setIsLoadingAPI(false);

      console.log(response);

      if (response.success) {
        if (paginationParams.page === 0) {
          setPatients(response.data?.data.patients);
        } else {
          setPatients((prev: any) => [...prev, ...response.data.data.patients]);
        }
        setPaginationParams({
          ...paginationParams,
          totalPages: Math.ceil(
            response.data.data.total / paginationParams.limit,
          ),
        });
      }
    };

    handleGetPatients();
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
      {!isKeyboardVisible && (
        <ContainerComponent style={styles.container}>
          <TextComponent bold fontSize={32} style={styles.listLabel}>
            Danh sách bệnh nhân
          </TextComponent>
        </ContainerComponent>
      )}

      <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm bệnh nhân..."
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

      {!isKeyboardVisible && (
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={patients}
            keyExtractor={(item: any, index: number) =>
              `patient-${item.patientId}-${index}`
            }
            renderItem={({item}) => <PatientItemComponent patient={item} />}
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
});

export default PatientListScreen;
