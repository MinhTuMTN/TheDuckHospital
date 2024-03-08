import {MoreHorizontal} from 'lucide-react-native';
import {useTranslation} from 'react-i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  ContainerComponent,
  Header,
  NotFoundComponent,
  NotificationItem,
} from '../../../components';
import {useState} from 'react';
import FilterComponent from '../../../components/FilterComponent';
import {appColors} from '../../../constants/appColors';

const NotificationScreen = () => {
  const [numberNotification, setNumberNotification] = useState(1);
  const [filter, setFilter] = useState('Tất cả');
  const {t} = useTranslation();
  return (
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
          <>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </>
        )}
      </GestureHandlerRootView>
    </ContainerComponent>
  );
};

export default NotificationScreen;
