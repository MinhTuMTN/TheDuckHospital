import {MoreHorizontal} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ContainerComponent,
  Header,
  NotFoundComponent,
  NotificationItem,
  TextComponent,
} from '../../../components';
import {useCallback, useEffect, useMemo, useState} from 'react';
import FilterComponent from '../../../components/FilterComponent';
import {appColors} from '../../../constants/appColors';
import {ActivityIndicator, DimensionValue, View} from 'react-native';
import {appInfo} from '../../../constants/appInfo';
import {
  NotificationState,
  deleteNotification,
  getNotifications,
  updateNotificationState,
} from '../../../services/notificationServices';
import {useIsFocused} from '@react-navigation/native';
import LoginRequireComponent from '../../../components/LoginRequireComponent';

const NotificationScreen = () => {
  const [numberNotification, setNumberNotification] = useState(1);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsToShow, setNotificationsToShow] = useState<any[]>([]);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [filter, setFilter] = useState('Tất cả');
  const [notificationRightAction, setNotificationRightAction] = useState<any[]>(
    [],
  );
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const listFooterComponent = useMemo(() => {
    let _renderUI;
    let _renderHeight: DimensionValue | undefined;
    if (isLoadingAPI) {
      _renderUI = <ActivityIndicator size="large" color={appColors.primary} />;
    } else if (notificationsToShow?.length === 0) {
      _renderUI = (
        <NotFoundComponent
          imageSrc={require('../../../assets/images/no-notifications.png')}
          desc="Không có thông báo nào để hiển thị+"
          descStyle={{
            fontWeight: '400',
          }}
        />
      );
      _renderHeight = appInfo.size.height * 0.7;
    } else if (pagination.page === pagination.totalPages) {
      _renderUI = (
        <TextComponent
          fontSize={14}
          fontWeight="400"
          color={appColors.black}
          textAlign="center">
          Không còn dữ liệu để hiển thị
        </TextComponent>
      );
    } else {
      _renderUI = null;
    }
    return (
      <View
        style={{
          height: _renderHeight,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        {_renderUI}
      </View>
    );
  }, [
    isLoadingAPI,
    notificationsToShow,
    pagination.page,
    pagination.totalPages,
  ]);
  const renderItem = useCallback(({item}: {item: any}) => {
    return (
      <NotificationItem
        notification={item}
        onRightActionPress={() => {
          handleDeleteNotification(item.notificationId);
        }}
        onLeftActionPress={() => {
          handleMarkAsReadOrUnread(
            item.notificationId,
            item.state === NotificationState.RECEIVED
              ? NotificationState.SEEN
              : NotificationState.RECEIVED,
          );
        }}
      />
    );
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: number) =>
      `notification-${item.notificationId}-${index}`,
    [],
  );

  const handleDeleteNotification = useCallback(
    async (notificationId: string) => {
      setNotificationsToShow((prevState: any) =>
        prevState.filter((item: any) => item.notificationId !== notificationId),
      );
      setNotifications((prevState: any) =>
        prevState.filter((item: any) => item.notificationId !== notificationId),
      );
      const response = await deleteNotification(notificationId);
    },
    [],
  );
  const handleMarkAsReadOrUnread = useCallback(
    async (notificationId: string, state: NotificationState) => {
      setNotifications((prevState: any) =>
        prevState.map((item: any) =>
          item.notificationId === notificationId
            ? {...item, state: state}
            : item,
        ),
      );
      const response = await updateNotificationState(notificationId, state);
    },
    [],
  );
  const handleGetNotifications = useCallback(async () => {
    if (!isFocused) return;

    const response = await getNotifications();

    if (response.success) {
      const data = response.data.data;
      const page = data.page;
      const totalPages = data.totalPages;

      if (page === 1) {
        setNotifications(data.items);
        setNotificationsToShow(data.items);
      } else {
        setNotifications((prevState: any) => [...prevState, ...data.items]);
        setNotificationsToShow((prevState: any) => [
          ...prevState,
          ...data.items,
        ]);
      }
      setPagination({page, totalPages});
    }
  }, [isFocused]);

  useEffect(() => {
    handleGetNotifications();
  }, [handleGetNotifications]);

  useEffect(() => {
    if (filter === 'Tất cả') {
      setNotificationsToShow(notifications);
    } else if (filter === 'Chưa đọc') {
      setNotificationsToShow(
        notifications.filter(
          (item: any) => item.state === NotificationState.RECEIVED,
        ),
      );
    } else if (filter === 'Đã đọc') {
      setNotificationsToShow(
        notifications.filter(
          (item: any) => item.state === NotificationState.SEEN,
        ),
      );
    }
  }, [filter, notifications]);
  return (
    <LoginRequireComponent>
      <ContainerComponent paddingTop={0}>
        <Header
          title={t('notification.title')}
          titleSize={19}
          showBackButton={true}
          paddingTop={35}
          noBackground
          titleColor={appColors.textDarker}
          backButtonColor={appColors.textDarker}
          backgroundColor={appColors.backgroundGray}
          icon={<MoreHorizontal size={30} color={appColors.textDarker} />}
        />
        <GestureHandlerRootView
          style={{flex: 1, backgroundColor: appColors.backgroundGray}}>
          <FilterComponent
            items={['Tất cả', 'Chưa đọc', 'Đã đọc']}
            value={filter}
            onChange={value => setFilter(value)}
          />

          {numberNotification === 0 ? (
            <NotFoundComponent
              imageSrc={require('../../../assets/images/no-notifications.png')}
              imgStyle={{width: 300, height: 300, marginBottom: 20}}
              desc="Bạn chưa có thông báo nào"
              descStyle={{fontSize: 18}}
            />
          ) : (
            <FlatList
              data={notificationsToShow}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              style={{width: '100%'}}
              initialNumToRender={5}
              onEndReached={e => {
                if (pagination.page < pagination.totalPages && !isLoadingAPI) {
                  setPagination((prevState: any) => ({
                    ...prevState,
                    page: prevState.page + 1,
                  }));
                }
              }}
              onEndReachedThreshold={0.7}
              ListFooterComponent={listFooterComponent}
            />
          )}
        </GestureHandlerRootView>
      </ContainerComponent>
    </LoginRequireComponent>
  );
};

export default NotificationScreen;
