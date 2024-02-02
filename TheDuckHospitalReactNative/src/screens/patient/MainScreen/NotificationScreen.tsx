import {Text} from 'native-base';
import {Container, Header} from '../../../components';

const NotificationScreen = () => {
  return (
    <Container paddingTop={0}>
      <Header title="Thông báo" titleSize={19} showBackButton={false} />
      <Text>NotificationScreen</Text>
    </Container>
  );
};

export default NotificationScreen;
