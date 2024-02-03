import {Text} from 'native-base';
import {Container, Header} from '../../../components';
import {useTranslation} from 'react-i18next';

const NotificationScreen = () => {
  const {t} = useTranslation();
  return (
    <Container paddingTop={0}>
      <Header
        title={t('notification.title')}
        titleSize={19}
        showBackButton={false}
      />
      <Text>NotificationScreen</Text>
    </Container>
  );
};

export default NotificationScreen;
