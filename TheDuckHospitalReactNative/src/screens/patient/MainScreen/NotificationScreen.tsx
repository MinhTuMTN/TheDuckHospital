import {Text} from '@gluestack-ui/themed';
import {ContainerComponent, Header} from '../../../components';
import {useTranslation} from 'react-i18next';

const NotificationScreen = () => {
  const {t} = useTranslation();
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={t('notification.title')}
        titleSize={19}
        showBackButton={false}
      />
      <Text>NotificationScreen</Text>
    </ContainerComponent>
  );
};

export default NotificationScreen;
