import {useTranslation} from 'react-i18next';
import {
  ContainerComponent,
  ContentComponent,
  Header,
  NotificationItem,
} from '../../../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const NotificationScreen = () => {
  const {t} = useTranslation();
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('notification.title')}
        titleSize={19}
        showBackButton={false}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </GestureHandlerRootView>
    </ContainerComponent>
  );
};

export default NotificationScreen;
